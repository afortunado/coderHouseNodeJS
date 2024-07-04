document.getElementById("loginBtn").addEventListener("click", async (event) => {
  
    const email = document.getElementById("emailLog").value.trim()
    const password = document.getElementById("passwordLog").value.trim()
    if(!email || !password){
      alert("Name and password are required");
    }
  
    try{
        const response = await fetch('http://localhost:9090/api/sessions/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        
        if(!response.ok){
          throw new Error("Failed to save user")
        }

        document.getElementById("emailLog").value = "";
        document.getElementById("passwordLog").value = "";
        
    }catch(err){
      throw new Error(err)
    }
  })
