let socket =  io();
socket.on('cryptAsk', (crypt)=>{
  console.log(crypt)
})
