import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ChatBot from './ChatBot';
import './ChatBot.css';
import ReactGA from 'react-ga4';

ReactGA.initialize('G-5Q8C1DPBJ3');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChatBot />
  </React.StrictMode>
);