import React, { useState } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isFormActive, setIsFormActive] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulated "Typing..." state
    setMessages((prev) => [...prev, { sender: 'bot', text: 'Typing...' }]);

    // Call your own backend
    const response = await fetch('http://localhost:5000/api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });

    const data = await response.json();

    // Replace "Typing..." with actual response
    setMessages((prev) => [...prev.slice(0, -1), { sender: 'bot', text: data.reply }]);

    // Trigger lead form if keywords are detected
    const triggerWords = ['quote', 'estimate', 'contact', 'email', 'name', 'catering'];
    if (triggerWords.some(word => input.toLowerCase().includes(word))) {
      setIsFormActive(true);
    }
  };

  const handleLeadSubmit = async () => {
    if (!leadName || !leadEmail || !leadMessage) return;

    try {
      await fetch("https://script.google.com/macros/s/AKfycbypz5M7dvy4B8rIQMKMXQtaX73t-YrhBQ9dAD6edJi0XTs1eHo-OKkuauq_fuS-4N2S/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          message: leadMessage
        })
      });

      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: "Thanks! We'll reach out soon." }
      ]);

      setFormSubmitted(true);
      setIsFormActive(false);
      setLeadName('');
      setLeadEmail('');
      setLeadMessage('');
    } catch (error) {
      console.error("Lead form error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: "Something went wrong. Try again later." }
      ]);
    }
  };

  const renderLeadForm = () => (
    <div className="lead-form">
      <button className="back-button" onClick={() => setIsFormActive(false)}>← Back to chat</button>
      <p>Let’s get your info and we’ll follow up!</p>
      <input
        type="text"
        placeholder="Your name"
        value={leadName}
        onChange={(e) => setLeadName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your email"
        value={leadEmail}
        onChange={(e) => setLeadEmail(e.target.value)}
      />
      <textarea
        placeholder="Message or question"
        value={leadMessage}
        onChange={(e) => setLeadMessage(e.target.value)}
      />
      <button onClick={handleLeadSubmit}>Submit</button>
    </div>
  );
  

  return (
    <div className="chat-container">
      <button className="chat-toggle" onClick={toggleChat}>💬</button>
      {isOpen && (
        <div className="chat-box">
          <div className="chat-log">
            {messages.map((msg, idx) => (
              <div
              key={idx}
              className={`msg ${msg.sender}`}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            ></div>
            ))}
          </div>
          {/* Show form or button */}
          {!formSubmitted && isFormActive && renderLeadForm()}

          {!isFormActive && (

        <>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message"
            />
            <button className="lead-trigger-button" onClick={() => setIsFormActive(true)}>👤 Leave Your Info</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
