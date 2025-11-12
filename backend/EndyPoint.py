import requests

#to define the API URL
url = "THENWEPASTEITINHERE"

#Going to write the GET 
try:
    response = requests.get(url)

    #to check successful response, I guess successful response is code 200
    if response.get() == 200:
        data = response.json()
        print("Data retrieved")
        print(data)
    else:
        