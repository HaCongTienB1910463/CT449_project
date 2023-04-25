const express = require("express");
const contacts = require("../controllers/contact.controller");

const router = express.Router();

router.route("/").post(contacts.create);

router.route("/:id")
    .get(contacts.finOne)
    .put(contacts.update);
    //.delete(contacts.delete);

module.exports = router;