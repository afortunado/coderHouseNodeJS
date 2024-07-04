document.getElementById("logoutBtn").addEventListener("click", async (event) => {
    event.preventDefault();
    
    try{
      const response = fetch("http://localhost:9090/api/sessions/logout", {
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