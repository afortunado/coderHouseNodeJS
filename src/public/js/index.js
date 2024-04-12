import io from "./app.js"
const socket = io();

socket.on('new-message', (msg) => {
    console.log('Nuevo mensaje recibido:', msg);
    displayMessage(msg);
});

const sendMessage = async () => {
    const author = document.getElementById("name").value.trim();
    const text = document.getElementById("message").value.trim();

    if(!author || !text){
        alert("Name and text are required!")
        return false
    }

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({ author, text }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        socket.emit("new-message", data);

        document.getElementById("message") = "";

        return false;
    } catch (error) { 
        throw new Error('Error al enviar el mensaje:', error);
    }
};
 
const displayMessage = (msg) => {
    const messageInfo = document.getElementById('box');
    messageInfo.innerText = `${msg.author}: ${msg.text}`;
}

document.getElementById("chatForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    await sendMessage();
});
