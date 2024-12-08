import express from 'express';
import usersRouter from './Routes/users';
import booksRouter from './Routes/books';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', usersRouter);
app.use('/books', booksRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
