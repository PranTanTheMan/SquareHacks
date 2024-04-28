import requests
from bs4 import BeautifulSoup
import pandas as pd\
#import openai


url = "https://order.toasttab.com/online/india-spice-house-8445-joiner-way"
response = requests.get(url)
html_content = response.content


#parse content
soup = BeautifulSoup(html_content, "html.parser")


# Find the menu items
menu_items = soup.find_all("div", class_="menu-item")


# Extract the data for each menu item
menu_data = []
for item in menu_items:
    name = item.find("div", class_="menu-item-name").text.strip()
    description = item.find("div", class_="menu-item-description").text.strip()
    price = item.find("div", class_="menu-item-price").text.strip()
    category = item.find_previous("div", class_="menu-category-name").text.strip()
    menu_data.append({"name": name, "description": description, "price": price, "category": category})




#sort into categories
menu_by_category = {}
for item in menu_data:
    category = item["category"]
    if category not in menu_by_category:
        menu_by_category[category] = []
    menu_by_category[category].append(item)


# Convert the dictionary to a pandas DataFrame
menu_df = pd.DataFrame([item for category, items in menu_by_category.items() for item in items], columns=['name', 'description', 'price', 'category'])


# Print the response status code
print(f"Response status code: {response.status_code}")


# Print the length of the HTML content
print(f"HTML content length: {len(html_content)}")


# Print the number of menu items found
print(f"Number of menu items found: {len(menu_items)}")


# Print the menu data list
print(f"Menu data: {menu_data}")






# Iterate over each category in the DataFrame
for category, category_df in menu_df.groupby('category'):
    print(f"\n{category.upper()}")  # Print the category name in uppercase
    print("=" * len(category))  # Print a line of equal signs of the same length as the category name


    # Iterate over each menu item in the category
    for index, row in category_df.iterrows():
        name = row['name']
        description = row['description']
        price = row['price']


        # Print the menu item details
        print(f"\n{name}")
        print(f"{'-' * len(name)}")
        print(description)
        print(f"Price: {price}")


#vectors ??? lol


#openai.api_key = "your_openai_api_key"


#def get_vector(text):
#    response = openai.Embedding.create(
#        input=text,
 #       engine="text-davinci-002"
 #   )
#    return response["data"][0]["embedding"]
#
#menu_df["vector"] = menu_df["description"].apply(get_vector)