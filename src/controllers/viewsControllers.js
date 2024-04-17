import io from "../app.js"

res.render("chat", {})


const message = req.body.message;

io.emit('new-message', message);

res.status(200).json({ message: 'Mensaje guardado correctamente' });