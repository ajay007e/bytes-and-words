const path = require("path");
const http = require("http");
const express = require("express");
const cors = require("cors");

const router = require("./routes/main");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

