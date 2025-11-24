const path = require("path");
const http = require("http");
const express = require("express");
const cors = require("cors");

const router = require("./routes/main");
const adminRouter = require("./routes/admin");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.use("/admin", adminRouter);


app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

