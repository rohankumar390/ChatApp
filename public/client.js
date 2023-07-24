const socket = io();

let nn;

let textarea = document.querySelector("#textarea");

let messageArea = document.querySelector(".message__area");

do {
  nn = prompt("Please enter your name");
} while (!nn);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: nn,
    message: message.trim(),
  };

  // Append

  appendMessage(msg, "outgoing");
  textarea.value=''
  // send to server
  scrollToBottom()
  socket.emit('message',msg)
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");

  let className = type;

  mainDiv.classList.add(className, "message");

  let markup = `
    
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markup;

  messageArea.appendChild(mainDiv)
}


// Recieve 

socket.on('message',(msg)=>{
appendMessage(msg,'incoming')
scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}