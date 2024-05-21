document.getElementById("submitBtn").addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value.trim()
    
    if(!email || !password){
      alert("Name and password are required");
    }
    try{
        const response = await fetch('http://localhost:8080/api/sessions/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        
        if(!response.ok){
          throw new Error("Failed to save user")
        }
  
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
  
    }catch(err){
      console.error(err)
    }
  })