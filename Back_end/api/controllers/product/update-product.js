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

      const updateValues = {
        title: inputs.title,
        description: inputs.description,
        price: inputs.price,
        discountPercentage: inputs.discountPercentage,
        stock: inputs.stock,
        thumbnail: inputs.thumbnail,
        status: inputs.status,
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
      sails.log.error("Server Error: ", err);
      return exits.serverError({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
};
