// Import express
const express = require("express");

// Create app
const app = express();

// Define port
const PORT = 3000;

// Middleware (optional but useful)
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Hello World 🚀");
});

app.get("/about", (req, res) => {
    res.send("This is About Page");
});

app.post("/data", (req, res) => {
    const data = req.body;
    res.json({
        message: "Data received successfully",
        data: data
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
