const express = require('express');
const OpenTok = require('opentok');
require('dotenv').config();

// eslint-disable-next-line dot-notation
const opentok = new OpenTok(process.env['OT_API'], process.env['OT_API_SECRET']);
const router = express.Router();

/* GET users listing. */
router.get('/createbar/', (req, res) => {
  let newSession = '';
  const { barName, password } = req.body;
  console.log('bar', barName);
  console.log('pass', password);

  opentok.createSession((err, session) => {
    if (err) {
      console.log(err);
    } else {
      newSession = session.sessionId;
    }
    console.log(newSession, barName, password);
  });
  // res.send(newSession).status(200);
  res.sendStatus(200);
});

module.exports = router;
