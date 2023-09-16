const express=require('express');
const app=express();
require('dotenv').config();
const port=process.env.port
const cors=require('cors');
const router1=require('./controller/Router/authRoute');
const router2=require('./controller/Router/messageRoute');
const cookieParser=require('cookie-parser');
const socket=require('socket.io');
app.use(cors({
    origin:'https://letschat-six.vercel.app',
    credentials:true,
    methods:['GET','POST'],
}));
app.use(express.json()) 
app.get('/', function(req, res) {
    res.send('hello world fsnj');
});
app.use(express.json())
const server=app.listen(port,()=>{
    console.log(`app running on https://letschat-six.vercel.app`)
})
app.use(cookieParser())
app.use('/user',router1)
app.use('/message',router2)
const io=socket(server,{
    cors:{
        origin:'https://letschat-six.vercel.app',
        credentials:true,
        }
    })
global.onlineUsers=new Map();
io.on('connection',(socket)=>{
    global.chatSocket=socket;
    socket.on('add-user',(userId)=>{
        global.onlineUsers.set(userId, socket.id);
        // console.log(global.onlineUsers);
    })
    socket.on('send-msg', (data) => {
        // console.log('Received message:', data);
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit('recieve-msg', data.message);                                                                  
        //   console.log('Emitted receive-msg event to:', sendUserSocket);
        }
      });
})