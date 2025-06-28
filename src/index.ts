const express = require("express");
const app = express();
const swaggerSetup = require("./swagger");

// ...existing middleware and routes...

swaggerSetup(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
