const express=require('express')



const mongoose=require('mongoose')
const Msg=require('./models/messages')
const mongoDB='mongodb+srv://mounisha:roopa@cluster0.d5oju.mongodb.net/chatapp?retryWrites=true&w=majority'
mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false}).then(()=>{
    console.log('connected')
}).catch(err=>console.log(err))


const app=express()


const http=require('http').createServer(app)
const PORT=process.env.PORT|| 9000
http.listen(PORT,()=>{
    console.log(`listening on port${PORT}`)
})

app.use(express.static(__dirname +'/public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})



//socket


const io=require('socket.io')(http)

io.on('connection',(socket)=>{
Msg.find().then((result)=>{
socket.broadcast.emit('incoming-msg',result)
})
    console.log('Conecting......')

    socket.on('message',(msg)=>{
        const message=new Msg({msg});
        message.save().then(()=>{
         socket.broadcast.emit('message',msg)
        })
       
    })
})