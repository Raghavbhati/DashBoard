const express = require("express");

const app = express();

app.get("/", (req, res)=>{
    try {
        res.send("Server is live.. Check API Docs")
    } catch (error) {
        console.log("Error occured", error)
    }
})

module.exports = {app}