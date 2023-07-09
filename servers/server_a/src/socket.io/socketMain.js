const {SoketMessage} = require("../services/socket.message");

function socketMain(socket) {
    socket.on("connection", (socket)=>{
        console.log(socket.id);
    });
    console.log(`User Connected:${socket.id}`);

    socket.on("send_message", (message)=>{
        // console.log( message);
        SoketMessage(message);
    });

    socket.on("disconnect", ()=>{
        console.log("User Disconnected", socket.id);
    })
    
}

module.exports = socketMain;