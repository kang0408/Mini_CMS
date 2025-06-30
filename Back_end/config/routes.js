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

const routes = [
  {
    method: "GET",
    path: PREFIX + "/products",
    action: "product/get-all",
  },
];

const routesObj = {};
routes.forEach((item) => {
  routesObj[`${item.method} ${item.path}`] = { action: item.action };
});

module.exports.routes = routesObj;
