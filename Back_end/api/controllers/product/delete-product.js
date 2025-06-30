module.exports = {
  friendlyName: "Delete product",

  description: "",

  inputs: {
    id: { type: "string" },
  },

  exits: {
    notFound: {
      description: "Product not found",
      responseType: "notFound",
    },
    serverError: {
      responseType: "serverError",
      description: "Something went wrong on the server.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      const existed = await Product.findOne({ id: inputs.id });
      if (!existed)
        return exits.notFound({ status: 404, message: "Product not found" });

      await Product.destroyOne({ id: existed.id });

      return exits.success({
        status: 200,
        message: "Delete product successfully",
      });
    } catch (error) {
      sails.log.error("Server Error: ", err);
      return exits.serverError({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
};
