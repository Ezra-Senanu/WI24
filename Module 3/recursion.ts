// Recursive function to calculate factorial
function factorial(n: number): number {
  if (n === 0) {
      return 1;
  }
  return n * factorial(n - 1);
}

// Example usage
console.log(factorial(5)); // Output: 120
