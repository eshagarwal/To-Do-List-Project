const express = require("express");
const cors = require("cors");
const todoRoutes = require("../routes/todoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Connect todo routes
app.use("/api/todos", todoRoutes);

// Route to check server
app.get("/", (req, res) => {
  res.send("Server is running");
});

module.exports = app;
