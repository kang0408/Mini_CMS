const Joi = require("joi");

const baseJoi = Joi.defaults((schema) =>
  schema.options({
    messages: {
      "string.empty": "This empty field is required.",
      "any.required": "This field is required.",
      "object.unknown": "Invalid field.",
    },
    stripUnknown: false,
  })
);

module.exports = baseJoi;
