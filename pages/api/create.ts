import type { NextApiRequest, NextApiResponse } from 'next'
import { gameHandler } from '../../model/GameHandler';

import { Game } from "/model/GameHandler";

export const GameHandler = new gameHandler(); // TODO(team): get from global variable

type Data = {
    gameId?: string
    error?: string
}

// This endpoint is called by the client when the user wants to create a new game.
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // TEMPORENEO, solo a scopo di debug
    let usernamePlayer1 = "Alberto"; 
    let usernamePlayer2 = "Angelo";
    
    let gameId: string = "";
    try {
        gameId = GameHandler.createGame(usernamePlayer1, usernamePlayer2);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "unknown error in Game Creation" });
        }
    }

    res.status(200).json({ gameId: gameId });
    // res.status(200).json({ gameId: 'you created the game!' })
}
