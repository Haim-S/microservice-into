
import React, {useEffect, useState} from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:4000");

function App() {
  
  socket.on("connect", () => {
    console.log(socket.id);
  });
  

  const [username, setUsername] = useState("");
 
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);


  const sendMessage = async ()=> {
    if(currentMessage !== ""){
      const messageData = {
        from: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }
      await socket.emit("send_message", messageData);
      setMessageList((list)=> [...list, messageData]);
      setCurrentMessage("")
    }
  }

  useEffect(()=>{
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("receive_message", (data)=>{
      setMessageList((list) => [...list, data]);
  })
  },[socket]);

  return (
    <div className="App">
     
    <div className='MessageContainer'>
    <h3>Send your message</h3>
    <input type='text' onChange={(event)=> {setUsername(event.target.value)}} placeholder='name....'/>
    <input type='text' onChange={(event)=> {setCurrentMessage(event.target.value)}} placeholder='Message...'/>
    <button onClick={()=> sendMessage()}>Send</button>
      </div>
      <div>
      {messageList.map((msg, i)=> {
        return(
          <div key={i}>
          <p>{msg.from}</p>
          <p>{msg.message}</p>
          <p>{msg.time}</p>
          </div>
        )
      })}
      </div>
    </div>
  );
}

export default App;
