type Props = { label: string; value: string; note: string; icon: string; tone?: string };
export default function StatCard({ label, value, note, icon, tone = 'blue' }: Props) {
  return <div className="stat-card h-100"><div className="d-flex justify-content-between align-items-start"><span className="stat-label">{label}</span><span className={`stat-icon ${tone}`}><i className={`bi ${icon}`} /></span></div><div className="stat-value">{value}</div><div className="stat-note"><i className="bi bi-arrow-up-right me-1" />{note}</div></div>;
}
