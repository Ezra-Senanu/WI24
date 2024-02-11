using System;
using System.Collections.Generic;


abstract class Recipe
{
    public string Name { get; set; }
    public string Description { get; set; }
    public abstract void Cook();
}

class RecipeManager
{
    public List<Recipe> recipes = new List<Recipe>();

    public void AddRecipe(Recipe recipe)
    {
        recipes.Add(recipe);
    }

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

    public void DisplayRecipes()
    {
        foreach (Recipe recipe in recipes)
        {
            Console.WriteLine($"{recipe.Name}: {recipe.Description}");
        }
    }
}
