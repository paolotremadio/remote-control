require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const expressBodyParser = require('body-parser');
const expressBasicAuth = require('express-basic-auth');
const debug = require('debug')('express-api');
const applescript = require('applescript');

const host = '0.0.0.0';
const port = 27000;

const app = express();

app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(expressBodyParser.json());

const basicAuth = expressBasicAuth({
  users: {
    remote: process.env.HTTP_AUTH_PASSWORD,
  },
});

app.post('/hooks/media/playpause', basicAuth, (req, res) => {
  // @see https://eastmanreference.com/complete-list-of-applescript-key-codes/
  const script = 'tell application "System Events" to keystroke space';
  // const script = 'tell application "System Events" to key code 100';

  applescript.execString('tell application "System Events" to key code 1');

  applescript.execString(script, (err) => {
    res.json({ ok: !err });
  });
});

app.listen(port, host, () => debug('Remote Control running'));
