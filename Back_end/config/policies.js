/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

const isLoggin = require("../api/policies/isLoggin");
const isAdmin = require("../api/policies/isAdmin")

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  "product/get-all": true,
  "product/*": [isLoggin, isAdmin],
  "user/*": [isLoggin, isAdmin],
};
