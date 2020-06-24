interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
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
}

const ratingDescriptor = (rating: number): string => {
  switch (rating) {
    case 1:
      return 'you could definiately do better than that';
    case 2:
      return 'not too bad but you could do better';
    case 3:
      return 'keep up the great work!';
    default:
      break;
  }
}

const calculateExercises = (arguments: number[]): Result => {
  const exercises: number[] = [];
  for (let index = 1; index < arguments.length; index++) {
    exercises.push(arguments[index])
  }

  const periodLength = exercises.length;
  const trainingDays = exercises.filter(exercise => exercise !== 0).length;
  const target = arguments[0]
  const average = exercises.reduce((prev, current) => current + prev) / periodLength;
  const success = average >= target ? true : false;
  const rating = ratingCalculator(target, average)
  const ratingDescription = ratingDescriptor(rating)

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
}

const parseArguments = (args: Array<string>): number[] => {
  if (args.length < 2) throw new Error('Not enough arguments');

  // Check if all arguments are number
  for (let index = 2; index < args.length; index++) {
    if (isNaN(Number(args[index]))) {
      throw new Error('Provided values were not numbers!');
    }
  }

  const argvStartPositionExercises = 2;
  const arguments: number[] = [];

  for (let index = argvStartPositionExercises; index < process.argv.length; index++) {
    arguments.push(Number(process.argv[index]));
  }

  return arguments
}

try {
  const arguments: number[] | void = parseArguments(process.argv);
  console.log(calculateExercises(arguments));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}