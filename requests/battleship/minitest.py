from email.quoprimime import body_check
import requests

gameId = requests.get('http://localhost:3000/api/game/create').json()['gameId']
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
                "y": 0
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
                "y": 2
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
                "y": 0
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
                "y": 2
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
                "y": 4,
            }
        },
    ]
}).json()
print(response)

# response = requests.post('http://localhost:3000/api/game/attack/' + gameId, json = {
#     'player': userId1,
#     'position': {
#         "x": 0,
#         "y": 1
#     }
# }).json()
