require("dotenv").config();

const express = require("express");
const app = express();

const apiRoutes = require("./routes/api");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Use API routes
app.use("/", apiRoutes);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
