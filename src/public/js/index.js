import io from "./app.js"
const socket = io();

socket.on('new-message', (message) => {
    console.log('Nuevo mensaje recibido:', message);
});

const sendMessage = async (message) => {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            msg: JSON.stringify({ message })
        });

        const data = await response.json();
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
};

sendMessage('kdmfpskfmspfsdofkfsd');

