using System;

class Program
{
    static void Main(string[] args)
    {
        RecipeManager manager = new RecipeManager();

        manager.AddRecipe(new DessertRecipe { Name = "Chocolate Cake", Description = "Rich and decadent chocolate cake" });
        manager.AddRecipe(new DessertRecipe { Name = "Apple Pie", Description = "Classic apple pie with a flaky crust" });

        manager.DisplayRecipes();

        WriteRecipesToFile(manager.recipes, "recipes.txt");

        var recipesFromFile = ReadRecipesFromFile("recipes.txt");
        foreach (var recipe in recipesFromFile)
        {
            Console.WriteLine($"Recipe read from file: {recipe.Name}: {recipe.Description}");
        }
    }

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
