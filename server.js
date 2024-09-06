require("dotenv").config();
const express = require("express");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Route to fetch images
app.get("/api/images", async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression("folder:drewdella")
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute();
    const images = result.resources.map((file) => file.secure_url);
    res.json({ images });
  } catch (error) {
    console.error("Failed to retrieve images:", error);
    res.status(500).send("Failed to retrieve images");
  }
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`),
);
