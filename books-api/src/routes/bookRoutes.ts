import { Router } from 'express';
import {
  fetchBooks,
  fetchBookById,
  addBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController';

const router = Router();

router.get('/', fetchBooks);
router.get('/:id', fetchBookById);
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
