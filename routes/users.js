const express = require('express');

const router = express.Router();

const DataBase = require('../models/functions');

/* GET users listing. */
router.get('/api/joinbar', (req, res) => {
  res.send('respond with a resource');
  //grabs sessionID from database.
  //generates token.
  //sends token and session id.
});

router.post('/api/createbar', async (req, res) => {
  res.send('Responded.');
  const { sessionID, password, name } = req.body;
  const response = await DataBase.addSession(sessionID, password, name);
  console.log(response);
  return response;
});

module.exports = router;
