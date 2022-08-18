import * as gameOutput from '@api/game/outputs';

export async function createGame(): Promise<gameOutput.GameCreated> {
    return await fetch('/api/game/create', {
        method: 'POST',
    }).then((res) => res.json());
};


export async function requestId(gameId: string): Promise<gameOutput.RequestId> {
    return await fetch('/api/game/request-id', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            gameId: gameId,
        }),
    }).then((res) => res.json());
};

export async function getGameStatus(gameId: string): Promise<gameOutput.GameStatus> {
    return await fetch(`/api/game/status/${gameId}`).then((res) => res.json());
}
