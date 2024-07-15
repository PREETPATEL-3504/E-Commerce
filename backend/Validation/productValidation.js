const joi = require("joi");

function productValidate(product) {
  const schema = joi.object({
    name: joi.any().required(),
    price: joi.number().required(),
    quantity: joi.number().required(),
    description: joi.string().required(),
    image_url: joi.any()
  });
  return schema.validate(product);
}

module.exports = productValidate;
