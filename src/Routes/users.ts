import express from "express";
import { prisma } from "../prisma/client";
import { createUser, userById, users } from "../controllers/users";
import { borrowBook, returnBook } from "../controllers/books";

const router = express.Router();

router.get("/", users);

router.get("/:id", userById);

router.post("/", createUser);

router.post("/:userid/borrow/:bookid", borrowBook);
router.post("/:userid/return/:bookid", returnBook);

export default router;
