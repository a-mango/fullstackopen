import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

/**
 * Express setup
 */
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

/**
 * Ping endpoint
 */
app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

/**
 * Setup routes
 */
app.use('/api/diagnosis', diagnosesRouter);
app.use('/api/patients', patientsRouter);

/**
 * Start the server
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
