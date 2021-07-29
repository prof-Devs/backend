'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./models/users.js');
const basicAuth = require('./middleware/basic.js')
// const bearerAuth = require('./middleware/bearer.js')
// const permissions = require('./middleware/acl.js')

authRouter.post('/signup', async (req, res, next) => {
  try {
    let user = new User(req.body);
    const userRecord = await user.save();
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {

    next(e.message)
  }
});

authRouter.post('/signin/user', basicAuth.fun1, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

authRouter.post('/signin/teacher', basicAuth.fun2, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

// authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
//   try{
//     const users = await User.find({});
//     const list = users.map(user => user.username);
//     res.status(200).json(list);
//   }catch(e){
//     throw new Error(e.message)
//   }
// });

// authRouter.get('/secret', bearerAuth, async (req, res, next) => {
//   res.status(200).send('Welcome to the secret area')
// });

module.exports = authRouter;