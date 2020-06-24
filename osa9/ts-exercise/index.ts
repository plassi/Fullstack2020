import express from 'express';
import { calculateBmi } from './bmiCalculator'

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight)
  const height = Number(req.query.height)

  if (!weight || !height) {
    res.status(404).send('parameters missing')
  }

  if (isNaN(weight) || isNaN(height)) {
    res.status(404).send('malformatted parameters')
  }

  const bmi = calculateBmi(height, weight)

  res.send({weight, height, bmi})
})

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});