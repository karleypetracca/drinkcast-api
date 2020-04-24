const express = require('express');
const OpenTok = require('opentok');
const DataBase = require('../models/functions');
require('dotenv').config();

const router = express.Router();

const API_KEY = process.env.OT_API;
const API_SECRET = process.env.OT_API_SECRET; // these should grab from the env file.
const opentok = new OpenTok(API_KEY, API_SECRET);

// get a token for an existing opentok session
router.post('/joinbar', async (req, res) => {
  const { joinBar, password } = req.body;
  // let token;
  const response = await DataBase.getByBarName(joinBar);
  const sessionId = response.sessionid;
  // Generate a token. Token options possible for later
  // const tokenOptions = {};
  // tokenOptions.role = 'publisher';
  // tokenOptions.data = 'username=bob';
  const token = opentok.generateToken(sessionId);
  const key = API_KEY;
  // sends token and session id.
  res.json({ sessionId, token, key }).status(200);
});

// create a new opentok session and token
router.post('/createbar', async (req, res) => {
  const { password, barName } = req.body;
  let newSession = '';
  const nameCheck = await DataBase.checkIfNameIsInUse(barName);
  console.log('namecheck is: ', nameCheck);
  if (nameCheck === true) {
    console.log('true');
    res.json({ nameIsInConflict: 'Sorry. That name is taken!' });
  } else {
    opentok.createSession((err, session) => {
      if (err) {
        console.log('Error creating session:', err);
      } else {
        newSession = session.sessionId;
        const token = session.generateToken();
        const key = API_KEY;
        const response = DataBase.addSession(barName, newSession, password);
        console.log('response', response);
        res.json({ newSession, token, key }).status(200);
      }
    });
  }
});

// game-related api posts
router.get('/neverhaveiever', async (req, res) => {
  const response = await DataBase.getNeverHaveIEver();
  res.json(response).status(200);
});

router.get('/wouldyourather', async (req, res) => {
  const response = await DataBase.getWouldYouRather();
  res.json(response).status(200);
});

module.exports = router;
