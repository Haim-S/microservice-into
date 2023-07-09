
const amqp = require("amqplib/callback_api");

exports.SoketMessage = async ({...message}) => {
    const myArray = JSON.stringify(message);
if(message){
  
    amqp.connect(`amqp://localhost`, (err, connection)=> {
    if(err){
        throw err;
    }
    connection.createChannel((err, channel)=>{
        if(err){
            throw err;
        }
        let queueName = "messageCreated";
        channel.assertQueue(queueName, {
            durable: true
        });
        channel.sendToQueue(queueName, Buffer.from(myArray));
        console.log(`Message : ${myArray}`);
        
                    let queueNameSend = "queueApprove";
                    channel.assertQueue(queueNameSend, {topic: true });
                    channel.consume(queueNameSend, async (message) => {
                        const receivedMessage = message.content.toString();
                        
                  
                        console.log('Received message:', receivedMessage);
                  
                      },{
                        noAck:true
                      });
                      setTimeout(()=>{
                        connection.close();
                    },1000)
    })
})
    return console.log("ok send to server c");
}
}