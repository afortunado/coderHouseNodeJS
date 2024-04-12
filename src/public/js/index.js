import io from "./app.js"
const socket = io();

socket.on('the-messege', (msg) => {
    console.log('Nuevo mensaje recibido:', msg);
    displayMessage(msg);
    let chat = document.getElementById("box")
    chat.scrollTop = chat.scrollHeight;
});

const displayMessage = (msg) => {
    const html = msg.map(data => {
        return (
            `
            <div>
                <strong>${data.author}</strong> dice <p>${data.text}</p>
            </div>
            `
        )
    }).join(' ')
    document.getElementById('box').innerHTML = html;
}

const sendMessage = async () => {
    const author = document.getElementById("name").value.trim();
    const text = document.getElementById("message").value.trim();
console.log(auth)
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

