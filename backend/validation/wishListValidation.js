const joi = require("joi");

function wishListValidation(user) {
  const schema = joi.object({
    userId: joi.required(),
    productId: joi.required()
  });
  return schema.validate(user);
}

module.exports = wishListValidation;