import { prisma } from "../prisma/client";
import Joi from "joi";
import { Request, Response } from "express";
const bookSchema = Joi.object({
  title: Joi.string().min(3).required(),
});

const ratinscoreSchema = Joi.object({
  score: Joi.number().integer().min(1).max(10).required(),
});

export const books = async (req: Request, res: Response): Promise<any> => {
  const books = await prisma.book.findMany();
  return res.json(books);
};

export const createBook = async (req: Request, res: Response): Promise<any> => {
  const { error, value } = bookSchema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const book = await prisma.book.create({
    data: value,
  });
  return res.status(201).json(book);
};

export const bookById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  const book = await prisma.book.findUnique({
    where: { id: Number(id) },
    include: {
      borrows: true,
    },
  });

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const { borrows } = book;
  const ratings = borrows
    .map((borrow) => borrow.rating)
    .filter((rating) => rating !== null);

  const averageScore =
    ratings.length > 0
      ? (
          ratings.reduce((sum, rating) => sum + (rating || 0), 0) /
          ratings.length
        ).toFixed(2)
      : -1;

  const response = {
    id: book.id,
    name: book.title,
    score: averageScore,
  };

  return res.json(response);
};

export const borrowBook = async (req: Request, res: Response): Promise<any> => {
  const { userid, bookid } = req.params;

  const book = await prisma.book.findUnique({ where: { id: Number(bookid) } });
  if (!book) return res.status(404).json({ error: "Book not found" });

  const user = await prisma.user.findUnique({ where: { id: Number(userid) } });
  if (!user) return res.status(404).json({ error: "User not found" });

  const activeBorrow = await prisma.borrow.findFirst({
    where: { bookId: Number(bookid), returnedAt: null },
  });
  if (activeBorrow)
    return res.status(400).json({ error: "Book is already borrowed" });

  const borrow = await prisma.borrow.create({
    data: {
      bookId: Number(bookid),
      userId: Number(userid),
    },
  });

  return res.status(201).json(borrow);
};

export const returnBook = async (req: Request, res: Response): Promise<any> => {
  const { userid, bookid } = req.params;
  const { error, value } = ratinscoreSchema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });
  const { score } = value;

  const book = await prisma.book.findUnique({ where: { id: Number(bookid) } });
  if (!book) return res.status(404).json({ error: "Book not found" });

  const user = await prisma.user.findUnique({ where: { id: Number(userid) } });
  if (!user) return res.status(404).json({ error: "User not found" });

  const activeBorrow = await prisma.borrow.findFirst({
    where: { bookId: Number(bookid), userId: Number(userid), returnedAt: null },
  });
  if (!activeBorrow)
    return res
      .status(400)
      .json({ error: "Book is not currently borrowed by this user" });

  const updatedBorrow = await prisma.borrow.update({
    where: { id: activeBorrow.id },
    data: { returnedAt: new Date(), rating: score },
  });

  return res.status(200).json(updatedBorrow);
};
