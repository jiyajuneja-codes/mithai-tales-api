const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = 3000;

// Inbuilt Middleware
app.use(express.json());

// Third-party Middleware
app.use(morgan("dev"));

// Custom Middleware - logs URL, Method, time, IP
app.use((req, res, next) => {
    const time = new Date().toLocaleString();
    console.log(
        `URL: ${req.url} | Method: ${req.method} | Time: ${time} | IP: ${req.ip}`
    );
    next();
});

// Route 1 - Simple GET
app.get("/", (req, res) => {
    res.send("Welcome to Mithai Tales API 🪔 - Explore the history of Indian Sweets!");
});

// Route 2 - Params
app.get("/sweets/:name", (req, res) => {
    const name = req.params.name;
    res.send(`Exploring the history of ${name} 🍬`);
});

// Route 3 - Query Params 
app.get("/sweets",(req, res) => {
    const era = req.query.era;

    if (era) {
        res.send(`Showing sweets from the ${era} era`);
    } else {
    res.send("Welcome to Mithai Tales! Use? era=mughal to filter sweets by era 🪔");
    }
});

//  Route 4 - req.body (POST)
app.post("/sweets/add", (req, res)=> {
    const data = req.body;
    res.json({
        message: "Sweet added to Mithai Tales successfully!🎉",
        data: data
    });
});

// Start Server 
app.listen(PORT, () => {
    console.log(`Mithai Tales API server running on port ${PORT}🚀`);
});