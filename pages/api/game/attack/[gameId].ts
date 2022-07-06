import type { NextApiRequest, NextApiResponse } from 'next'
import * as yup from "yup";

import { GameHandler } from "@api/game/create"
import { Position } from "@game/Structs"

let schema = yup.object().shape({
    player: yup.string().uuid("the player is not a UUID").required(),
    position: yup.object().shape({
        x: yup.number()
            .moreThan(-1, "the x value must be positive or zero")
            .lessThan(10, "the x value is too large").required(),
        y: yup.number()
            .moreThan(-1, "the x value must be positive or zero")
            .lessThan(10, "the x value is too large").required(),
    }).required(),
}).required();

type Data = {
    data?: string,
    error?: string, // TODO(ang): fare in modo che o ci sia errore, o ci sia data, non altro
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // validate request method ONLY POST
    if (req.method !== 'POST') {
        res.status(405).send({ error: 'Only POST requests allowed' })
        return;
    }
    
    // validate gameId query
    if (req.query.gameId === undefined) {
        res.status(400).json({ error: "gameId is not defined" })
        return;
    } else if (Array.isArray(req.query.gameId)) {
        res.status(400).json({ error: "gameId is an array, should be single string" })
        return;
    }

    const bodyData = await schema.validate(req.body)
        .catch((err: { message: string; }) => {
            res.status(400).json({ error: err.message })
            return;
    });
    
    let currentGame = GameHandler.findGame(req.query.gameId);
    if (currentGame instanceof Error) {
        res.status(400).json({ error: currentGame.message });
        return;
    }

    const player: string = bodyData.player;
    const position: Position | Error = Position.fromObject(bodyData.position);
    if (position instanceof Error) {
        res.status(400).json({ error: position.message });
        return;
    }
    
    let result = currentGame.attack(player, position);
    if (result instanceof Error) {
        res.status(400).json({ error: result.message });
        return;
    }
    res.status(200).json({ data: result})
}
