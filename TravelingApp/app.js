const express = require("express");
const cors = require("cors");
const contactRouters = require("./app/routes/contact.route");
const postRouters = require("./app/routes/post.router");
const commentRouters = require("./app/routes/comment.router");
const apiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({
        message:"Welcome"
    });
});

app.use("/contacts",contactRouters);
app.use("/post",postRouters);
app.use("/comment",commentRouters);

app.use((req,res,next)=>{
    return next(new apiError(404,"Resource not found"));
});

app.use((err,req,res,next)=>{
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal server error"
    });
});

module.exports = app;