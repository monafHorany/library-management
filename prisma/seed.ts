import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: "Alice",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Charlie",
    },
  });

  const book1 = await prisma.book.create({
    data: {
      title: "The Great Gatsby",
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: "1984",
    },
  });

  const book3 = await prisma.book.create({
    data: {
      title: "Brave New World",
    },
  });

  const book4 = await prisma.book.create({
    data: {
      title: "The Catcher in the Rye",
    },
  });

  await prisma.borrow.create({
    data: {
      borrowedAt: new Date(),
      userId: user1.id,
      bookId: book1.id,
    },
  });

  await prisma.borrow.create({
    data: {
      borrowedAt: new Date(),
      returnedAt: new Date(),
      userId: user2.id,
      bookId: book2.id,
    },
  });

  await prisma.borrow.create({
    data: {
      borrowedAt: new Date(),
      userId: user3.id,
      bookId: book3.id,
    },
  });

  await prisma.borrow.create({
    data: {
      borrowedAt: new Date("2024-05-01"),
      returnedAt: new Date("2024-06-01"),
      userId: user1.id,
      bookId: book2.id,
    },
  });

  await prisma.borrow.create({
    data: {
      borrowedAt: new Date(),
      userId: user2.id,
      bookId: book4.id,
    },
  });

  console.log("Seed data has been successfully inserted!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
