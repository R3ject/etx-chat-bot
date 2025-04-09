const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Define pre-written responses based on keywords
const responses = [
  {
    keywords: ['hours', 'open', 'close', 'time'],
    response: "Our hours are: Tues–Thurs 11am–10pm, Fri–Sat 11am–11pm, Sun 11am–8pm, and we're CLOSED on Mondays."
  },
  {
    keywords: ['book', 'band', 'booking'],
    response: "Please send all booking requests to <a href='mailto:booking@etxbrew.com'>booking@etxbrew.com</a> 🎶"
  },
  {
    keywords: ['21', 'age', 'drinking', 'kid', 'children', 'child', 'kids'],
    response: "We're a family-friendly business — all ages welcome."
  },
  {
    keywords: ['trivia', 'karaoke', 'live music', 'music night'],
    response: "🎤 Karaoke: Tuesdays 7–8:30pm<br>🧠 Trivia: Wednesdays 7–10pm<br>🎶 Live music every Fri & Sat night (times vary)"
  },
  {
    keywords: ['food', 'menu', 'eat', 'brunch'],
    response: "Yes! We have a full food menu + weekend brunch. Check it out here: <a href='https://etxbrew.com/food/' target='_blank'>View Menu</a>"
  },
  {
    keywords: ['to go', 'take home', 'growler', 'crowler', 'cans'],
    response: "Yep! You can grab crowlers, growlers, and cans to-go. Come by and stock up 🍻"
  },
  {
    keywords: ['beer', 'beers', 'tap', 'new', 'what’s on tap'],
    response: "We’re always rotating beers! Call us at <a href='tel:9036307720'>903-630-7720</a> or check out our <a href='https://etxbrew.com/beer-wine-cider/' target='_blank'>Beer Page</a>"
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
    keywords: ['catering', 'events', 'party', 'corporate'],
    response: "We cater! From parties to meetings — call us or check out our <a href='https://etxbrew.com/catering/' target='_blank'>Catering Info</a>"
  },
  {
    keywords: ['reservation', 'reserve', 'book a table'],
    response: "Yes! Just give us a call at <a href='tel:9036307720'>903-630-7720</a> to make a reservation 🍽️"
  },
  {
    keywords: ['located', 'location', 'address'],
    response: "We're located in Downtown Tyler: <strong>221 S. Broadway, Tyler, TX 75702</strong>"
  },
  {
    keywords: ['thank you', 'thanks', 'thankyou', 'appreciate it'],
    response: "You're so welcome! 😊 If you have any other questions, I’m here to help."
  }
];

const fallbackResponse = "Hmm, I'm not sure about that. You can always <a href='tel:9036307720'>give us a call at 903-630-7720</a> and we’ll help you out!";

// Prewritten message handler
function getPrewrittenResponse(message) {
  const msgLower = message.toLowerCase();
  for (let entry of responses) {
    for (let keyword of entry.keywords) {
      if (msgLower.includes(keyword)) {
        return entry.response;
      }
    }
  }
  return fallbackResponse;
}

// Main chatbot reply endpoint
app.post('/api/message', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ reply: 'Please send a message.' });
  }
  const reply = getPrewrittenResponse(message);
  res.json({ reply });
});

app.post('/submit-lead', async (req, res) => {
    const { name, email, phone, message } = req.body;
  
    console.log("👉 Submitting to Google Sheets:");
    console.log({ name, email, phone, message });
  
    const googleWebhookUrl = 'https://script.google.com/macros/s/AKfycby8Rofl-bG5_G99B97rYn0dcncsRVzNzV6kWdGdJEpQ7dkc1-1xPzfMhTGy31izWXm5/exec';
  
    try {
        const response = await fetch(googleWebhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
              name,
              email,
              phone,
              message
            })
          });
          
  
      const text = await response.text();
      console.log("✅ Response from Google Sheets:", text);
  
      res.status(200).json({ status: 'success', message: text });
    } catch (error) {
      console.error('❌ Error forwarding lead to Google Sheets:', error);
      res.status(500).json({ status: 'error', message: 'Failed to send lead to Google Sheets' });
    }
  });
  

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
