const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const slideRoutes = require("./routes/slide");
const userRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/slide", slideRoutes);


app.get("/", async (req, res) => {
  res.status(200).json("Server is up and running");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

console.log("Before MongoDB connection");
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Db connected");

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}`);
    });

    console.log("After MongoDB connection");
  })
  .catch((error) => {
    console.log("Failed to connect", error);
  });
