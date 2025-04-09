import React, { useState, useEffect } from 'react';
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
  const [submitting, setSubmitting] = useState(false);
  const [leadPhone, setLeadPhone] = useState('');


  const toggleChat = () => setIsOpen(!isOpen);

  // Auto-scroll to latest message
  useEffect(() => {
    const chatLog = document.querySelector('.chat-log');
    if (chatLog) {
      chatLog.scrollTop = chatLog.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulated "Typing..." state
    setMessages((prev) => [...prev, { sender: 'bot', text: 'Typing...' }]);

    try {
      const response = await fetch('https://etx-chat-bot.onrender.com/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();

      setMessages((prev) => [...prev.slice(0, -1), { sender: 'bot', text: data.reply }]);

      // Trigger lead form if keywords are detected
      const triggerWords = ['quote', 'estimate', 'contact', 'email', 'name', 'catering'];
      if (triggerWords.some(word => input.toLowerCase().includes(word))) {
        setIsFormActive(true);
      }
    } catch (error) {
      setMessages((prev) => [...prev.slice(0, -1), {
        sender: 'bot',
        text: "Oops, something went wrong. Try again later."
      }]);
    }
  };

  const handleLeadSubmit = async () => {
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail);
  
    if (!leadName || !leadEmail || !leadMessage || !emailIsValid) {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: "Please enter a valid name, email, and message." }
      ]);
      return;
    }
  
    setSubmitting(true);
  
    try {
        await fetch("https://etx-chat-bot.onrender.com/submit-lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: leadName,
              email: leadEmail,
              phone: leadPhone,
              message: leadMessage
            })
          });
          
      setMessages(prev => [
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
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: "Something went wrong. Try again later." }
      ]);
    } finally {
      setSubmitting(false);
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
      <input
         type="tel"
          placeholder="Your phone number"
          value={leadPhone}
          onChange={(e) => setLeadPhone(e.target.value)}
    />
      <textarea
        placeholder="Message or question"
        value={leadMessage}
        onChange={(e) => setLeadMessage(e.target.value)}
      />
      <button onClick={handleLeadSubmit} disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
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

          {!formSubmitted && isFormActive && renderLeadForm()}

          {!isFormActive && (
            <>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message"
              />
              <button className="lead-trigger-button" onClick={() => setIsFormActive(true)}>
                👤 Leave Your Info
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
/*Made by R3jected Wrkx */

export default ChatBot;
