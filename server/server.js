// server/server.js
import express from "express";
import cors from "cors";
import axios from "axios";
import path from "path";
import "dotenv/config";
import { fileURLToPath } from "url";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Get the current directory of the server.js file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, "./../client")));

// Route to handle home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./../client/pages", "home.html"));
});

// Route to handle fetching recommendations
app.get("/taboola/widgets", async (req, res) => {
  try {
    const response = await axios.get(process.env.BASE_URL, {
      params: {
        "app.type": "desktop",
        "app.apikey": process.env.API_KEY,
        count: 6,
        "source.type": "video",
        "source.id": "123456",
        "source.url": "http://www.site.com/videos/123456.html",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Taboola API:", error);
    res.status(500).send("Error fetching data from Taboola API");
  }
});

// Start the server and listen on port 3000 or 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
