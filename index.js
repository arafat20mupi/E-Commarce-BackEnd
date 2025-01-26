const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const adminRouter=require("./Firebase/adminRouter")
const path = require("path");
const connectDB = require("./Config/dbConfig");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
// Body parser middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
  })
);

app.use(express.json());

app.use('/api',adminRouter)

//  Home route
app.get("/", (req, res) => {
  res.send("hello Developer");
});

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});