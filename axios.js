export default function StatusBadge({ status }) {
  const labels = {
    present: 'Verified',
    flagged: 'Flagged',
    pending: 'Scanning',
  };

  return <span className={`status-chip ${status}`}>{labels[status] || status}</span>;
}
