"use client";

import { FormEvent, useState } from "react";
import { ArrowUp, Bot, Mic, Paperclip, Sparkles, Square } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const starters = [
  { title: "Plan my next steps", prompt: "Help me plan a project into clear, trackable steps." },
  { title: "Explain EULER", prompt: "Explain the current EULER starter architecture and what is implemented." },
  { title: "Research a topic", prompt: "Help me create a research plan for a topic I will specify." }
];

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "EULER core interface is ready. Add your server-side OpenAI API key to enable live AI responses. I will clearly report when a service is not configured." }
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function sendMessage(text = input) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(next);
    setInput("");
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "EULER could not complete this request.");
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setMessages([...next, { role: "assistant", content: `I couldn't complete that request. ${message}` }]);
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage();
  }

  return (
    <section className="panel chat-panel">
      <div className="panel-heading chat-heading">
        <div className="chat-title"><span className="assistant-avatar"><Bot size={18} /></span><div><p className="eyebrow">EULER ASSISTANT</p><h3>Conversation</h3></div></div>
        <span className="secure-label"><span className="live-dot" /> SERVER-ROUTED</span>
      </div>
      <div className="message-list" aria-live="polite">
        {messages.map((message, index) => (
          <div key={`${index}-${message.role}`} className={`message-row ${message.role}`}>
            {message.role === "assistant" && <span className="message-avatar"><Bot size={15} /></span>}
            <div className="message-bubble"><p>{message.content}</p></div>
          </div>
        ))}
        {busy && <div className="message-row assistant"><span className="message-avatar"><Bot size={15} /></span><div className="message-bubble typing"><span /><span /><span /></div></div>}
      </div>
      {messages.length <= 1 && <div className="starter-prompts">{starters.map((item) => <button key={item.title} onClick={() => void sendMessage(item.prompt)}><Sparkles size={14} /><span>{item.title}</span></button>)}</div>}
      {error && <p className="inline-error" role="alert">{error}</p>}
      <form className="composer" onSubmit={onSubmit}>
        <textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask EULER to think, plan, or help..." rows={2} aria-label="Message EULER" onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void sendMessage(); } }} />
        <div className="composer-toolbar"><div className="composer-tools"><button type="button" className="icon-button" title="File summarization is planned" aria-label="Attach file (not implemented)"><Paperclip size={16} /></button><button type="button" className="icon-button" title="Voice is not configured yet" aria-label="Voice input (not implemented)"><Mic size={16} /></button><span className="composer-hint">Enter to send · Shift+Enter for newline</span></div><button className="send-button" type="submit" disabled={busy || !input.trim()} aria-label={busy ? "Working" : "Send message"}>{busy ? <Square size={15} /> : <ArrowUp size={17} />}</button></div>
      </form>
      <p className="chat-disclaimer">EULER uses only configured services and registered tools. Computer control is not enabled.</p>
    </section>
  );
}
