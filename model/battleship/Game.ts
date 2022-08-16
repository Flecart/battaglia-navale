import {v4 as uuidv4} from 'uuid';

import {Player} from '@game/Player';
import {Position, Segment} from '@game/Structs';
import {CellType, GameStatus} from '@game/Enums';
export class Game {
    id: string;
    player1: Player;
    player2: Player;
    turn: number;
    idToDistribute: number;
    gameStatus: GameStatus;

    constructor(boardSize: number = 10) {
        this.id = uuidv4();
        this.player1 = new Player(boardSize);
        this.player2 = new Player(boardSize);
        this.turn = 1;
        this.gameStatus = GameStatus.WAITING_FOR_PLAYERS;
        this.idToDistribute = 1; // usato per distribuire l'id, serve nella fase di creazione del gioco
    }

    nextTurn() {
        this.turn = this.turn === 1 ? 2 : 1;
    }

    getPlayerId() {
        return this.turn === 1 ? this.player1.id : this.player2.id;
    }

    // ritorna l'id del giocatore, usato per settare il ruolo mentre si inizia il gioco
    // NOTA: mi sembra sia un pò hardcoded, non so se è la soluzione migliore
    // NOTA: invece di distribuire Id che genera UUID, l'id del giocatore non deve essere unico!
    // deve bastare come una forma di autenticazione per il gioco, quindi invece di UUID
    // si potrebbe generare qualcosa come cookie, token, ecc e settarlo al giocatore, e anche qui
    // così si fa check su quello
    distributeId(): string {
        // WARNING: non spostare questo pezzo, si rompe la if per cambiare stato sotto.
        if (this.gameStatus !== GameStatus.WAITING_FOR_PLAYERS) {
            throw new Error('can\'t request more IDS');
        }

        let id: string;
        if (this.idToDistribute === 1) {
            id = this.player1.id;
        } else if (this.idToDistribute === 2) {
            id = this.player2.id;
        } else {
            throw new Error('invalid id, can\'t request more IDS');
        }
        this.idToDistribute++;

        // TODO(ang): questa funzione non è dentro l'ambito di responsabilità di chi
        // distribuisce l'Id, non dovrebbe essere qui.
        if (this.idToDistribute > 2) {
            this.gameStatus = GameStatus.SETTING_SHIPS;
        }

        return id;
    }

    // TODO(ang): non so se ritornare la stringa ha senso, ma per ora lo faccio
    // pensavo come log di quello che sta facendo...
    attack(playerId: string, position: Position): CellType {
        if (this.gameStatus !== GameStatus.PLAYING) {
            throw new Error('wrong game status: you can\'t attack when the game is not being played');
        }

        if (playerId !== this.getPlayerId()) {
            throw new Error('wrong player');
        }


        // TODO(ang): refactor this part, i don't want the board to be accessible in this way
        const currPlayer = this.turn === 1 ? this.player1 : this.player2;
        const otherPlayer = this.turn === 1 ? this.player2 : this.player1;
        const ownCellHitValue = currPlayer.hitBoard.getCellAt(position);
        const otherCellValue = otherPlayer.ownBoard.getCellAt(position);

        if (ownCellHitValue !== CellType.UNKNOWN) {
            throw new Error('cell already attacked');
        }

        // DA RICORDARE: la cella avversaria può essere solo NAVE o MARE
        if (otherCellValue === CellType.SEA) { // TODO(team): cambia questo valore hardcoded 0 in una costante (o enums)
            currPlayer.hitBoard.setCellAt(position, CellType.SEA);
            // TODO(alb) sistemare la classe board inserendo cellType
            // Costruire la Board e modificare la board hit
            this.nextTurn();

            return CellType.SEA;
        } else {
            currPlayer.hitBoard.setCellAt(position, CellType.HIT);
            otherPlayer.applyDamage(position);
            if (otherPlayer.hasLost()) {
                this.gameStatus = GameStatus.FINISHED;
            }
            return CellType.HIT;
        }
    }

    placeShip(playerId: string, shipId: number, posSegment: Segment): void {
        if (this.gameStatus !== GameStatus.SETTING_SHIPS) {
            throw new Error('wrong game status, can\'t place ship anymore');
        }

        if (playerId !== this.player1.id && playerId !== this.player2.id) {
            throw new Error('the player does not belong to this game or does not exist');
        }


        const currPlayer = playerId === this.player1.id ? this.player1 : this.player2;
        const otherPlayer = playerId === this.player2.id ? this.player1 : this.player2;
        currPlayer.placeShip(shipId, posSegment);

        if (currPlayer.hasFinishedPlacingShips() && otherPlayer.hasFinishedPlacingShips()) {
            this.gameStatus = GameStatus.PLAYING;
        }
    }

    restart(forceRestart: boolean): void {
        if (forceRestart !== true && this.gameStatus !== GameStatus.FINISHED) {
            throw new Error('game has not ended, can\'t restart');
        }
        this.player1.reset();
        this.player2.reset();
        this.turn = 1;
        this.gameStatus = GameStatus.SETTING_SHIPS;
    }

    isGameOver(): boolean {
        return this.player1.hasLost() || this.player2.hasLost();
    }
}
