const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('CRM API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(Server running on port \);
});

module.exports = app;
