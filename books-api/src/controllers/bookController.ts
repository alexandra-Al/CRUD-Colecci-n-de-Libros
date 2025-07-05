import { RequestHandler } from 'express';
import { pool } from '../db';
import { Book } from '../models/book';

/** GET /books */
export const fetchBooks: RequestHandler = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM books');
  res.json(rows);          // ← enviamos, no devolvemos
};

/** GET /books/:id */
export const fetchBookById: RequestHandler = async (req, res) => {
  const [rows]: any = await pool.query('SELECT * FROM books WHERE id = ?', [
    req.params.id,
  ]);

  if (rows.length === 0) {
    res.status(404).json({ message: 'Not found' });
    return;                // ← cortamos sin devolver Response
  }

  res.json(rows[0]);
};

/** POST /books */
export const addBook: RequestHandler = async (req, res) => {
  const book: Book = req.body;
  const [result]: any = await pool.query('INSERT INTO books SET ?', [book]);
  res.status(201).json({ ...book, id: result.insertId });
};

/** PUT /books/:id */
export const updateBook: RequestHandler = async (req, res) => {
  const book: Book = req.body;
  await pool.query('UPDATE books SET ? WHERE id = ?', [book, req.params.id]);
  res.json({ ...book, id: Number(req.params.id) });
};

/** DELETE /books/:id */
export const deleteBook: RequestHandler = async (req, res) => {
  await pool.query('DELETE FROM books WHERE id = ?', [req.params.id]);
  res.status(204).send();
};
