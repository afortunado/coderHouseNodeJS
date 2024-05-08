document.getElementById("submitBtn").addEventListener("click", async (event) => {
    event.preventDefault();
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
  })