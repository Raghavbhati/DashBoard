const express = require("express");
const { registerUser } = require("../controllers/user.controllers");


const userRoute = express.Router();

userRoute.post("/register", registerUser)

module.exports = {userRoute};
