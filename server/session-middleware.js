const path = require('path');
const expressSession = require('express-session');
const sessonFileStore = require('session-file-store');

const FileStore = sessonFileStore(expressSession);

const sessionMiddleware = expressSession({
  cookie: {
    sameSite: true
  },
  resave: false,
  rolling: true,
  store: new FileStore({
    retries: 0,
    ttl: 28800,
    path: path.join(__dirname, 'sessions/')
  }),
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET
});

module.exports = sessionMiddleware;
