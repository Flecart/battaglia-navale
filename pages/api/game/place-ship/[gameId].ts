import type {NextApiRequest, NextApiResponse} from 'next';
import * as yup from 'yup';
import {Position, Segment} from '@game/Structs';
import {GameHandler} from '@api/game/create';

const schema = yup.object().shape({
    player: yup.string().uuid('the player is not a UUID').required(),
    fleet: yup.array().of(yup.object().shape({
        shipId: yup.number()
            .integer('the shipId is not an integer')
            .required(),
        start: yup.object().shape({
            x: yup.number()
                .moreThan(-1, 'the x value must be positive or zero')
                .lessThan(10, 'the x value is too large').required(),
            y: yup.number()
                .moreThan(-1, 'the x value must be positive or zero')
                .lessThan(10, 'the x value is too large').required(),
        }).required(),
        end: yup.object().shape({
            x: yup.number()
                .moreThan(-1, 'the x value must be positive or zero')
                .lessThan(10, 'the x value is too large').required(),
            y: yup.number()
                .moreThan(-1, 'the x value must be positive or zero')
                .lessThan(10, 'the x value is too large').required(),
        }).required(),
    })).required(),
}).required();

type Data = {
    data?: string,
    error?: string, // TODO(ang): fare in modo che o ci sia errore, o ci sia data, non altro
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    // validate request method ONLY POST
    if (req.method !== 'POST') {
        res.status(405).send({error: 'Only POST requests allowed'});
        return;
    }

    // validate gameId query
    if (req.query.gameId === undefined) {
        res.status(400).json({error: 'gameId is not defined'});
        return;
    } else if (Array.isArray(req.query.gameId)) {
        res.status(400).json({error: 'gameId is an array, should be single string'});
        return;
    }

    // validate game-id string
    const currentGame = GameHandler.findGame(req.query.gameId);
    if (currentGame instanceof Error) {
        res.status(400).json({error: `game with id ${req.query.gameId} wasn't found`});
        return;
    }

    const data = await schema.validate(req.body)
        .catch((err: { message: string; }) => {
            res.status(400).json({error: err.message});
            return;
        });

    for (const idx in data.fleet) {
        const ship = data.fleet[idx];
        const posSegment = Segment.fromObjects(ship.start, ship.end);
        if (posSegment instanceof Error) {
            res.status(400).json({error: `not a valid position`});
            return;
        }
        const err = currentGame.placeShip(data.player, ship.shipId, posSegment);
        if (err instanceof Error) {
            res.status(400).json({error: err.message});
            return;
        }
    }

    res.status(200).json({data: 'boh'});
}
