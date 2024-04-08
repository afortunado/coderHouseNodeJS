import io from "./app.js"
const socket = io();

socket.on('new-message', (message) => {
    console.log('New message: ', message);
});

const sendMessage = async (message) => {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        return data;
    } catch (error) { 
        throw new Error('Error al enviar el mensaje:', error);
    }
};
 
sendMessage('kdmfpskfmspfsdofkfsd');

