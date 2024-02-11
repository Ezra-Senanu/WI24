class DessertRecipe : Recipe
{
    public override void Cook()
    {
        Console.WriteLine($"Cooking {Name} Dessert: {Description}");
    }
}
