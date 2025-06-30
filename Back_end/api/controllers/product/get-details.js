module.exports = {
  friendlyName: "Get details",

  description: "",

  inputs: {
    id: {
      type: "string",
      required: true,
      description: "The product's id",
    },
  },

  exits: {
    notFound: {
      responseType: "notFound",
      description: "Product not found",
    },
    serverError: {
      responseType: "serverError",
      description: "Something went wrong on the server.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      const { id } = inputs;
      const details = await Product.findOne({ id: id });
      if (!details)
        return exits.notFound({ status: 404, message: "Product not found" });

      return exits.success({
        status: 200,
        message: "Get details of product successfully",
        data: details,
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
