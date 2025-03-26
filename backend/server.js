const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan"); 
const accountRoutes = require("./routes/accounts");
const authRoutes = require("./routes/auth");

const connectDB = require("./db/connect");
const cookieParser = require("cookie-parser");
const transactionRoutes = require("./routes/transactions");

dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

// Default route to prevent 404 errors on root
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/auth", authRoutes);
app.use("/account", accountRoutes);
app.use("/transaction", transactionRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is up and running at port ${PORT}`);
  connectDB();
});

