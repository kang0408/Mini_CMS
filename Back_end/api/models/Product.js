/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "product",
  attributes: {
    title: { type: "string", required: true },
    description: { type: "string" },
    price: { type: "number", defaultsTo: 0, min: 0 },
    discountPercentage: { type: "number", defaultsTo: 0, min: 0, max: 100 },
    stock: { type: "number", defaultsTo: 0, min: 0 },
    thumbnail: { type: "string" },
    status: {
      type: "string",
      isIn: ["active", "inactive"],
      defaultsTo: "inactive",
    },
  },
};
