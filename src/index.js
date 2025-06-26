require("dotenv-flow").config();

const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");

const apiRoutes = require("./routes/api");

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://shahrukhanwar.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    // Allow main domain and all Vercel preview domains
    if (
      allowedOrigins.includes(origin) ||
      /^https:\/\/shahrukhanwar(-git-[^\.]+)?-.*\.vercel\.app$/.test(origin)
    ) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  }
}));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Use API routes
app.use("/", apiRoutes);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
