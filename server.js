const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/users", require("./routes/user"));

app.listen(3000, () => console.log("Server running"));