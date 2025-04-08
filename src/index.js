import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const responses = [
  {
    keywords: ['hours', 'open', 'close', 'time'],
    response: "Our hours are: Tues–Thurs 11am–10pm, Fri–Sat 11am–11pm, Sun 11am–8pm, and we're CLOSED on Mondays."
  },
  {
    keywords: ['book', 'band', 'booking'],
    response: "Please send all booking requests to booking@etxbrew.com 🎶"
  },
  {
    keywords: ['21', 'age', 'drinking'],
    response: "Nope! We're a family-friendly business — all ages welcome."
  },
  {
    keywords: ['trivia', 'karaoke', 'live music', 'music night'],
    response: "🎤 Karaoke: Tuesdays 7–8:30pm\n🧠 Trivia: Wednesdays 7–10pm\n🎶 Live music every Fri & Sat night (times vary)"
  },
  {
    keywords: ['food', 'menu', 'eat', 'brunch'],
    response: "Yes! We have a full food menu + weekend brunch. Check it out here: https://etxbrew.com/food/"
  },
  {
    keywords: ['beer', 'tap', 'new', 'what’s on tap'],
    response: "We’re always rotating beers! Call us at 903-630-7720 or check https://etxbrew.com/beer-wine-cider/"
  },
  {
    keywords: ['park', 'parking', 'where to park'],
    response: "We have a lot on the North side, plus FREE parking at Fair Plaza Garage right next door."
  },
  {
    keywords: ['dog', 'pet', 'furry friend'],
    response: "Yes! We're dog-friendly 🐶 Just keep them leashed and in dog-approved areas (patio & lower bar)."
  },
  {
    keywords: ['to go', 'take home', 'growler', 'crowler', 'cans'],
    response: "Yep! You can grab crowlers, growlers, and cans to-go. Come by and stock up 🍻"
  },
  {
    keywords: ['catering', 'events', 'party', 'corporate'],
    response: "We cater! From parties to meetings — call us or check out: https://etxbrew.com/catering/"
  },
  {
    keywords: ['reservation', 'reserve', 'book a table'],
    response: "Yes! Just give us a call to make a reservation. We’d love to host you 🍽️"
  }
];
const fallbackResponse = "Hmm, I'm not sure about that. You can always give us a call at 903-630-7720 and we’ll help you out!";
