from email.quoprimime import body_check
import requests

gameId = requests.get('http://localhost:3000/api/create').json()['gameId']
userId1 = requests.post('http://localhost:3000/api/getid/' + gameId).json()['data']
userId2 = requests.post('http://localhost:3000/api/getid/' + gameId).json()['data']

response = requests.post('http://localhost:3000/api/attack/' + gameId, json = {
    'player': userId1,
    'position': {
        "x": 0,
        "y": 1
    }
}).json()

print(response)