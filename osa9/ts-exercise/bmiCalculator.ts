interface Values {
  height: number,
  weight: number
}

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100 * height / 100);

  if (bmi < 18.5) return 'Underweight';
  if (bmi >= 18.5 && bmi < 25) return 'Normal (healthy weight)';
  if (bmi >= 25 && bmi < 30) return 'Overweight';
  if (bmi >= 30) return 'Obese';
  return '';
};

const parseBmiArguments = (args: Array<string>): Values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  // Check if all arguments are number
  for (let index = 2; index < args.length; index++) {
    if (isNaN(Number(args[index]))) {
      throw new Error('Provided values were not numbers!');
    }
  }
  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
}
