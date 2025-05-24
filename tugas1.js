const express = require("express");

const app = express();
const port = 3001;

app.use(express.json());

// Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

// Middleware Authorization (token 2410512113)
function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (token == "2410512113") {
        next();
    } else {
        res.status(401).send("Unauthorized!");
    }
};

// Database lokal (array)
let books = [
    {
      id: 16789765432134,
      title: "Clean Code",
      author: "Robert C. Martin",
      date_release: "2008-08-01"
    },
    {
      id: 13456789808865,
      title: "Atomic Habits",
      author: "James Clear",
      date_release: "2018-10-16"
    },
    {
      id: 109856324134567,
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
      date_release: "1999-10-30"
    }
  ];

// ---------- CREATE ----------
// 1. Tambah buku baru
app.post("/books", (req, res) => {
    const { title, author, date_release } = req.body;
    if (!title || !author || !date_release) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const newBook = { id: Date.now(), title, author, date_release };
    books.push(newBook);
    res.status(201).json({ message: "Book added", book: newBook });
});

// 2. Tambah buku (auth)
app.post("/books/secure", authMiddleware, (req, res) => {
    const { title, author, date_release } = req.body;
    const newBook = { id: Date.now(), title, author, date_release };
    books.push(newBook);
    res.status(201).json({ message: "Secure book added", book: newBook });
});

// 3. Tambah beberapa buku sekaligus
app.post("/books/bulk", (req, res) => {
    const newBooks = req.body.books;
    if (!Array.isArray(newBooks)) return res.status(400).json({ error: "books must be array" });
    newBooks.forEach(b => {
        books.push({ id: Date.now() + Math.random(), ...b });
    });
    res.status(201).json({ message: "Books added", total: newBooks.length });
});

// - ---------- READ ----------
// 1. Lihat semua buku
app.get("/books", (req, res) => {
    if (books.length === 0) {
        return res.status(404).json({ message: "No books available" });
    }
    res.json(books);
});

// 2. Cari buku berdasarkan ID
app.get("/books/:id", (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
});

// 3. Cari berdasarkan kata kunci judul
app.get("/books/search/:keyword", (req, res) => {
    const keyword = req.params.keyword.toLowerCase();
    const result = books.filter(b => b.title.toLowerCase().includes(keyword));

    if (result.length === 0) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.json(result);
});

// ---------- UPDATE ----------
// 1. Update semua data buku
app.put("/books/:id", (req, res) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: "Book not found" });

    const { title, author, date_release } = req.body;
    books[index] = { ...books[index], title, author, date_release };
    res.json({ message: "Book updated", book: books[index] });
});

// 2. Ubah hanya judul
app.patch("/books/:id/title", (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    book.title = req.body.title;
    res.json({ message: "Title updated", book });
});

// 3. Update pakai auth
app.put("/books/secure/:id", authMiddleware, (req, res) => {
    const { title, author, date_release } = req.body;
    const index = books.findIndex(b => b.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: "Book not found" });

    books[index] = { ...books[index], title, author, date_release };
    res.json({ message: "Secure update success", book: books[index] });
});

// ---------- DELETE ----------
// 1. Hapus satu buku berdasarkkan ID
app.delete("/books/:id", (req, res) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: "Book not found" });

    const deleted = books.splice(index, 1);
    res.json({ message: "Book deleted", deleted });
});

// 2. Hapus semua buku
app.delete("/books", (req, res) => {
    books = [];
    res.json({ message: "All books deleted" });
});

// 3. Hapus berdasarkan judul
app.delete("/books/title/:title", (req, res) => {
    const title = req.params.title.toLowerCase();
    const before = books.length;
    books = books.filter(b => b.title.toLowerCase() !== title);
    const after = books.length;
    const deletedCount = before - after;

    if (deletedCount === 0) {
        return res.status(404).json({ message: `No book found with title '${req.params.title}'` });
    }

    res.json({ message: "Deleted by title", deleted: deletedCount });
});

// ----------- ERROR HANDLING ----------
app.use((req, res) =>{
    res.status(404).send("Page not found!");
});

app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});