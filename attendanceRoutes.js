const User = require('../models/User');
const Attendance = require('../models/Attendance');
const { checkGeofence } = require('../utils/geoUtils');
const { checkFaceMatch } = require('../utils/faceUtils');

// POST /api/attendance/mark
// Body: { faceDescriptor: number[128], lat: number, lng: number }
// This is the core of the project: every check-in is independently verified
// against the student's enrolled face AND their live GPS position before
// it's accepted. Either check failing flags the record instead of silently
// rejecting it, so admins have a full audit trail of attempted proxy marks.
const markAttendance = async (req, res) => {
  try {
    const { faceDescriptor, lat, lng } = req.body;

    if (!faceDescriptor || faceDescriptor.length !== 128) {
      return res.status(400).json({ message: 'Valid face descriptor is required' });
    }
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return res.status(400).json({ message: 'Valid GPS coordinates are required' });
    }

    const student = await User.findById(req.user._id);
    if (!student.faceDescriptor) {
      return res.status(400).json({ message: 'No enrolled face found for this account' });
    }

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const alreadyMarked = await Attendance.findOne({ student: student._id, date: today });
    if (alreadyMarked) {
      return res.status(409).json({ message: 'Attendance already marked for today', record: alreadyMarked });
    }

    const faceResult = checkFaceMatch(faceDescriptor, student.faceDescriptor);
    const geoResult = checkGeofence(lat, lng);

    let status = 'present';
    let flagReason = null;

    if (!faceResult.matched && !geoResult.withinGeofence) {
      status = 'flagged';
      flagReason = 'face_and_location';
    } else if (!faceResult.matched) {
      status = 'flagged';
      flagReason = 'face_mismatch';
    } else if (!geoResult.withinGeofence) {
      status = 'flagged';
      flagReason = 'outside_geofence';
    }

    const record = await Attendance.create({
      student: student._id,
      date: today,
      status,
      flagReason,
      faceMatchDistance: faceResult.distance,
      faceMatched: faceResult.matched,
      location: { lat, lng },
      distanceFromCampusMeters: geoResult.distanceMeters,
      withinGeofence: geoResult.withinGeofence,
    });

    res.status(201).json({
      message: status === 'present' ? 'Attendance marked' : 'Attendance flagged for review',
      record,
    });
  } catch (err) {
    res.status(500).json({ message: 'Could not process attendance', error: err.message });
  }
};

// GET /api/attendance/history — logged-in student's own records
const getMyHistory = async (req, res) => {
  try {
    const records = await Attendance.find({ student: req.user._id }).sort({ timestamp: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch history', error: err.message });
  }
};

module.exports = { markAttendance, getMyHistory };
