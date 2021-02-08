/**
 * BMI Calculator
 *
 * Write a function calculateBmi that counts BMI based on given
 * height (in centimeters) and weight (in kilograms) and
 * then returns a message that suits the results.
 */

/**
 * Range of BMI values valid as statistical categories
 */
type BmiCategory =
  | 'Very severely underweight'
  | 'Severely underweight'
  | 'Underweight'
  | 'Normal (healthy weight)'
  | 'Overweight'
  | 'Obese Class I (Moderately obese)'
  | 'Obese Class II (Severely obese)'
  | 'Obese Class III (Very severely obese)';

interface BmiInputValues {
  height: number;
  mass: number;
}

/**
 *
 * @param args
 */
const parseBmiArguments = (args: Array<string>): BmiInputValues => {
  if (args.length !== 4) throw new Error('Invalid arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

/**
 * Categorize BMI based on height and mass
 *
 * @param height The height in centimeters
 * @param weight The weight in kilogram
 *
 * @returns A message representing the BMI category
 */
export const calculateBmi = (height: number, weight: number): BmiCategory => {
  // Check the arguments
  if (height <= 0 || weight <= 0) {
    throw new Error('Height and mass must be greater than 0');
  }

  // Calculate bmi value with formula mass (kg) divided by height (m) squared
  const bmi = weight / ((height / 100) ** 2);

  // Categorize bmi value using if/elif/else structure
  if (bmi <= 15) {
    return 'Very severely underweight';
  } else if (bmi <= 16) {
    return 'Severely underweight';
  } else if (bmi <= 18.5) {
    return 'Underweight';
  } else if (bmi <= 25) {
    return 'Normal (healthy weight)';
  } else if (bmi <= 30) {
    return 'Overweight';
  } else if (bmi <= 35) {
    return 'Obese Class I (Moderately obese)';
  } else if (bmi <= 40) {
    return 'Obese Class II (Severely obese)';
  } else {
    return 'Obese Class III (Very severely obese)';
  }
};

/**
 * Run the script with input arguments
 */
try {
  const { height, mass } : BmiInputValues = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, mass));
} catch (error) {
  console.error(`An error occured. Message:\n${error.message}`);
}
