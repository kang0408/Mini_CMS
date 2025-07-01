const userSchema = require("../../validaters/userSchema");

module.exports = {
  friendlyName: "Update user",

  description: "",

  inputs: {
    id: { type: "string", required: true },
    username: {
      type: "string",
    },
    email: {
      type: "string",
    },
    role: { type: "string", isIn: ["user", "admin"] },
  },

  exits: {
    notFound: {
      description: "Product not found",
      responseType: "notFound",
    },
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
      const existed = await User.findOne({ id: inputs.id });
      if (!existed)
        return exits.notFound({
          status: 404,
          message: "User not found",
        });

      const { error, value } = userSchema.update.validate(inputs);
      if (error) {
        return exits.badRequest({
          status: 400,
          message: error.message,
        });
      }

      if (value.email) {
        const isMatch = await User.find({ email: value.email });
        if (isMatch.length > 0) {
          return exits.badRequest({
            status: 400,
            message: "Email is existed",
          });
        }
      }

      const updateValues = {
        username: value.username,
        email: value.email,
        role: value.role,
      };

      const updatedUser = await User.updateOne({ id: existed.id }).set(
        updateValues
      );

      if (!updatedUser)
        return exits.notFound({
          status: 400,
          message: "User can not updated",
        });

      delete updatedUser.password;

      return exits.success({
        status: 200,
        message: "Updated user successfully",
        data: updatedUser,
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
