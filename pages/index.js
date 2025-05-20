import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });

    const data = await res.json();
    setMessages([...messages, userMessage, data.reply]);
    setInput('');
  };

return (
    <div style={{ padding: 20 }}>
      <h1>AI Chatbot 🤖</h1>
      <div style={{ border: '1px solid #ccc', padding: 10, height: 300, overflowY: 'scroll' }}>
        {messages.map((m, i) => (
          <div key={i}><b>{m.role}:</b> {m.content}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Ask me something..."
        style={{ width: '80%', marginTop: 10 }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
