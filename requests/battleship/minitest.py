from email.quoprimime import body_check
import requests

gameId = requests.post('http://localhost:3000/api/game/create', json = {
    "player1": "ciao",
    "player2": "default"
}).json()['gameId']

userId1 = requests.post('http://localhost:3000/api/game/get-id/' + gameId).json()['data']
userId2 = requests.post('http://localhost:3000/api/game/get-id/' + gameId).json()['data']

# fleet schema 
# player: string 
# fleet: {
#     shipId: string
#     "start": {
#         "x": int,
#         "y": int
#     }, 
#     "end": {
#         "x": int,
#         "y": int
#     }
# }

response = requests.post('http://localhost:3000/api/game/place-ship/' + gameId, json = {
    "player": userId1,
    "fleet": [
        {
            "shipId": 4,
            "start": {
                "x": 0,
                "y": 1
            },
            "end": {
                "x": 0,
                "y": 2,
            }
        },
        {
            "shipId": 3,
            "start": {
                "x": 0,
                "y": 3
            },
            "end": {
                "x": 0,
                "y": 4,
            }
        },
    ]
}).json()
print(response)


response = requests.post('http://localhost:3000/api/game/place-ship/' + gameId, json = {
    "player": userId2,
    "fleet": [
        {
            "shipId": 3,
            "start": {
                "x": 0,
                "y": 1
            },
            "end": {
                "x": 0,
                "y": 2,
            }
        },
        {
            "shipId": 4,
            "start": {
                "x": 0,
                "y": 3
            },
            "end": {
                "x": 0,
                "y": 4,
            }
        },
    ]
}).json()
print(response)

response = requests.post('http://localhost:3000/api/game/place-ship/' + gameId, json = {
    "player": userId2,
    "fleet": [
        {
            "shipId": 4,
            "start": {
                "x": 0,
                "y": 2
            },
            "end": {
                "x": 0,
                "y": 3,
            }
        },
    ]
}).json()
print(response)

def attack(userId, x, yval):
    global gameId
    print(yval)
    response = requests.post('http://localhost:3000/api/game/attack/' + gameId, json = {
        "player": userId,
        "position": {
            "x": x,
            "y": yval
        }
    }).json()
    print(response)
    return response

for i in range(1, 5):
    attack(userId1, 0, i)
response = requests.post('http://localhost:3000/api/game/attack/' + gameId, json = {
    'player': userId2,
    'position': {
        "x": 0,
        "y": 1
    }
}).json()
print(response)

response = requests.post('http://localhost:3000/api/game/attack/' + gameId, json = {
    'player': userId2,
    'position': {
        "x": 0,
        "y": 1
    }
}).json()
print(response)

