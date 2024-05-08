document.getElementById("loginBtn").addEventListener("click", async (event) => {
    event.preventDefault();

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