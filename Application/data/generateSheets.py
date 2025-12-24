import os


sheets =["_sym","0","1","2","3","4","5","6","7","8","9","A","B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

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
print('All sheets created/placed successfully.')