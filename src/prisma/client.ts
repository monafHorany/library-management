import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function getUserWithBooks(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
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

  return {
    id: user.id,
    name: user.name,
    books: {
      past,
      present,
    },
  };
}
