import type { NextApiRequest, NextApiResponse } from 'next'

import { GameHandler } from "../create"
import { Game } from "/model/Game"

type Data = {
    data?: string,
    error?: string, // TODO(ang): fare in modo che o ci sia errore, o ci sia data, non altro
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== 'POST') {
        res.status(405).send({ error: 'Only POST requests allowed' })
        return
    }

    if (req.query.gameId === undefined) {
        res.status(400).json({ error: "gameId is not defined" })
        return
    } else if (Array.isArray(req.query.gameId)) {
        res.status(400).json({ error: "gameId is an array, should be single string" })
        return;
    }

    let currentGame: Game; 
    try {
        currentGame = GameHandler.findGame(req.query.gameId); 
    } catch (error) {
        res.status(400).json({ error: `game with id ${req.query.gameId} wasn't found` });
        return;
    }

    let currentId: string;
    try {
        currentId = currentGame.distributeId(); 
    } catch (error) {
        res.status(400).json({ error: "invalid distribute id request" }); // TODO(ang): prova a specificare meglio il messaggio di errore
        return;
    }

    res.status(200).json({data: currentId})
}
