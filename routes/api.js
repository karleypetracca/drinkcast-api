const express = require('express');
const OpenTok = require('opentok');
require('dotenv').config();

const router = express.Router();

const DataBase = require('../models/functions');

/* GET users listing. */
router.get('/joinbar', (req, res) => {
  res.send('respond with a resource');
  const API_KEY = process.env.OT_API;
  const API_SECRET = process.env.OT_API_SECRET; //these should grab from the env file.

  const opentok = new OpenTok(API_KEY, API_SECRET);

  let sessionId;
  let token;
  opentok.createSession({}, (error, session) => {
    if (error) {
      console.log('Error creating session:', error);
    } else {
      sessionId = session.sessionId;
      console.log('Session ID: ', sessionId);
      //  Use the role value appropriate for the user:
      let tokenOptions = {};
      tokenOptions.role = 'publisher';
      tokenOptions.data = 'username=bob';

      // Generate a token.
      token = opentok.generateToken(sessionId, tokenOptions);
      console.log(token);
    }
  });

  //sends token and session id.
  return token;
});

router.post('/createbar', async (req, res) => {
  res.send('Responded.');
  const { password, name } = req.body;
  let newSession = '';

  OpenTok.createSession((err, session) => {
    if (err) {
      console.log(err);
    } else {
      newSession = session.sessionId;
    }
    console.log(newSession, password);
  });
  const sessionID = newSession;
  const response = await DataBase.addSession(name, sessionID, password);
  console.log(response);
  return sessionID;
});

module.exports = router;
