const Message = require("../models/message.model");


const amqp = require("amqplib");




async function consumeMessages() {
        try {
          const connection = await amqp.connect('amqp://localhost');
          const channel = await connection.createChannel();
          let queueName = "messageCreated";
      
          await channel.assertQueue(queueName, { durable: true });
      
          channel.consume(queueName, async (message) => {
            const receivedMessage = message.content.toString();
            const myObject = JSON.parse(receivedMessage);
            // Create a new message document and save it to MongoDB
            const newMessage = new Message(myObject);
            await newMessage.save();
      
            console.log('Received message:', receivedMessage);
      
            // Acknowledge the message
            channel.ack(message);
          });
          let queueNameSend = "queueApprove";
          const myApprove = "true";
          channel.assertQueue(queueNameSend, {
                topic: true
            });
            channel.sendToQueue(queueNameSend, Buffer.from(myApprove));
        } catch (error) {
          console.error(error);
        }
      }
      




exports.getMessageAndSave = async(req, res, next)=> {


        // amqp.connect(`amqp://localhost`, (err, connection)=> {
        //         console.log("ok aviv");
        //         if(err){
        //                 throw err;
        //             }
        //             connection.createChannel((err, channel)=>{
        //                     if(err){
        //                             throw err;
        //                         }
        //                         let queueName = "messageCreated";
        //                         // let message = "this is teachnical Aviv";
        //                         channel.assertQueue(queueName, {
        //                                 durable: false
        //         });
        //         channel.consume(queueName, async (message) => {
        //                 let getMessage = message.content.toString();
        //                 console.log('Received message:', getMessage);
        //                 // Acknowledge the message
        //                 await Message.create(req.body);
        //             },{
        //                       noAck: true
        //                   });
                
        //             })
        //         })
        
        consumeMessages()
       
       return res.status(201).send("ok is working");
        
      

    
}

