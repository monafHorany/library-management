import express from "express";
import { bookById, books, createBook } from "../controllers/books";

const router = express.Router();

router.get("/", books);

router.get("/:id", bookById);

router.post("/", createBook);

export default router;
