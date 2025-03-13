const jwt = require("jsonwebtoken");

const {errorMessages} = require('./constants');

exports.logInfo = (req, res, next) => {
  console.log("LOOGING REQUEST");
  console.log('Request URL:', req.url);
  console.log('Request Method:', req.method);
  next();
};

exports.validateToken = (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  if (!authHeader) {
    res.status(401)
      .json(
        {
          success: false,
          message: errorMessages.TOKEN_NOT_PROVIDED
        }
      );
  }
  const token = req.headers.authorization.split(' ')[1]; // bearer token

  if (!token) {
    res.status(401)
      .json(
        {
          success: false,
          message: errorMessages.TOKEN_NOT_PROVIDED
        }
      );
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.userData = decoded;
    next();
  }
  catch {
    res.status(200)
      .json(
        {
          success: false,
          message: errorMessages.INVALID_TOKEN
        }
      );
  }
};