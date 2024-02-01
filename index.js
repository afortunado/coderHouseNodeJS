import app from './src/app.js'
const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
    console.log("Server running on port", PORT)
});