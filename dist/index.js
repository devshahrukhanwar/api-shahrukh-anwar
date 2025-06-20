import dotenv from "dotenv";
import express from "express";
import apiRoutes from "./routes/api.js";
dotenv.config();
const app = express();
// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
// Use API routes
app.use("/", apiRoutes);
app.listen(3000, () => console.log("Server ready on port 3000."));
export default app;
