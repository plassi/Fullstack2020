const calculateBmi = (a: number, b: number) => {
  const bmi = b / (a / 100 * a / 100)

  if (bmi < 18.5) return 'Underweight (unhealthy weight)'
  if (bmi >= 18.5 && bmi < 25) return 'Normal (healthy weight)'
  if (bmi >= 25 && bmi < 30) return 'Overweight (unhealthy weight)'
  if (bmi >= 30) return 'Obese (very unhealthy weight)'
}


console.log(calculateBmi(180, 74))