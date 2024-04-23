document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chatForm');

  chatForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const author = document.getElementById("name").value.trim();
    const text = document.getElementById("message").value.trim();

    if (!author || !text) {
      alert("Name and text are required!");
      return false;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ user: author, message: text }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      socket.emit("new-message", data);

      document.getElementById("message").value = "";
    } catch (error) {
      console.error('Error:', error);
    }
  });
});