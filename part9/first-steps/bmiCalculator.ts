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

/**
 * Categorize BMI based on height and mass
 *
 * @param height The height in centimeters
 * @param mass The mass in kilogram
 *
 * @returns A message representing the BMI category
 */
const calculateBmi = (height: number, mass: number): BmiCategory => {
  // Check the arguments
  if (height <= 0 || mass <= 0) {
    throw new Error('Height and mass must be greater than 0');
  }

  // Calculate bmi value with formula mass (kg) divided by height (m) squared
  const bmi = mass / ((height / 100) ^ 2);

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

try {
  console.log(calculateBmi(180, 74));
} catch (error) {
  console.error(`Oops, an error occured. Message:\n${error.message}`);
}
