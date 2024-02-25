import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();

// Route to Save a Book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message:
          "Please fill all the required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    //res.status(200).send({ message: "Book Added Succesfully" });

    // return res.status(201).send(book);

    res.status(201).json(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Route to get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Route to get an individual book based on id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Route to update book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message:
          "Please fill all the required fields: title, author, publishYear",
      });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(400).json({ message: "Book Not Found" });
    }

    res.status(200).send({ message: "Book updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Route to delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).send({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

export default router;
