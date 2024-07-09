document.getElementById("submitBtn").addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value.trim()
    const first_name = document.getElementById("first_name").value.trim()
    const last_name = document.getElementById("last_name").value.trim()
    const age = document.getElementById("age").value.trim()
  
    if(!email || !password || !age || !first_name || !last_name){
      alert("All info is required");
    }
    try{
        const response = await fetch('http://localhost:9090/api/sessions/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ first_name, last_name, email, password, age})
        });
        
        if(!response.ok){
          throw new Error("Failed to save user")
        }
  
        document.getElementById("email").value = " ";
        document.getElementById("password").value = " ";
        document.getElementById("age").value = " ";
        document.getElementById("first_name").value = " ";
        document.getElementById("last_name").value = " ";
  
    }catch(err){
      console.error(err)
    }
  })