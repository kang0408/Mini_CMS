const baseJoi = require("./baseJoi");

const validatePassword = (value, helpers) => {
  if (!/^(?=.*[0-9])(?=.*[A-Za-z])\S{8,}$/.test(value)) {
    return helpers.error("string.password");
  }
  return value;
};

module.exports.login = baseJoi.object({
  email: baseJoi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  password: baseJoi.string().required().custom(validatePassword).messages({
    "string.password":
      "Password must be at least 8 characters long and contain both letters and numbers.",
    "string.empty": "Password is required",
  }),
});
