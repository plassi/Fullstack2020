/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (isNaN(weight) || isNaN(height) || !req.query.weight || !req.query.height) {
    res.status(404).send({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);

  res.send({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  const exercises: number[] = req.body.daily_exercises;
  const target: number = req.body.target;

  if (!target || !exercises) {
    res.status(404).send({ error: 'parameters missing' });
  }

  if (isNaN(target)) {
    res.status(404).send({ error: 'malformatted parameters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  exercises.forEach(element => {
    if (isNaN(element)) {
      res.status(404).send({ error: 'malformatted parameters' });
    }
  });
  const result = calculateExercises(exercises, target);
  res.send(result);

});



const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});