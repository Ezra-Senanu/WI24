using System;
using System.Collections.Generic;
using System.IO;

// Base class for a recipe
abstract class Recipe
{
    public string Name { get; set; }
    public string Description { get; set; }
    public abstract void Cook();
}

// Derived class representing a specific recipe type
class DessertRecipe : Recipe
{
    public override void Cook()
    {
        Console.WriteLine($"Cooking {Name} Dessert: {Description}");
    }
}

// Recipe management system
class RecipeManager
{
    private List<Recipe> recipes = new List<Recipe>();

    // Method to add a new recipe
    public void AddRecipe(Recipe recipe)
    {
        recipes.Add(recipe);
    }

    // Method to search for a recipe by name
    public Recipe SearchRecipe(string name)
    {
        foreach (Recipe recipe in recipes)
        {
            if (recipe.Name.Equals(name, StringComparison.OrdinalIgnoreCase))
            {
                return recipe;
            }
        }
        return null;
    }

    // Method to display all recipes
    public void DisplayRecipes()
    {
        foreach (Recipe recipe in recipes)
        {
            Console.WriteLine($"{recipe.Name}: {recipe.Description}");
        }
    }
}

class Program
{
    static void Main(string[] args)
    {
        // Creating a recipe manager
        RecipeManager manager = new RecipeManager();

        // Adding sample recipes
        manager.AddRecipe(new DessertRecipe { Name = "Chocolate Cake", Description = "Rich and decadent chocolate cake" });
        manager.AddRecipe(new DessertRecipe { Name = "Apple Pie", Description = "Classic apple pie with a flaky crust" });

        // Displaying all recipes
        manager.DisplayRecipes();

        // Writing recipes to a file
        WriteRecipesToFile(manager.recipes, "recipes.txt");

        // Reading recipes from a file
        List<Recipe> recipesFromFile = ReadRecipesFromFile("recipes.txt");
        foreach (Recipe recipe in recipesFromFile)
        {
            Console.WriteLine($"Recipe read from file: {recipe.Name}: {recipe.Description}");
        }
    }

    // Method to write recipes to a file
    static void WriteRecipesToFile(List<Recipe> recipes, string fileName)
    {
        using (StreamWriter writer = new StreamWriter(fileName))
        {
            foreach (Recipe recipe in recipes)
            {
                writer.WriteLine($"{recipe.GetType().Name}|{recipe.Name}|{recipe.Description}");
            }
        }
    }

    // Method to read recipes from a file
    static List<Recipe> ReadRecipesFromFile(string fileName)
    {
        List<Recipe> recipes = new List<Recipe>();

        if (File.Exists(fileName))
        {
            using (StreamReader reader = new StreamReader(fileName))
            {
                string line;
                while ((line = reader.ReadLine()) != null)
                {
                    string[] parts = line.Split('|');
                    if (parts.Length == 3)
                    {
                        string type = parts[0];
                        string name = parts[1];
                        string description = parts[2];

                        if (type.Equals("DessertRecipe", StringComparison.OrdinalIgnoreCase))
                        {
                            recipes.Add(new DessertRecipe { Name = name, Description = description });
                        }
                    }
                }
            }
        }

        return recipes;
    }
}
