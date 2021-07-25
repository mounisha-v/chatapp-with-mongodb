

const socket=io();
var name;
//getting elemnts from html file
let textarea=document.querySelector('#textarea');
let messagearea=document.querySelector('.message-area')

//to get the user name entering chat interface
 do {
name=prompt('please enter your name:')
 } while(!name)
textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})




function sendMessage(message){
    let msg={
        user:name,
        message:message.trim()
    }
    appendMessage(msg,'outgoing-msg')
    textarea.value=''
     socket.emit('message',msg)
     scrollToBottom()
    }



function  appendMessage(msg,type){
//creating div to append messages
 let maindiv=document.createElement('div')
 let classname=type
 maindiv.classList.add(classname,'message')

 let markup=`<h4>${msg.user}</h4>
 <p>${msg.message}</p>`
 maindiv.innerHTML=markup
 messagearea.appendChild(maindiv)
}


socket.on('message',(msg)=>{
 appendMessage(msg,'incoming-msg')
 scrollToBottom();
})
// messages to display from database
socket.on('incoming-msg',(msg)=>{
    console.log(msg)
    for(var i=0;i<msg.length;i++){
        appendMessage(msg[i].msg,msg[i].user,'incoming-msg')
    }
   
    scrollToBottom();
   })

   
function scrollToBottom(){
    messagearea.scrollTop=messagearea.scrollHeight
}