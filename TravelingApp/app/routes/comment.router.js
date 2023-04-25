const express = require("express");
const comment = require("../controllers/comment.controller");

const router = express.Router();

router.route("/").post(comment.create);

router.route("/:id")
    //.get(comment.findOne)
//     .put(post.update);
    .get(comment.findAll)
    .delete(comment.delete);

module.exports = router;