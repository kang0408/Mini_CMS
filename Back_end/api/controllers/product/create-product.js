module.exports = {
  friendlyName: "Create product",

  description: "",

  inputs: {
    title: { type: "string", required: true },
    description: { type: "string" },
    price: { type: "number", defaultsTo: 0, columnType: "FLOAT" },
    discountPercentage: { type: "number", defaultsTo: 0, columnType: "FLOAT" },
    stock: { type: "number", defaultsTo: 0 },
    thumbnail: { type: "string" },
    status: {
      type: "string",
      isIn: ["active", "inactive"],
      defaultsTo: "inactive",
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
      const newProduct = await Product.create(inputs).fetch();

      return exits.success({
        status: 200,
        message: "Create new product successfully",
        data: newProduct,
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
