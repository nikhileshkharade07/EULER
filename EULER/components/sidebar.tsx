"use client";

import { useState } from "react";
import { Activity, Bot, Brain, CalendarClock, ChevronLeft, Command, LayoutDashboard, MessageSquare, Settings2, ShieldCheck, Workflow } from "lucide-react";

const navItems = [
  { label: "Command Center", icon: LayoutDashboard },
  { label: "Chat", icon: MessageSquare },
  { label: "Agents", icon: Bot },
  { label: "Memory", icon: Brain },
  { label: "Tasks", icon: Workflow },
  { label: "Automations", icon: CalendarClock },
  { label: "Activity", icon: Activity }
];

export function Sidebar() {
  const [active, setActive] = useState("Command Center");
  return (
    <aside className="sidebar">
      <div className="brand-row">
        <div className="brand-mark">E</div>
        <div className="brand-text"><strong>EULER</strong><span>PERSONAL AI SYSTEM</span></div>
        <button className="collapse-button" aria-label="Collapse sidebar" title="Sidebar layout placeholder"><ChevronLeft size={16} /></button>
      </div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="nav-list" aria-label="Main navigation">
        {navItems.map(({ label, icon: Icon }) => (
          <button key={label} className={`nav-item ${active === label ? "selected" : ""}`} onClick={() => setActive(label)}>
            <Icon size={17} strokeWidth={1.8} /><span>{label}</span>{label === "Tasks" && <span className="nav-count">0</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-spacer" />
      <div className="system-card">
        <div className="system-card-top"><span className="live-dot" /> CORE STATUS <span className="system-online">ONLINE</span></div>
        <p>AI services and integrations depend on your local configuration.</p>
        <div className="system-line"><span>Local executor</span><span className="off-label">OFF</span></div>
      </div>
      <button className={`nav-item settings-item ${active === "Settings" ? "selected" : ""}`} onClick={() => setActive("Settings")}><Settings2 size={17} /><span>Settings</span></button>
      <div className="sidebar-bottom"><Command size={14} /><span> EULER v0.1.0</span><ShieldCheck size={14} /></div>
    </aside>
  );
}
