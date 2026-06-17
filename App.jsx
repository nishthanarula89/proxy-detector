import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 24px',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: '-0.01em',
        }}
      >
        proxy<span style={{ color: 'var(--accent-verified)' }}>/detector</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {user?.role === 'student' && (
          <>
            <Link to="/mark" className="eyebrow">
              Mark Attendance
            </Link>
            <Link to="/history" className="eyebrow">
              History
            </Link>
          </>
        )}
        {user?.role === 'admin' && (
          <Link to="/admin" className="eyebrow">
            Dashboard
          </Link>
        )}

        {user ? (
          <button className="btn btn-ghost" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
}
