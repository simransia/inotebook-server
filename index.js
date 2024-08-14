const express = require("express");
const dotenv = require("dotenv");
const connectToMongo = require("./database ");
const { errorHandler, notFound } = require("./middleware/error.js");
const path = require("path");
var cors = require("cors");

dotenv.config();

connectToMongo();

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Auth-Token", "Authorization"],
  })
);

app.use(express.json()); // to accept json data

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// --------------------------deployment------------------------------

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "frontend", "build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }
// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`iNotebook backend listening on port ${PORT}`));
