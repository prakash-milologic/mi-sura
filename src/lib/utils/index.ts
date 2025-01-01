import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomArray(length: number, min: number, max: number) {
  const randomArray = [];
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min) + min);
    randomArray.push(randomNumber);
  }
  return randomArray;
}

export const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function formatDataTableViewOptionsColumnName(name: string) {
  // Separate camel case words with spaces
  let result = name.replace(/([a-z])([A-Z])/g, "$1 $2");

  // Remove leading "is" if present
  result = result.replace(/^is\s+/i, "");

  return result;
}
