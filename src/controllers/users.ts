import { json, Request, Response } from "express";
import { getUserWithBooks, prisma } from "../prisma/client";
import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

export const users = async (req: any, res: any): Promise<any> => {
  const users = await prisma.user.findMany();
  return res.json(users);
};

export const createUser = async (req: any, res: any): Promise<any> => {
  const { error, value } = userSchema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  const user = await prisma.user.create({
    data: value,
  });
  return res.status(201).json(user);
};

export const userById = async (req: any, res: any): Promise<any> => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: {
      borrows: {
        include: {
          book: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const past = user.borrows
    .filter((borrow) => borrow.returnedAt)
    .map((borrow) => ({
      name: borrow.book.title,
      userScore: borrow.rating,
    }));

  const present = user.borrows
    .filter((borrow) => !borrow.returnedAt)
    .map((borrow) => ({
      name: borrow.book.title,
    }));

  return res.json({
    id: user.id,
    name: user.name,
    books: {
      past,
      present,
    },
  });
};
