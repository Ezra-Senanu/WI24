import sqlite3

# Function to create the database and initialize tables
def create_database():
    # Connect to the database (or create it if it doesn't exist)
    conn = sqlite3.connect('recipe_database.db')
    cursor = conn.cursor()

    # Create tables
    cursor.execute('''CREATE TABLE IF NOT EXISTS Recipes (
                        id INTEGER PRIMARY KEY,
                        name TEXT NOT NULL,
                        cuisine TEXT,
                        servings INTEGER,
                        instructions TEXT
                    )''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS Ingredients (
                        id INTEGER PRIMARY KEY,
                        name TEXT NOT NULL,
                        recipe_id INTEGER,
                        FOREIGN KEY (recipe_id) REFERENCES Recipes(id)
                    )''')

    # Commit changes and close connection
    conn.commit()
    conn.close()

# Function to insert recipe into the database
def insert_recipe(name, cuisine, servings, instructions, ingredients):
    conn = sqlite3.connect('recipe_database.db')
    cursor = conn.cursor()

    # Insert recipe
    cursor.execute('''INSERT INTO Recipes (name, cuisine, servings, instructions)
                      VALUES (?, ?, ?, ?)''', (name, cuisine, servings, instructions))
    recipe_id = cursor.lastrowid

    # Insert ingredients
    for ingredient in ingredients:
        cursor.execute('''INSERT INTO Ingredients (name, recipe_id)
                          VALUES (?, ?)''', (ingredient, recipe_id))

    # Commit changes and close connection
    conn.commit()
    conn.close()

# Function to delete recipe from the database
def delete_recipe(recipe_id):
    conn = sqlite3.connect('recipe_database.db')
    cursor = conn.cursor()

    # Delete recipe and associated ingredients
    cursor.execute('''DELETE FROM Recipes WHERE id = ?''', (recipe_id,))
    cursor.execute('''DELETE FROM Ingredients WHERE recipe_id = ?''', (recipe_id,))

    # Commit changes and close connection
    conn.commit()
    conn.close()

# Function to retrieve and print all recipes from the database
def retrieve_recipes():
    conn = sqlite3.connect('recipe_database.db')
    cursor = conn.cursor()

    # Retrieve recipes with ingredients
    cursor.execute('''SELECT r.id, r.name, r.cuisine, r.servings, r.instructions, GROUP_CONCAT(i.name, ', ')
                      FROM Recipes r
                      LEFT JOIN Ingredients i ON r.id = i.recipe_id
                      GROUP BY r.id''')
    recipes = cursor.fetchall()

    # Print recipes
    for recipe in recipes:
        print("ID: {}".format(recipe[0]))
        print("Recipe: {}".format(recipe[1]))
        print("Cuisine: {}".format(recipe[2]))
        print("Servings: {}".format(recipe[3]))
        print("Instructions: {}".format(recipe[4]))
        print("Ingredients: {}".format(recipe[5]))
        print("")

    # Close connection
    conn.close()

# Function to display menu and handle user input
def main_menu():
    while True:
        print("\n=== Recipe Database Menu ===")
        print("1. View All Recipes")
        print("2. Add New Recipe")
        print("3. Delete Recipe")
        print("4. Exit")

        choice = input("Enter your choice: ")

        if choice == '1':
            retrieve_recipes()
        elif choice == '2':
            add_recipe()
        elif choice == '3':
            retrieve_recipes()
            remove_recipe()
        elif choice == '4':
            print("Exiting program.")
            break
        else:
            print("Invalid choice. Please try again.")

# Function to prompt user for recipe details and add to the database
def add_recipe():
    name = input("Enter recipe name: ")
    cuisine = input("Enter cuisine (e.g., Ghanaian, Nigerian): ")
    servings = int(input("Enter number of servings: "))
    instructions = input("Enter instructions: ")
    ingredients = input("Enter ingredients (separated by commas): ").split(',')

    # Insert recipe into database
    insert_recipe(name, cuisine, servings, instructions, ingredients)
    print("Recipe added successfully!")

# Function to prompt user for recipe ID and delete from the database
def remove_recipe():
    recipe_id = int(input("Enter recipe ID to delete: "))

    # Delete recipe from database
    delete_recipe(recipe_id)
    print("Recipe deleted successfully!")

# Create database and tables
create_database()

# Display main menu
main_menu()
