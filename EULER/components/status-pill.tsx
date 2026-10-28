export function StatusPill({ label, tone = "neutral" }: { label: string; tone?: "good" | "neutral" | "warning" }) {
  return <span className={`status-pill ${tone}`}><span className="status-dot" />{label}</span>;
}
