// Function to divide two numbers
function divide(a: number, b: number): number {
  if (b === 0) {
      // Throw an exception if the denominator is zero
      throw new Error("Division by zero is not allowed.");
  }
  return a / b;
}

// Example usage with exception handling
try {
  const result = divide(10, 0);
  console.log("Result:", result);
} catch (error) {
  // Catch and handle the exception
  console.error("An error occurred:", error.message);
}
