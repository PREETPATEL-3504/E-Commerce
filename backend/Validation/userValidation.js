const joi = require("joi");

function userValidation(user) {
  const schema = joi.object({
    first_name: joi.string().required().min(2),
    last_name: joi.string().required().min(2),
    number: joi.string().required().min(10).max(10),
    email: joi.string().required(),
    password: joi.string().required(),
  });
  return schema.validate(user);
}

function LoginValidation(user) {
  const schema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
  });
  return schema.validate(user);
}

module.exports = { userValidation, LoginValidation };
