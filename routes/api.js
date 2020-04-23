const express = require('express');
const OpenTok = require('opentok');
const DataBase = require('../models/functions');
require('dotenv').config();

const router = express.Router();

const API_KEY = process.env.OT_API;
const API_SECRET = process.env.OT_API_SECRET; // these should grab from the env file.
const opentok = new OpenTok(API_KEY, API_SECRET);

/* GET users listing. */
router.post('/joinbar', async (req, res) => {
  const { joinBar, password } = req.body;
  // let token;
  const response = await DataBase.getByBarName(joinBar);
  console.log('first response is: ', response);
  const sessionId = response.sessionid;
  // Generate a token. Token options possible for later
  // const tokenOptions = {};
  // tokenOptions.role = 'publisher';
  // tokenOptions.data = 'username=bob';
  const token = opentok.generateToken(sessionId);

  // sends token and session id.
  res.json({ sessionId, token }).status(200);
});

router.post('/createbar', (req, res) => {
  const { password, barName } = req.body;
  let newSession = '';

  opentok.createSession(async (err, session) => {
    if (err) {
      console.log('Error creating session: ', err);
    } else {
      newSession = session.sessionId;
      console.log('The new session id here is: ', newSession);
      const response = await DataBase.addSession(barName, newSession, password);
      console.log('response', response);
    }
    console.log(newSession, password);
  });
  console.log('The new session id is: ', newSession);
  console.log('the above should be new session');
  res.json({ newSession }).status(200);
});

// game-related api posts
router.get('/neverhaveiever', async (req, res) => {
  const response = await DataBase.getNeverHaveIEver();
  console.log(response);

  res.json(response).status(200);
});

module.exports = router;
