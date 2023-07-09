
require("dotenv/config")
const express = require("express");
const {createServer} = require("http");
const app = express();
const cors = require("cors");
const httpServer = createServer(app);



app.use(cors())
app.use(express.json());





const {Server} = require("socket.io");
const socketMain = require("./socket.io/socketMain");

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});
io.on("connection", socketMain);

const port = process.env.PORT || 4050;

httpServer.listen(port, ()=> {
    console.log(`server a running on port ${port}`);
})




