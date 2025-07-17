import express, { Application } from 'express';
import cors from 'cors';
import corsOptions from './config/cors';
import index from './routes/index';
import { errorMiddleware } from './middlewares/error.middleware';


const app: Application = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', index);

app.use(errorMiddleware);

export default app;
