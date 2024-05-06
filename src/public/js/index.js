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

const registerData = async() => {
  const userEmail = document.getElementById("email").value.trim()
  const userPassword = document.getElementById("password").value.trim()
  if(!userEmail || !userPassword){
    alert("Name and password are required");
  }
  try{
      const response = await fetch('http://localhost:8080/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userEmail, userPassword })
      });
      
      if(!response.ok){
        throw new Error("Failed to save user")
      }

      document.getElementById("email").value = "";
      document.getElementById("password").value = "";

  }catch(err){
    console.error(err)
  }
  return false;
}

const loginData = async() => {
  const userEmail = document.getElementById("emailLog").value.trim()
  const userPassword = document.getElementById("passwordLog").value.trim()
  if(!userEmail || !userPassword){
    alert("Name and password are required");
  }

  try{
      const response = await fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userEmail, userPassword })
      });
      
      if(!response.ok){
        throw new Error("Failed to save user")
      }

      document.getElementById("email").value = "";
      document.getElementById("password").value = "";

  }catch(err){
    throw new Error(err)
  }
  return false;
}

const logoutData = async() => {
  document.getElementById("logoutBtn").addEventListener("click", async () => {
    try{
      const response = fetch("http://localhost:8080/api/user/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          }
        })

        if(!response.ok){
          throw new Error("Failed logout")
        }

    }catch(err){ throw new Error(err)}
  })
}