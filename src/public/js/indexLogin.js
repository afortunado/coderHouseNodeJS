document.getElementById("loginBtn").addEventListener("click", async (event) => {
    event.preventDefault();

    const email = document.getElementById("emailLog").value.trim()
    const password = document.getElementById("passwordLog").value.trim()
    if(!email || !password){
      alert("Name and password are required");
    }
  
    try{
        const response = await fetch('http://localhost:8080/api/user/login', {
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
  
document.getElementById("logoutBtn").addEventListener("click", async (event) => {
  event.preventDefault();
  
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