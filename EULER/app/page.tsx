import { Sidebar } from "@/components/sidebar";
import { ChatPanel } from "@/components/chat-panel";
import { StatusPill } from "@/components/status-pill";
import { Activity, ArrowUpRight, BrainCircuit, ShieldCheck, Workflow } from "lucide-react";

export default function HomePage() {
  return (
    <main className="app-shell">
      <Sidebar />
      <section className="main-area">
        <header className="topbar">
          <div>
            <p className="eyebrow">PERSONAL AI OPERATING ENVIRONMENT</p>
            <h1>Command Center</h1>
          </div>
          <StatusPill label="Core ready" tone="good" />
        </header>

        <section className="welcome-card">
          <div className="welcome-copy">
            <div className="eyebrow blue">EULER / SYSTEM OVERVIEW</div>
            <h2>Your command center.<br /><span>Your decisions stay yours.</span></h2>
            <p>Plan work, ask questions, and use approved tools from one calm, focused workspace.</p>
          </div>
          <div className="orb-wrap" aria-hidden="true">
            <div className="orb-ring ring-one" />
            <div className="orb-ring ring-two" />
            <div className="orb"><BrainCircuit size={42} strokeWidth={1.3} /></div>
          </div>
        </section>

        <section className="metric-grid" aria-label="System overview">
          <article className="metric-card">
            <div className="metric-icon"><Workflow size={18} /></div>
            <p className="metric-label">Orchestration</p>
            <h3>Ready to build</h3>
            <p className="metric-note">Planner and agent contracts are scaffolded</p>
          </article>
          <article className="metric-card">
            <div className="metric-icon"><BrainCircuit size={18} /></div>
            <p className="metric-label">Memory</p>
            <h3>Not connected</h3>
            <p className="metric-note">Configure Supabase to persist data</p>
          </article>
          <article className="metric-card">
            <div className="metric-icon"><ShieldCheck size={18} /></div>
            <p className="metric-label">Permissions</p>
            <h3>Approval-first</h3>
            <p className="metric-note">Local computer control is disabled</p>
          </article>
        </section>

        <div className="content-grid">
          <ChatPanel />
          <aside className="right-rail">
            <section className="panel">
              <div className="panel-heading">
                <div><p className="eyebrow">WORKSPACE</p><h3>Quick actions</h3></div>
                <ArrowUpRight size={18} className="muted-icon" />
              </div>
              <div className="quick-action"><span className="quick-icon"><Activity size={17} /></span><div><strong>Plan a task</strong><p>Break a goal into steps</p></div></div>
              <div className="quick-action"><span className="quick-icon"><BrainCircuit size={17} /></span><div><strong>Search memory</strong><p>Memory tools are next to wire</p></div></div>
              <div className="quick-action"><span className="quick-icon"><ShieldCheck size={17} /></span><div><strong>Review permissions</strong><p>Actions should be approved first</p></div></div>
            </section>
            <section className="panel activity-panel">
              <div className="panel-heading"><div><p className="eyebrow">ACTIVITY</p><h3>System notes</h3></div></div>
              <div className="activity-item"><span className="activity-dot active" /><div><strong>Dashboard initialized</strong><p>UI scaffold is running locally</p></div><time>Now</time></div>
              <div className="activity-item"><span className="activity-dot" /><div><strong>AI provider</strong><p>Configured when API key is added</p></div></div>
              <div className="activity-item"><span className="activity-dot" /><div><strong>Desktop executor</strong><p>Disabled by default</p></div></div>
            </section>
          </aside>
        </div>
        <footer className="footer-note"><span className="footer-mark">E</span> EULER <span className="footer-separator">/</span> Local-first control, explicit permissions, verified results.</footer>
      </section>
    </main>
  );
}
