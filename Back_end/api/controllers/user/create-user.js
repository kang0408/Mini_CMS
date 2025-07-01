const bcrypt = require("bcrypt");
const userSchema = require("../../validaters/userSchema");

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
    badRequest: {
      responseType: "badRequest",
      description: "Create product failed",
    },
    serverError: {
      responseType: "serverError",
      description: "Something went wrong on the server.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      const { error, value } = userSchema.create.validate(inputs);
      if (error) {
        return exits.badRequest({
          status: 400,
          message: error.message,
        });
      }

      const { email } = value;
      const existed = await User.findOne({ email: email });
      if (existed)
        return exits.badRequest({
          status: 400,
          message: "Email is existed",
        });

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(
        process.env.DEFAULT_PASSWORD,
        salt
      );

      const data = { ...value, password: hashPassword };

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
