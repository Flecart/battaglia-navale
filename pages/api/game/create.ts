import type {NextApiRequest, NextApiResponse} from 'next';
import * as yup from 'yup';

import {gameHandler} from '@game/GameHandler';

export const GameHandler = new gameHandler(); // TODO(team): get from global variable

type Data = {
    gameId?: string
    error?: string
}

// This endpoint is called by the client when the user wants to create a new game.
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    // validate request method ONLY POST
    if (req.method !== 'POST') {
        res.status(405).send({error: 'Only POST requests allowed'});
        return;
    }

    let gameId: string = '';
    try {
        gameId = GameHandler.createGame();
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({error: error.message});
        } else {
            res.status(500).json({error: 'unknown error in Game Creation'});
        }
    }

    res.status(200).json({gameId: gameId});
}
