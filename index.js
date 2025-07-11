const express = require('express');
const path = require('path');

const app = express();

const port = 3000;

const summarizeText = require('./summarize.js');

app.use(express.json());

// This is crucial: Your Express app needs to serve static files itself.
app.use(express.static(path.join(__dirname, 'public')));

// Explicitly handle the root route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/summarize', (req, res) => {
  const text = req.body.text_to_summarize;

  if (!text) {
    console.error("Error: No text provided for summarization.");
    return res.status(400).send("No text provided for summarization.");
  }

  summarizeText(text)
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      console.error("Summarization API error:", error.message);
      res.status(500).send("Error summarizing text. Please try again later.");
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;