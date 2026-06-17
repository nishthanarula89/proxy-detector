import { useEffect, useState } from 'react';
import api from '../api/axios';
import StatusBadge from '../components/StatusBadge';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async (status) => {
    setLoading(true);
    const [statsRes, recordsRes] = await Promise.all([
      api.get('/admin/stats'),
      api.get('/admin/attendance', { params: status ? { status } : {} }),
    ]);
    setStats(statsRes.data);
    setRecords(recordsRes.data);
    setLoading(false);
  };

  useEffect(() => {
    load(filter);
  }, [filter]);

  const cards = stats
    ? [
        { label: 'Total students', value: stats.totalStudents },
        { label: 'Present today', value: stats.presentToday },
        { label: 'Flagged today', value: stats.flaggedToday },
        { label: 'Flagged all-time', value: stats.totalFlaggedAllTime },
      ]
    : [];

  return (
    <div className="container" style={{ marginTop: 40, marginBottom: 40 }}>
      <p className="eyebrow">Admin</p>
      <h2 style={{ fontFamily: 'var(--font-display)', marginTop: 4, marginBottom: 24 }}>
        Attendance dashboard
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {cards.map((c) => (
          <div className="card" key={c.label}>
            <p className="eyebrow">{c.label}</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 30, marginTop: 8 }}>{c.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[
          { label: 'All', value: '' },
          { label: 'Present', value: 'present' },
          { label: 'Flagged', value: 'flagged' },
        ].map((f) => (
          <button
            key={f.value}
            className="btn btn-ghost"
            style={{
              borderColor: filter === f.value ? 'var(--accent-verified)' : 'var(--border)',
              color: filter === f.value ? 'var(--accent-verified)' : 'var(--text)',
            }}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <p style={{ padding: 24, color: 'var(--text-muted)' }}>Loading…</p>
        ) : records.length === 0 ? (
          <p style={{ padding: 24, color: 'var(--text-muted)' }}>No records match this filter.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Date</th>
                <th>Status</th>
                <th>Face dist.</th>
                <th>GPS dist.</th>
                <th>Flag reason</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r._id}>
                  <td style={{ fontFamily: 'var(--font-body)' }}>
                    {r.student?.name}
                    <br />
                    <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>{r.student?.rollNumber}</span>
                  </td>
                  <td>{r.date}</td>
                  <td><StatusBadge status={r.status} /></td>
                  <td>{r.faceMatchDistance}</td>
                  <td>{r.distanceFromCampusMeters} m</td>
                  <td>{r.flagReason || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
