const baseJoi = require("./baseJoi");

module.exports.create = baseJoi.object({
  username: baseJoi.string().min(5).max(20).messages({
    "string.min": "Username length is greater than 5",
    "string.max": "Username length is smaller than 20",
  }),
  email: baseJoi.string().email().required().messages({
    "string.email": "Invalid email format",
  }),
  role: baseJoi.string().valid("user", "admin"),
});

module.exports.update = baseJoi.object({
  id: baseJoi.string(),
  username: baseJoi.string().min(5).max(20).messages({
    "string.min": "Username length is greater than 5",
    "string.max": "Username length is smaller than 20",
  }),
  email: baseJoi.string().email().messages({
    "string.email": "Invalid email format",
  }),
  role: baseJoi.string().valid("user", "admin"),
});
