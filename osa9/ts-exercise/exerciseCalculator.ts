export interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface CalcInput {
  exercises: number[],
  target: number
}

const ratingCalculator = (target: number, average: number): number => {
  const value = average / target;
  if (value < 0.65) {
    return 1;
  } else if (value >= 0.65 && value < 1.15) {
    return 2;
  } else {
    return 3;
  }
};

const ratingDescriptor = (rating: number): string => {
  switch (rating) {
    case 1:
      return 'you could definiately do better than that';
    case 2:
      return 'not too bad but you could do better';
    case 3:
      return 'keep up the great work!';
    default:
      return '';
  }
};

export const calculateExercises = (exercises: number[], target: number): Result => {

  const periodLength = exercises.length;
  const trainingDays = exercises.filter(exercise => exercise !== 0).length;
  const average = exercises.reduce((prev, current) => current + prev) / periodLength;
  const success = average >= target ? true : false;
  const rating = ratingCalculator(target, average);
  const ratingDescription = ratingDescriptor(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const parseArguments = (args: Array<string>): CalcInput => {
  if (args.length < 4) throw new Error('Not enough arguments');

  // Check if all arguments are number
  for (let index = 2; index < args.length; index++) {
    if (isNaN(Number(args[index]))) {
      throw new Error('Provided values were not numbers!');
    }
  }

  const target = Number(args[2]);

  const argvStartPositionExercises = 3;
  const exercises: number[] = [];

  for (let index = argvStartPositionExercises; index < args.length; index++) {
    exercises.push(Number(args[index]));
  }

  return {
    exercises: exercises,
    target: target
  };
};

try {
  const { exercises, target }: CalcInput = parseArguments(process.argv);
  console.log(calculateExercises(exercises, target));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
}