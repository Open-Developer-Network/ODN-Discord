import os


sheets =["A","B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
 
# Ensure folder exists
folder = f"sheets"
os.makedirs(folder, exist_ok=True)
for slot in sheets:
    # Create .json files for each sheet
    path = f"{folder}/{slot}.json"

    # Create an empty JSON object
    with open(path, 'w') as userSheet:
        userSheet.write("{}")

    print(f'Created/Placed .json for sheet {slot}')
 