const express = require("express");
const axios = require("axios");

const app = express();
const port = 3002;

app.use(express.json());

// Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// test
app.get("/", (req, res) => {
  res.send("Tugas 2 API is running...");
});

// Endpoint untuk cari buku dari Google Books API
// contoh: http://localhost:3002/google-books/harry potter
app.get("/google-books/:query", async (req, res) => {
    try {
      const query = req.params.query;
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
      );
      
      const books = response.data.items.map(item => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        publishedDate: item.volumeInfo.publishedDate,
        description: item.volumeInfo.description || "No description",
        pageCount: item.volumeInfo.pageCount,
        categories: item.volumeInfo.categories || [],
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || null,
      }));
  
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch data from Google Books API" });
    }
  });

// ----------- ERROR HANDLING ----------
app.use((req, res) => {
  res.status(404).send("Page not found!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(port, () => {
  console.log(`Tugas 2 server is running at http://localhost:${port}`);
});