import express from 'express';
import morgan from 'morgan';
import sanitizeMongo from 'express-mongo-sanitize';
import connectDB from './startup/connectDB.js';
import coursesRouter from './routes/courses.js';
import studentsRouter from './routes/students.js';

const app = express();

connectDB();
app.use(morgan('tiny'));
app.use(express.json());
app.use(sanitizeMongo());
app.use('/api/courses', coursesRouter);
app.use('/api/students', studentsRouter);

export default app;
