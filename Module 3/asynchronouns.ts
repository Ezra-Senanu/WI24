// Asynchronous function to simulate fetching data
async function fetchData(): Promise<string> {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve("Data fetched successfully");
      }, 2000);
  });
}

// Example usage
(async () => {
  const data = await fetchData();
  console.log(data); // Output after 2 seconds: Data fetched successfully
})();
