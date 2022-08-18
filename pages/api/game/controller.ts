import {Body, Post, ValidationPipe, Catch, Get, Param} from '@storyofams/next-api-decorators';
import * as gameInput from '@api/game/inputs';
import * as gameOutput from '@api/game/outputs';
import {NextApiRequest, NextApiResponse} from 'next';
import GameModel from '@game/game_handler';
import * as struct from '@game/structs';


const errorHandler = (error: unknown, _: NextApiRequest, res: NextApiResponse) =>{
    if (error instanceof Error) {
        let returnError = {error: error.message};
        if (process.env.NODE_ENV === 'development') {
            returnError = {...returnError, ...error};
        }
        res.status(400).json(returnError);
    } else {
        res.status(500).json({error: 'unknown error encountered'});
    }
};

export default class GameHandler {
    @Post('/attack')
    @Catch(errorHandler)
    public altro(@Body(ValidationPipe) body: gameInput.Attack): gameOutput.Attack {
        const currentGame = GameModel.findGame(body.gameId);
        const position: struct.Position | Error = struct.Position.fromObject(body.position);
        if (position instanceof Error) {
            throw position;
        }
        const result = currentGame.attack(body.playerId, position);
        return {data: {cellType: result}};
    }

    @Post('/create')
    @Catch(errorHandler)
    public create(): gameOutput.GameCreated {
        return {data: {gameId: GameModel.createGame()}};
    }

    @Post('/restart')
    @Catch(errorHandler)
    public restart(@Body(ValidationPipe) body: gameInput.Restart): gameOutput.Restart {
        GameModel.findGame(body.gameId).restart(body.forceRestart);
        return {data: {message: 'game restarted successfully'}};
    }

    @Post('/place-ship')
    @Catch(errorHandler)
    public placeShip(@Body(ValidationPipe) body: gameInput.PlaceShip): gameOutput.PlaceShip {
        const currentGame = GameModel.findGame(body.gameId);
        // eslint-disable-next-line guard-for-in
        for (const idx in body.fleet) {
            const ship = body.fleet[idx];
            const posSegment = struct.Segment.fromObjects(ship.start, ship.end);
            if (posSegment instanceof Error) {
                throw new Error(`ship with idx ${idx} does not have a valid position`);
            }

            currentGame.placeShip(body.playerId, ship.shipId, posSegment);
        }
        return {data: {message: 'ships placed successfully'}};
    }

    @Post('/request-id')
    @Catch(errorHandler)
    public requestId(@Body(ValidationPipe) body: gameInput.RequestId): gameOutput.RequestId {
        const currentGame = GameModel.findGame(body.gameId);
        return {data: {playerId: currentGame.distributeId()}};
    }

    @Get('/status/:gameId')
    @Catch(errorHandler)
    public getGameStatus(@Param('gameId') gameId: string): gameOutput.GameStatus {
        const currentGame = GameModel.findGame(gameId);
        return {data: {status: currentGame.getStatus()}};
    }
}
