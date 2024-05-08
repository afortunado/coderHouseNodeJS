const socket = io();

socket.on('newMessage', (message) => {
    console.log('New message received:', message);
});

const sendMsg = async() => {
   const user = document.getElementById("name").value.trim()
   const message = document.getElementById("message").value.trim()
console.log(user, message)
  if (!user || !message) {
    alert("Name and message are required!");
    return;
  } 
  try{
    const response = await fetch('http://localhost:8080/api/chat', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user, message })
    });
    if (!response.ok) {
      throw new Error('Failed to save message');
    }
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";

  } catch (error) {
    console.error(error);
  }

  return false;
}