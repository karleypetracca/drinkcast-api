const express = require('express');
const OpenTok = require('opentok');

const router = express.Router();

const DataBase = require('../models/functions');

/* GET users listing. */
router.get('/joinbar', (req, res) => {
  res.send('respond with a resource');
  try {
    //grabs sessionID from database.
    //generates token.
    //sends token and session id.
  } catch (e) {
    return e;
  }
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
    console.log(newSession, name, password);
  });
  const sessionID = newSession;
  const response = await DataBase.addSession(name, sessionID, password);
  console.log(response);
  return sessionID;
});

module.exports = router;
