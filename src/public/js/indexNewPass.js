import userService from "../../dao/db/managers/userManagerMongo.js";
import User from "../models/userModel.js"
import { createHash } from "../../utils/bcrypt.js";
import { correctPassword } from "../../utils/bcrypt.js";

document.getElementById("btn").addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim()
    const pass = document.getElementById("newPassword").value.trim()
    if(!email || !pass){
      alert("All info is required");
    }

    try{
      let user = await userService.getUserByEmail(userEmail)
      if(!user){
        alert("User not found")
      } else if(await correctPassword(pass, user.password)) {
        alert("Can not use same password, change it please")
      } else {
        let hashedPassword = await createHash(pass)
        user.password = hashedPassword
      }
        const response = await fetch('http://localhost:9090/email/newPass', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, hashedPassword })
        });
        
        if(!response.ok){
          throw new Error("Failed to save user")
        }
  
        document.getElementById("email").value = "";
        document.getElementById("pass").value = "";
  
    }catch(err){
      throw new Error(err)
    }
  })