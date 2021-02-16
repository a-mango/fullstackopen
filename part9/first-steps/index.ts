import express, { Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, ExerciseResult } from "./exerciseCalculator";

const app = express();
app.use(express.json());

/**
 * Exercise input model
 */
type ExerciseInputModel = {
  daily_exercises: number[];
  target: number;
};

// Hello route
app.get("/hello", (_req, res) => {
  const html = `<h1>Hello Full Stack!</h1>`;
  res.send(html);
});

/**
 * WebBMI Route
 */
app.get("/bmi", (req, res) => {
  // Validate input
  if (
    !req.query.height ||
    !req.query.weight ||
    isNaN(+req.query.height) ||
    isNaN(+req.query.weight)
  ) {
    return res.status(400).send({ error: "invalid parameters" });
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
});

/**
 * WebExercises route
 */
app.post(
  "/exercises",
  (req: Request<unknown, unknown, ExerciseInputModel>, res: Response) => {
    // Validate input
    if (!req.body || !req.body.daily_exercises || !req.body.target) {
      return res.status(400).send({ error: "parameters missing" });
    }

    // Extract values
    const { daily_exercises: dailyExercises, target } = req.body;

    // Validate values
    if (dailyExercises.some((i) => isNaN(i) || isNaN(target))) {
      return res.status(400).send({ error: "malformatted parameters" });
    }

    console.log(req.body);

    // Calculate result
    const result: ExerciseResult = calculateExercises(dailyExercises, target);

    // Return result
    return res.send(result);
  }
);

// Port to listen to
const PORT = 3003;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
