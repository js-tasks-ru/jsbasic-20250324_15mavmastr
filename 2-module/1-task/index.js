function sumSalary(salaries) {
  return Object.values(salaries).filter(elem => typeof elem === 'number' && isFinite(elem)).reduce((count, elem) => count + elem, 0);
}