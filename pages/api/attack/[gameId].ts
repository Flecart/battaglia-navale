import type { NextApiRequest, NextApiResponse } from 'next'
import { GameHandler } from "../create"
import { Game } from "/model/Game"
import { Position } from "/model/structs/Position"

type Data = {
    data?: string,
    error?: string, // TODO(ang): fare in modo che o ci sia errore, o ci sia data, non altro
    cell_value?: number, // rappresentante del valore della cella 
}

function parsePosition(position: any): Position {
    if (!(position instanceof Object)) {
        throw new Error("position is not an object");
    }

    const keys = Object.keys(position);
    if (keys.length !== 2 || keys[0] !== "x" || keys[1] !== "y") {
        throw new Error("position is not a valid position, two fields x,y needed, in right order");
    }

    return new Position(position["x"], position["y"]);
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== 'POST') {
        res.status(405).send({ error: 'Only POST requests allowed' })
        return;
    }
      

    if (req.query.gameId === undefined) {
        res.status(400).json({ error: "gameId is not defined" })
        return;
    } else if (Array.isArray(req.query.gameId)) {
        res.status(400).json({ error: "gameId is an array, should be single string" })
        return;
    }

    if (typeof(req.body.player) !== 'string') {
        res.status(400).json({ error: "player is not defined" })
        return;
    }

    let position: Position = new Position(0, 0);
    try {
        position = parsePosition(req.body.position); 
        console.log(position);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "invalid input" });
        }
    }
    
    let currentGame: Game; 
    try {
        currentGame = GameHandler.findGame(req.query.gameId); 
    } catch (error) {
        res.status(400).json({ error: "game not found" });
        return;
    }


    try {
        currentGame.attack(req.body.player, position);
    } catch (error) {
        if (error instanceof Error) {
            console.log("from attack/[gameId].ts, " + error.message);
            console.log(req.body.player, typeof(req.body.player));
        }
        res.status(400).json({ error: "This is not inputted players turn" });
        return;
    }

    res.status(200).json({ data: 'you attacked!', cell_value: 1 })
}
