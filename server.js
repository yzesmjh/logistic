const dotenv = require("dotenv").config({ path: ".env" });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const packageRoute = require("./routes/packageRoute");
const errorHandler = require("./middleWare/errorHandler");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path"); // Add this line

mongoose.set("strictQuery", true);

const app = express();
const server = http.createServer(app); // Create an HTTP Server

// Initialize Socket.IO and attach it to the HTTP server
const io = socketIo(server);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// app.use(express.static(path.join(__dirname, "./frontend/")))
// app.get("*", function (_, res) {
//     res.sendFile(
//         path.join(__dirname, "./frontend/dist/index.html"),
//         function (err) {
//             if (err) {
//             console.log(err);
//                 res.status(500).send(err);
//             }
//         }
//     )
// })

//Route Middleware
app.use("/api/users", userRoute);
app.use("/api/package", packageRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Ping endpoint — called by the frontend on first load to wake this
// Render instance from sleep. Returns immediately once the server is up.
app.get("/ping", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is awake" });
});

//so that file can be accessed
app.use("/uploads", express.static("uploads"));

// Error Middleware
app.use(errorHandler);

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("Client connected");

  // Example: Emit a message to the client on connection
  socket.emit("message", "Welcome to the server!");

  // Example: Handle a client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

//connect to DB and start Server
const PORT = process.env.PORT || 6000;
// mongoose.set('debug', true);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
