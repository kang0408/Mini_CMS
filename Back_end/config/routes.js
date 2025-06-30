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

const routes = [
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
];

const routesObj = {};
routes.forEach((item) => {
  routesObj[`${item.method} ${item.path}`] = { action: item.action };
});

module.exports.routes = routesObj;
