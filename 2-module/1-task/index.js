function sumSalary(salaries) {
  // ваш код...
  const invalidTypes = [Infinity, -Infinity, NaN, null, undefined];
  const checValue = value => typeof value === 'number' && !invalidTypes.includes(value);
  return Object.values(salaries).filter(item => checValue(item)).reduce((a, b) => (a + b), 0);
}
