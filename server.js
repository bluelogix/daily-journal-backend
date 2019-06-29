const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('./auth/auth-routes.js')
const journalRouter = require('./journals/journals-routes.js')
const { authenticate } = require('./auth/authenticate');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// test endpoint
server.get('/', (req, res) => {
  res.status(200).json({message: 'server up!'})
})

server.use('/api', authRouter);
server.use('/api',  authenticate, journalRouter);

module.exports = server;