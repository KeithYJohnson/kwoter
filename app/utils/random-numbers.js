export default function getRandomInteger(min, max) {
  // Returns a random integer between min (included) and max (included)
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function steppedRandomInteger(min, max, step) {
  return getRandomInteger(min / step, max / step) * step;
}
