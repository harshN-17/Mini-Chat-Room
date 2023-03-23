const sendbtn = document.getElementById('send-btn');
const chat = document.querySelector('.chat-messages');

const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

//catches msg on server emits
socket.on('message', (msg) => { 
    console.log(msg);
    outputMsg(msg);
})

//join chat room
socket.emit('joinRoom', {username, room});

sendbtn.addEventListener('click', (e) => {
    e.preventDefault();
    let msg = document.getElementById('msg').value;
    console.log(msg);
    socket.emit('chatMsg', msg);
    chat.scrollTop =  chat.scrollHeight;

    document.getElementById('msg').value = '';
    document.getElementById('msg').focus();
})

//output to the client site
function outputMsg(msg) {
    const msgdiv = document.createElement('div');
    msgdiv.innerHTML = 
    `<p class="meta">${msg.username} <span> ${msg.time}</span></p>
    <p class="text">
        ${msg.text}
    </p>`;
    msgdiv.classList += 'message';
    console.log("added");           
    document.querySelector('.chat-messages').appendChild(msgdiv);

}
