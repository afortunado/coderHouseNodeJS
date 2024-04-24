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

export const renderMsg = async (req, res, next) => {
  try {
    const messagesResponse = await fetch('http://localhost:8080/api/chat');
    if (!messagesResponse.ok) {
      res.status(500).send('Fetch error');
    }
    const messages = await messagesResponse.json();
    res.render("chat", {messages});
  } catch (error) {
    next(error);
  }
}