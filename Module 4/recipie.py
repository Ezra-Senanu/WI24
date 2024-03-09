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

# Function to retrieve recipes from the database
def retrieve_recipes():
    conn = sqlite3.connect('recipe_database.db')
    cursor = conn.cursor()

    # Retrieve recipes with ingredients
    cursor.execute('''SELECT r.name, r.cuisine, r.servings, r.instructions, GROUP_CONCAT(i.name, ', ')
                      FROM Recipes r
                      LEFT JOIN Ingredients i ON r.id = i.recipe_id
                      GROUP BY r.id''')
    recipes = cursor.fetchall()

    # Print recipes
    for recipe in recipes:
        print("Recipe: {}".format(recipe[0]))
        print("Cuisine: {}".format(recipe[1]))
        print("Servings: {}".format(recipe[2]))
        print("Instructions: {}".format(recipe[3]))
        print("Ingredients: {}".format(recipe[4]))
        print("")

    # Close connection
    conn.close()

# Create database and tables
create_database()

# Insert recipes (Ghanaian and Nigerian dishes)
insert_recipe("Jollof Rice", "Nigerian", 6, "1. Parboil rice.\n2. Fry onions, tomatoes, and peppers.\n3. Add spices and rice.\n4. Cook until rice is done.", ["Rice", "Onion", "Tomatoes", "Bell Peppers", "Scotch Bonnet Pepper", "Spices"])
insert_recipe("Banku and Tilapia", "Ghanaian", 4, "1. Prepare banku dough.\n2. Steam banku.\n3. Grill tilapia.\n4. Serve banku with grilled tilapia and pepper sauce.", ["Corn Flour", "Cassava Dough", "Tilapia", "Pepper Sauce", "Salt"])
insert_recipe("Egusi Soup", "Nigerian", 8, "1. Fry onions and tomatoes.\n2. Add ground egusi seeds and stock.\n3. Cook until egusi thickens.\n4. Serve with fufu or rice.", ["Palm Oil", "Onion", "Tomatoes", "Egusi Seeds", "Stock"])

# Retrieve and print recipes
print("Recipes in the database:")
retrieve_recipes()
