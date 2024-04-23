import io from "../app.js"
const socket = io();
 
export const renderProducts = async(req, res, next) => {
    try{
          const response = await fetch('http://localhost:8080/api/products'); 
          if (!response.ok) {
            res.status(500).send('Fetch error');
          }
          const products = await response.json();
          res.render('products', { products });
        } catch (error) {
          next(error)
        }
  }

export const renderChat = async (req, res, next) => {
  try {
      const author = req.body.user;
      const message = req.body.message;
  
      if (!author || !message) {
        return res.status(400).json({ error: "Name and text are required!" });
      }
    const msg = { user: author, message: message}
    
    socket.emit("new-message", msg);
 
    res.render("chat", { msg });
  } catch (error) {
    next(error);
  }
};