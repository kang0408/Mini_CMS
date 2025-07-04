const baseJoi = require("./baseJoi");

module.exports.create = baseJoi.object({
  title: baseJoi.string().required().messages({
    "string.empty": "This field is not empty",
  }),
  description: baseJoi.string().min(0).optional(),
  price: baseJoi.number().min(0).messages({
    "number.min": "Price is greater than 0",
    "number.base": "Price is number",
  }),
  discountPercentage: baseJoi.number().min(0).max(100).messages({
    "number.min": "Discount percentage is greater than 0",
    "number.base": "Discount percentage is number",
    "number.max": "Discount is not greater than 100%",
  }),
  stock: baseJoi.number().min(0).messages({
    "number.min": "Stock is greater than 0",
    "number.base": "Stock is number",
  }),
  thumbnail: baseJoi.string().min(0),
  status: baseJoi.string().valid("active", "inactive").optional(),
});

module.exports.update = baseJoi.object({
  id: baseJoi.string(),
  title: baseJoi.string(),
  description: baseJoi.string().min(0),
  price: baseJoi.number().min(0).messages({
    "number.min": "Price is greater than 0",
    "number.base": "Price is number",
  }),
  discountPercentage: baseJoi.number().min(0).max(100).messages({
    "number.min": "Discount percentage is greater than 0",
    "number.base": "Discount percentage is number",
    "number.max": "Discount is not greater than 100%",
  }),
  stock: baseJoi.number().min(0).messages({
    "number.min": "Stock is greater than 0",
    "number.base": "Stock is number",
  }),
  thumbnail: baseJoi.string().min(0),
  status: baseJoi.string().valid("active", "inactive").optional(),
});
