let socket =  io();
socket.on('cryptAsk', (crypt)=>{
  console.log(crypt)
    const main = document.querySelector('ol');
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
    crypt.forEach((item, index)=>{
		const listElement = document.createElement('li')
        listElement.textContent = `${item.currency} - ${item.price}`
		document.querySelector('#main ol').appendChild(listElement)
    })


});
