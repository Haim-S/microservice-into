
require("dotenv/config")
const express = require("express");
const {createServer} = require("http");
const config =require("./config")
const app = express();
const cors = require("cors");
const httpServer = createServer(app);
const initialMongoConnection = require("./config/initialConnection");
const Routes = require("./router");
// const {connect} = require("./service/rabbit");

app.use(cors("*"))
app.use(express.json());
app.use(Routes);


// connect()

initialMongoConnection()
const port =config.port;

httpServer.listen(port, ()=> {
    console.log(`server b running on port ${port}`);
})
