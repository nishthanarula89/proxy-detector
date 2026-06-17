const Attendance = require('../models/Attendance');
const User = require('../models/User');

// GET /api/admin/attendance?date=YYYY-MM-DD&status=flagged
const getAllAttendance = async (req, res) => {
  try {
    const { date, status } = req.query;
    const filter = {};
    if (date) filter.date = date;
    if (status) filter.status = status;

    const records = await Attendance.find(filter)
      .populate('student', 'name email rollNumber')
      .sort({ timestamp: -1 });

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch attendance records', error: err.message });
  }
};

// GET /api/admin/stats — quick counts for the dashboard header cards
const getStats = async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    const [totalStudents, presentToday, flaggedToday, totalFlaggedAllTime] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      Attendance.countDocuments({ date: today, status: 'present' }),
      Attendance.countDocuments({ date: today, status: 'flagged' }),
      Attendance.countDocuments({ status: 'flagged' }),
    ]);

    res.json({ totalStudents, presentToday, flaggedToday, totalFlaggedAllTime });
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch stats', error: err.message });
  }
};

module.exports = { getAllAttendance, getStats };
