const express = require("express");
const routes = express.Router();
const {
  getcontact,
  getcontactwithid,
  updatecontact,
  postcontact,
  deletecontact,
} = require("../controller/contactcontrol");
const validatetoken = require("../middleware/tokenvalidation");
routes.use(validatetoken)
routes.route("/").get(getcontact).post(postcontact);
routes.route("/:id").get(getcontactwithid).put(updatecontact).delete(deletecontact);

module.exports = routes;
