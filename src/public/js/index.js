const renderMsg = async (req, res, next) => {
  try {
    const messagesResponse = await fetch('http://localhost:8080/api/chat');
    if (!messagesResponse.ok) {
      res.status(500).send('Fetch error');
    }
    const messages = await messagesResponse.json();
    res.render("chat", {messages});
  } catch (error) {
    next(error);
  }
}

const sendMsg = async() => {
   const author = document.getElementById("name").value.trim()
   const text = document.getElementById("message").value.trim()

  if (!author || !text) {
    alert("Name and message are required!");
    return;
  } 
  try{
    const response = await fetch('http://localhost:8080/api/chat', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ author, text })
    });
    if (!response.ok) {
      throw new Error('Failed to save message');
    }
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";

    await renderMsg();
  } catch (error) {
    console.error('Error saving message:', error);
  }

  return false;
}
