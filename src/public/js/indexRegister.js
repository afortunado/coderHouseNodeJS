document.getElementById("submitBtn").addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value.trim()
    const firstName = document.getElementById("first_name").value.trim()
    const lastName = document.getElementById("last_name").value.trim()
    const age = document.getElementById("age").value.trim()
    
    if(!email || !password || !age || !firstName || !lastName){
      alert("All info is required");
    }
    try{
        const response = await fetch('http://localhost:8080/api/sessions/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password, age, firstName, lastName })
        });
        
        if(!response.ok){
          throw new Error("Failed to save user")
        }
  
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("age").value = "";
        document.getElementById("first_name").value = "";
        document.getElementById("last_name").value = "";
  
    }catch(err){
      console.error(err)
    }
  })