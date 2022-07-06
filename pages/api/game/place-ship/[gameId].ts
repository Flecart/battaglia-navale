import type { NextApiRequest, NextApiResponse } from 'next'

import { GameHandler } from "@api/create"
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
    let currentGame: Game; 
    try {
        currentGame = GameHandler.findGame(req.query.gameId); 
    } catch (error) {
        res.status(400).json({ error: `game with id ${req.query.gameId} wasn't found` });
        return;
    }

    

    res.status(200).json({data: "boh"})
}
