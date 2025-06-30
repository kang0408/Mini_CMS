/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const PREFIX = "/api/v1";
const PRODUCT_PREFIX = "/products";
const USER_PREFIX = "/users";

const routes = [
  // PRODUCT
  {
    method: "GET",
    path: PREFIX + PRODUCT_PREFIX,
    action: "product/get-all",
  },
  {
    method: "GET",
    path: PREFIX + PRODUCT_PREFIX + "/:id",
    action: "product/get-details",
  },
  {
    method: "PATCH",
    path: PREFIX + PRODUCT_PREFIX + "/update/:id",
    action: "product/update-product",
  },
  {
    method: "POST",
    path: PREFIX + PRODUCT_PREFIX + "/create",
    action: "product/create-product",
  },
  {
    method: "DELETE",
    path: PREFIX + PRODUCT_PREFIX + "/delete/:id",
    action: "product/delete-product",
  },
  // USER
  {
    method: "GET",
    path: PREFIX + USER_PREFIX,
    action: "user/get-all",
  },
  {
    method: "GET",
    path: PREFIX + USER_PREFIX + "/:id",
    action: "user/get-details",
  },
  {
    method: "PATCH",
    path: PREFIX + USER_PREFIX + "/update/:id",
    action: "user/update-user",
  },
  {
    method: "DELETE",
    path: PREFIX + USER_PREFIX + "/delete/:id",
    action: "user/delete-user",
  },
];

const routesObj = {};
routes.forEach((item) => {
  routesObj[`${item.method} ${item.path}`] = { action: item.action };
});

module.exports.routes = routesObj;
