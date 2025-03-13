const sha256 = require('js-sha256').sha256;
const jwt = require("jsonwebtoken");

require('dotenv').config();

const userSchema = require('../models/users');

exports.login = async (req, res) => {
  const { emailId, password } = req.body;
  const encryptedPassword = sha256(password);

  try {
    const user = await userSchema
      .findOne({ emailId, password: encryptedPassword })
      .exec();
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    await userSchema
      .findByIdAndUpdate(
        user._id,
        { lastLogin: new Date() },
        { new: true }
      )
      .exec();

    let token;
    try {
      //Creating jwt token
      token = jwt.sign(
        {
          email: emailId
        },
        process.env.SECRET_JWT_KEY,
        { expiresIn: "1h" }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong" });
    }

    res
      .status(200)
      .json({
        success: true,
        data: {
          email: emailId,
          token: token,
        },
      });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.signup = async (req, res) => {
  console.log("signup");
  let body = req.body;
  try {
    const existingUser = await userSchema
      .findOne({ emailId: body.emailId })
      .select('emailId')
      .exec();
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
  } catch {
    return res.status(500).json({ message: error.message });
  }

  const encryptedPassword = sha256(body.password);
  let newUser = new userSchema({
    emailId: body.emailId,
    password: encryptedPassword,
    lastLogin: new Date(),
  });
  try {
    await newUser.save();
    let token;
    try {
      //Creating jwt token
      token = jwt.sign(
        {
          email: body.emailId
        },
        process.env.SECRET_JWT_KEY,
        { expiresIn: "1h" }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong" });
    }

    res
      .status(200)
      .json({
        success: true,
        data: {
          email: body.emailId,
          token: token,
        },
      });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}