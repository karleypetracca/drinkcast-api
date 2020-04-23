const express = require('express');
const OpenTok = require('opentok');
const DataBase = require('../models/functions');
require('dotenv').config();

const router = express.Router();

const API_KEY = process.env.OT_API;
const API_SECRET = process.env.OT_API_SECRET; // these should grab from the env file.
const opentok = new OpenTok(API_KEY, API_SECRET);

/* GET users listing. */
router.get('/joinbar', (req, res) => {
  res.send('respond with a resource');

  let sessionId;
  let token;
  opentok.createSession({}, (error, session) => {
    if (error) {
      console.log('Error creating session:', error);
    } else {
      sessionId = session.sessionId;
      console.log('Session ID: ', sessionId);
      //  Use the role value appropriate for the user:
      const tokenOptions = {};
      tokenOptions.role = 'publisher';
      tokenOptions.data = 'username=bob';

      // Generate a token.
      token = opentok.generateToken(sessionId, tokenOptions);
      console.log(token);
    }
  });

  // sends token and session id.
  return token;
});

router.post('/createbar', (req, res) => {
  const { password, barName } = req.body;
  let newSession = '';

  opentok.createSession((err, session) => {
    if (err) {
      console.log(err);
    } else {
      newSession = session.sessionId;
      const response = DataBase.addSession(barName, newSession, password);
      console.log('response', response);
    }
    console.log(newSession, password);
  });

  res.json({ newSession }).status(200);
});

module.exports = router;
