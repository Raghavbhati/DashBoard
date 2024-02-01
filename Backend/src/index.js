const { app } = require("./app");
const { connection } = require("./db/db");

require("dotenv").config({path:"./.env"})
const PORT = process.env.PORT || 8080;
 
connection()
.then(()=>{
    app.on('error', (error) => {
        console.error('ERROR:', error);
    });
    app.listen(PORT, ()=>{
        console.log(`Server is live on port no. ${PORT}`)
    })
})
.catch((error)=>{
    console.log("Mongo DB Connection Failed", error)
})