const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controllers");
const { upload } = require("../middlewares/multer.middleware");


const userRoute = express.Router();

userRoute.post("/register", upload.fields([{
    name: "logo", 
    maxCount : 1,
}]), registerUser)
userRoute.post("/login", loginUser)

module.exports = {userRoute};
