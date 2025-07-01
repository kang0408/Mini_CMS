const productSchema = require("../../validaters/productSchema");

module.exports = {
  friendlyName: "Update product",

  description: "",

  inputs: {
    id: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    price: { type: "number", columnType: "FLOAT" },
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
      const existed = await Product.findOne({ id: inputs.id });
      if (!existed)
        return exits.notFound({
          status: 404,
          message: "Product not found",
        });

      const { error, value } = productSchema.update.validate(inputs);
      if (error) {
        return exits.badRequest({
          status: 400,
          message: error.message,
        });
      }

      const updateValues = {
        title: value.title,
        description: value.description,
        price: value.price,
        discountPercentage: value.discountPercentage,
        stock: value.stock,
        thumbnail: value.thumbnail,
        status: value.status,
      };

      const updatedProduct = await Product.updateOne({ id: existed.id }).set(
        updateValues
      );

      if (!updatedProduct)
        return exits.notFound({
          status: 400,
          message: "Product can not updated",
        });

      return exits.success({
        status: 200,
        message: "Updated product successfully",
        data: updatedProduct,
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
