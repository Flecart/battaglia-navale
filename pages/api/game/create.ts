import type { NextApiRequest, NextApiResponse } from 'next'
import * as yup from "yup"

import { gameHandler } from '@game/GameHandler';

export const GameHandler = new gameHandler(); // TODO(team): get from global variable

const schema = yup.object().shape({
    player1: yup.string().required(),
    player2: yup.string().required(),
}).required();

type Data = {
    gameId?: string
    error?: string
}

// This endpoint is called by the client when the user wants to create a new game.
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // validate request method ONLY POST
    if (req.method !== 'POST') {
        res.status(405).send({ error: 'Only POST requests allowed' })
        return
    }

    const data = await schema.validate(req.body)
    .catch((err: { message: string; }) => {
        res.status(400).json({ error: err.message })
        return;
    });

    let gameId: string = "";
    try {
        gameId = GameHandler.createGame(data.player1, data.player2);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "unknown error in Game Creation" });
        }
    }

    res.status(200).json({ gameId: gameId });
}
