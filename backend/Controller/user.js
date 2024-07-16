const user = require("../Model/user");
const jwt = require("jsonwebtoken");
const {
  userValidation,
  LoginValidation,
} = require("../Validation/userValidation");

const register = async (req, res) => {
  const { error, value } = userValidation(req.body);

  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
      data: null,
    });
  } else {
    await user
      .create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        number: req.body.number,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password,
      })
      .then((user) => {
        const tokendata = {
          user: req.body.password,
        };

        const token = jwt.sign(tokendata, "123");

        res.status(200).cookie("token", token).json({
          status: 200,
          message: "User registered successfully",
          data: user,
          token: token,
        });
      });
  }
};

const login = async (req, res) => {
  const { error, value } = LoginValidation(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
      data: null,
    });
  } else {
    await user
      .findOne({
        where: { email: req.body.email, password: req.body.password },
      })
      .then((user) => {
        if (!user) {
          console.log("User not found!");
          return res.status(401).json({
            status: 401,
            message: "User not found!",
          });
        }
        const tokendata = {
          user: req.body.password,
        };

        const token = jwt.sign(tokendata, "123");
        res.status(200).cookie("token", token).json({
          status: 200,
          message: "User logged in successfully",
          data: user,
          token: token,
        });
      });
  }
};

module.exports = {
  register,
  login,
};