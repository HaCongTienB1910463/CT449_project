const express = require("express");
const post = require("../controllers/post.controller");

const router = express.Router();

router.route("/").post(post.create).get(post.findAll);

router.route("/:id")
    .get(post.findOne)
//     .put(post.update);
    .delete(post.delete);

module.exports = router;