const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const { userRoute } = require("./routes/user.routes");
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended : true
}))
app.use(express.static("public"));
app.use(cookieParser())

app.get("/api/", (req, res)=>{
    try {
        res.send("Server is live.. Check API Docs")
    } catch (error) {
        console.log("Error occured", error)
    }
})

app.use("/api/user", userRoute)

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json(err);
});
module.exports = {app}