import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import bookRoutes from './routes/bookRoutes';

const app = express();
app.use(cors());
app.use(express.json());

// Monta el router UNA sola vez:
app.use('/books', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`API Corrieendo http://localhost:${PORT}`)
);
