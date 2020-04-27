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
  // let token;
  const response = await DataBase.getByBarName(joinBar);
  if (response.password === password) {
    const sessionId = response.sessionid;
    const token = opentok.generateToken(sessionId);
    const key = API_KEY;
    res.json({ sessionId, token, key }).status(200);
  } else {
    res.json({
      incorrectInput: 'Sorry! Either the password of username is incorrect!',
    });
  }
});

// create a new opentok session and token
router.post('/createbar', async (req, res) => {
  const { password, barName } = req.body;
  let newSession = '';
  const nameCheck = await DataBase.checkIfNameIsInUse(barName);
  console.log('namecheck is: ', nameCheck);
  if (nameCheck === true || password.length <= 4) {
    if (nameCheck === true) {
      res.json({
        nameIsInConflict: 'Sorry. That name is taken!',
      });
    }
    if (password.length <= 4) {
      res.json({
        passwordIncorrectLength: 'Sorry! That password is too short!',
      });
    }
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

router.post('/updatebar', async (req, res) => {
  const { barName } = req.body;
  // console.log('barName', barName);
  const now = moment();
  // console.log(now);
  // const numInBar = await DataBase.getNumInBar(barName);
  // const newNumInBar = numInBar + inBar;
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
