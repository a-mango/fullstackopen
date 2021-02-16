/**
 * Exercise Calculator
 *
 * Write a function calculateExercises that calculates the
 * average time of daily exercise hours and compares it to
 * the target amount of daily hours and returns an object
 * that includes the following values:
 * - the number of days
 * - the number of training days
 * - the original target value
 * - the calculated average time
 * - boolean value describing if the target was reached
 * - a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
 * - a text value explaining the rating
 */

/**
 * The result of the exercise session
 */
export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface ExerciseInputValues {
  targetAmount: number;
  dailyExerciseHours: Array<number>;
}

/**
 * Parse the arguments
 * @param args
 */
const parseExerciseInput = (args: Array<string>): ExerciseInputValues => {
  // Check arguments length
  if (args.length < 4) throw new Error("Not enough arguments");

  // Destructure exercise input values into a new array
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, , ...inputValues] = args;

  if (inputValues.some((i) => !isNaN(+i))) {
    const [targetAmount, ...dailyExerciseHours] = inputValues;
    return {
      targetAmount: +targetAmount,
      dailyExerciseHours: dailyExerciseHours.map((i) => +i),
    };
  } else {
    throw new Error("Provided values were not numbers");
  }
};

/**
 * Calculate exercise session result
 */
export const calculateExercises = (
  dailyExerciseHours: Array<number>,
  targetAmount: number
): ExerciseResult => {
  const periodLength: number = dailyExerciseHours.length;
  const trainingDays: number = dailyExerciseHours.filter((i) => i !== 0).length;
  const average: number =
    dailyExerciseHours.reduce((a, b) => a + b) / periodLength;
  const success: boolean = average >= targetAmount;

  let rating: number;
  let ratingDescription: string;
  if (average <= targetAmount / 2) {
    rating = 1;
    ratingDescription = "You need to put more effort in this!";
  } else if (average > targetAmount / 2 && average < targetAmount) {
    rating = 2;
    ratingDescription = "A little more effort next time. Keep it up!";
  } else {
    rating = 3;
    ratingDescription =
      "Well done, you reached you target amout of daily exercise hours!";
  }

  const result: ExerciseResult = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetAmount,
    average,
  };

  return result;
};

/**
 * Run the script with input parameters
 */
try {
  const { targetAmount, dailyExerciseHours } = parseExerciseInput(process.argv);
  console.log(calculateExercises(dailyExerciseHours, targetAmount));
} catch ({ message }) {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.error(`Oops, an error occured. Message:\n${message}`);
}
