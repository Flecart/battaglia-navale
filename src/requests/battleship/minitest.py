from email.quoprimime import body_check
import requests

gameId = requests.post('http://localhost:3000/api/game/create', json = {
}).json()['data']['gameId']

userId1 = requests.post('http://localhost:3000/api/game/request-id/', json = {
    "gameId": gameId
}).json()['data']['playerId']
userId2 = requests.post('http://localhost:3000/api/game/request-id/', json = {
    "gameId": gameId
}).json()['data']['playerId']

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

response = requests.post('http://localhost:3000/api/game/place-ship/', json = {
    "gameId": gameId,
    "playerId": userId1,
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


response = requests.post('http://localhost:3000/api/game/place-ship/', json = {
    "gameId": gameId,
    "playerId": userId2,
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

response = requests.post('http://localhost:3000/api/game/place-ship/', json = {
    "gameId": gameId,
    "playerId": userId2,
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
    response = requests.post('http://localhost:3000/api/game/attack/', json = {
        "gameId": gameId,
        "playerId": userId,
        "position": {
            "x": x,
            "y": yval
        }
    }).json()
    print(response)
    return response

for i in range(1, 5):
    attack(userId1, 0, i)
response = requests.post('http://localhost:3000/api/game/attack/', json = {
    "gameId": gameId,
    'playerId': userId2,
    'position': {
        "x": 0,
        "y": 1
    }
}).json()
print(response)

response = requests.post('http://localhost:3000/api/game/attack/', json = {
    "gameId": gameId,
    'playerId': userId2,
    'position': {
        "x": 0,
        "y": 1
    }
}).json()
print(response)

