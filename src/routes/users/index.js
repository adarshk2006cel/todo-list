const { Router } = require('express');
const auth = require('../../controllers/auth');

const MainRouter = Router();

MainRouter.route('/login')
  .post(auth.login);

MainRouter.route('/signup')
  .post(auth.signup);

module.exports = MainRouter;