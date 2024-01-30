const express = require("express");
const { userRoute } = require("./routes/user.routes");

const app = express();

app.get("/", (req, res)=>{
    try {
        res.send("Server is live.. Check API Docs")
    } catch (error) {
        console.log("Error occured", error)
    }
})
app.use(express.json())
app.use("/user", userRoute)

module.exports = {app}