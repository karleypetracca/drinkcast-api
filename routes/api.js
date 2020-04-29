const express = require('express');
const moment = require('moment');
const OpenTok = require('opentok');
const DataBase = require('../models/functions');
require('dotenv').config();

const router = express.Router();

const API_KEY = process.env.OT_API;
const API_SECRET = process.env.OT_API_SECRET;
const opentok = new OpenTok(API_KEY, API_SECRET);

// get a token for an existing opentok session
router.post('/joinbar', async (req, res) => {
  const { joinBar, password } = req.body;
  const saniBarName = joinBar.toLowerCase().trim();
  const saniPassword = password.toLowerCase().trim();
  const response = await DataBase.getByBarName(saniBarName);
  if (response.password === saniPassword) {
    const sessionId = response.sessionid;
    const token = opentok.generateToken(sessionId);
    const key = API_KEY;
    res.json({ sessionId, token, key }).status(200);
  } else {
    if (response === 'No data returned from the query.') {
      res.json({
        error: 'Sorry! That bar does not exist!',
      }).status(200);
    }
    if (response.password !== saniPassword) {
      res.json({
        error: 'Sorry! The password is incorrect!',
      }).status(200);
    }
  }
});

// create a new opentok session and token
router.post('/createbar', async (req, res) => {
  const { password, barName } = req.body;
  let newSession = '';
  const nameCheck = await DataBase.checkIfNameIsInUse(barName);
  if (nameCheck === true || password.length <= 4) {
    if (nameCheck === true) {
      res.json({
        error: 'Sorry. That name is taken!',
      }).status(200);
    }
    if (password.length <= 4) {
      res.json({
        error: 'Sorry! That password is too short!',
      }).status(200);
    }
  } else {
    opentok.createSession((err, session) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log('Error creating session:', err);
      } else {
        // needs to recieve an emit from the client.
        newSession = session.sessionId;
        const token = session.generateToken();
        const key = API_KEY;
        const saniBarName = barName.toLowerCase().trim();
        const saniPassword = password.toLowerCase().trim();
        // eslint-disable-next-line no-unused-vars
        const response = DataBase.addSession(saniBarName, newSession, saniPassword);
        res.json({ newSession, token, key }).status(200);
      }
    });
  }
});

// update latest bar access
router.post('/updatebar', async (req, res) => {
  const { barName } = req.body;
  const now = moment().format('YYYY-MM-DD HH:mm:ss');
  const saniBarName = barName.toLowerCase().trim();
  // eslint-disable-next-line no-unused-vars
  const response = await DataBase.updateLastAccess(saniBarName, now);
  res.sendStatus(200);
});

// game-related api posts - never have i ever
router.get('/neverhaveiever', async (req, res) => {
  const response = await DataBase.getNeverHaveIEver();
  res.json(response).status(200);
});

// game-related api posts - would you rather
router.get('/wouldyourather', async (req, res) => {
  const response = await DataBase.getWouldYouRather();
  res.json(response).status(200);
});

module.exports = router;
