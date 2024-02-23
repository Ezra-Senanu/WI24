// Class definition
class Person {
  constructor(private name: string, private age: number) {}

  // Method to display information about the person
  displayInfo(): void {
      console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
}

// Example usage
const person = new Person("John", 30);
person.displayInfo(); // Output: Name: John, Age: 30
