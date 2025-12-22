import requests
import os


tiers =['copper','bronze','silver', 'gold', 'platinum', 'diamond', 'champion']
ranks=[1,2,3,4,5]
for tier in tiers:
    # Ensure folder exists
    folder = f"{tier}"
    os.makedirs(folder, exist_ok=True)

    # Download rank 1-5 images
    if tier != "champion":
        for rank in ranks:
            url = f"https://r6data.eu/assets/img/r6_ranks_img/{tier}-{rank}.webp"
            path = f"{folder}/R6-{tier}{rank}.webp"

            x = requests.get(url)
            with open(path, 'wb') as rankImage:
                rankImage.write(x.content)

                print(f'Created/Placed R6-{tier}{rank}.webp')

    # Download champion rank image without division
    if tier == "champion":
        base_url=f"https://r6data.eu/assets/img/r6_ranks_img/{tier}.webp"
        base_path=f"{folder}/R6-{tier}.webp"

        x = requests.get(base_url)
        with open(base_path, 'wb') as rankImage:
            rankImage.write(x.content)
            
            print(f'Downloaded {base_path}')