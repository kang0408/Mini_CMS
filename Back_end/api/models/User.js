/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "users",
  attributes: {
    username: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
      isIn: ["user", "admin"],
      defaultsTo: "user",
    },
  },
};
