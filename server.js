const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

// Sample data
const books = [
  { isbn: "1", title: "Things Fall Apart", author: "Chinua Achebe", reviews: [] },
  { isbn: "2", title: "Fairy tales", author: "Hans Christian Andersen", reviews: [] },
  { isbn: "3", title: "The Divine Comedy", author: "Dante Alighieri", reviews: [] },
  { isbn: "4", title: "The Epic of Gilgamesh", author: "Unknown", reviews: [
    { username: "user", review: "Great Book" }
  ] },
  { isbn: "5", title: "The Book of Job", author: "Unknown", reviews: [] }
];

const users = [];


app.get('/', (req, res) => {
  res.json(books);
});


app.get('/isbn/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});


app.get('/author/:author', (req, res) => {
  const authorBooks = books.filter(b => b.author === req.params.author);
  res.json(authorBooks);
});


app.get('/title/:title', (req, res) => {
  const book = books.find(b => b.title === req.params.title);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});


app.get('/review/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (book) {
    res.json(book.reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});


app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    res.status(400).json({ message: "Username already exists" });
  } else {
    users.push({ username, password });
    res.status(201).json({ message: "User registered successfully" });
  }
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});


app.post('/review/:isbn', (req, res) => {
  const { username, review } = req.body;
  const book = books.find(b => b.isbn === req.params.isbn);
  if (book) {
    const existingReview = book.reviews.find(r => r.username === username);
    if (existingReview) {
      existingReview.review = review;
    } else {
      book.reviews.push({ username, review });
    }
    res.json({ message: "Review added/modified successfully" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});


app.delete('/review/:isbn', (req, res) => {
  const { username } = req.body;
  const book = books.find(b => b.isbn === req.params.isbn);
  if (book) {
    const reviewIndex = book.reviews.findIndex(r => r.username === username);
    if (reviewIndex !== -1) {
      book.reviews.splice(reviewIndex, 1);
      res.json({ message: "Review deleted successfully" });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});