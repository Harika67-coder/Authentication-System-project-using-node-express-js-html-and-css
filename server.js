const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static("public")); // Serve static HTML files

// Use authentication routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
const DB_NAME = process.env.DB_NAME || 'default.sqlite';
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
