export function generateRandomArray(length: number, min: number, max: number) {
  const randomArray = [];
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.random() * (max - min) + min;
    randomArray.push(randomNumber);
  }
  return randomArray;
}
