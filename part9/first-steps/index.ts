import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

// Hello route
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack !');
});

// BMI route
app.get('/bmi', (req, res) => {
  try {
    // Validate input
    if (
      !req.query.height ||
      !req.query.weight ||
      isNaN(+req.query.height) ||
      isNaN(+req.query.weight)
    ) {
      throw new Error('Invalid parameters');
    }

    // Extract values and calculate BMI
    const { height, weight } = req.query;
    const bmi = calculateBmi(+height, +weight);

    // Return appropriate object
    return res.send({
      height: +height,
      weight: +weight,
      bmi,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ error: 'One or more parameters are missing or incorrect' });
  }
});

// Port to listen to
const PORT = 3003;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
