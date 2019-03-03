/**
 * Генерации целого случайного числа из заданного диапазона
 * @param {int} minValue
 * @param {int} maxValue
 * @return {int}
 */
const getRandomValueRange = (minValue, maxValue) => {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

export {getRandomValueRange};
