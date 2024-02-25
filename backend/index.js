import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
// Option 1: Allow all origins(*)
// app.use(cors());

// Option 2: Allowing Custom Origins (giving permissions only the requests that we want to access backend)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// connecting to database
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Database Connected..");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => console.log("Error in connecting database"));

// Using bookRoute
app.use("/books", booksRoute);
