require("dotenv").config();
const bcrypt = require("bcrypt");

module.exports = {
  friendlyName: "Create user",

  description: "",

  inputs: {
    username: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
      isIn: ["user", "admin"],
      defaultsTo: "user",
    },
  },

  exits: {
    serverError: {
      responseType: "serverError",
      description: "Something went wrong on the server.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      const { email } = inputs;
      const existed = await User.find({ email: email });
      if (existed)
        return exits.success({
          status: 400,
          message: "Email is existed",
        });

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(
        process.env.DEFAULT_PASSWORD,
        salt
      );

      const data = { ...inputs, password: hashPassword };

      const newUser = await User.create(data).fetch();

      delete newUser.password;

      return exits.success({
        status: 200,
        message: "Create new user successfully",
        data: newUser,
      });
    } catch (error) {
      sails.log.error("Server Error: ", error);
      return exits.serverError({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
};
