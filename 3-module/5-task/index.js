function getMinMax(str) {
  // ваш код...
  const data = str.split(/[ ,]+/).map(x =>+x).filter(i => !Number.isNaN(i));

  let result = {
    min: Math.min(...data),
    max: Math.max(...data),
  };

  return result;
}
