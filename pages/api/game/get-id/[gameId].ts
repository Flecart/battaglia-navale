import type { NextApiRequest, NextApiResponse } from 'next'

import { GameHandler } from "@api/game/create"
import { Game } from "@game/Game"

type Data = {
    data?: string,
    error?: string, // TODO(ang): fare in modo che o ci sia errore, o ci sia data, non altro
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // validate request method ONLY POST
    if (req.method !== 'POST') {
        res.status(405).send({ error: 'Only POST requests allowed' })
        return
    }

    // validate gameId query 
    if (req.query.gameId === undefined) {
        res.status(400).json({ error: "gameId is not defined" })
        return
    } else if (Array.isArray(req.query.gameId)) {
        res.status(400).json({ error: "gameId is an array, should be single string" })
        return;
    }

    // validate game-id string
    const currentGame = GameHandler.findGame(req.query.gameId);
    if (currentGame instanceof Error) {
        res.status(400).json({ error: `game with id ${req.query.gameId} wasn't found` });
        return;
    }

    // validate id request
    const currentId = currentGame.distributeId();;
    if (currentId instanceof Error) {
        res.status(400).json({ error: currentId.message });
        return;
    }

    res.status(200).json({data: currentId})
}
