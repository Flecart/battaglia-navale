import { v4 as uuidv4 } from 'uuid';

import { Player } from "@game/Player";
import { Position, Segment } from '@game/Structs';
import { CellType, GameStatus } from '@game/Enums';
export class Game {
    id: string;
    player1: Player;
    player2: Player;
    turn: number;
    idToDistribute: number;
    gameStatus: GameStatus;

    constructor(usernamePlayer1 : string, usernamePlayer2 : string, boardSize: number = 10) {
        this.id = uuidv4();
        this.player1 = new Player(boardSize, usernamePlayer1);
        this.player2 = new Player(boardSize, usernamePlayer2);
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
    distributeId(): string | Error {
        // WARNING: non spostare questo pezzo, si rompe la if per cambiare stato sotto.
        if (this.gameStatus !== GameStatus.WAITING_FOR_PLAYERS) {
            return new Error('game already started, can\'t request more IDS');
        }
        
        let id: string; 
        if (this.idToDistribute === 1) {
            id = this.player1.id; 
        } else if (this.idToDistribute === 2) {
            id = this.player2.id; 
        } else {
            return new Error('invalid id, can\'t request more IDS');
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
    attack(playerId: string, position: Position): string | Error {
        if (playerId !== this.getPlayerId()) {
            return new Error('wrong player');
        }

        if (this.gameStatus !== GameStatus.PLAYING) {
            return new Error('wrong game status: you can\'t attack when the game has not started');
        }
         
        const currPlayer = this.turn === 1 ? this.player1 : this.player2;
        const otherPlayer = this.turn === 1 ? this.player2 : this.player1;
        const ownCellHitValue = currPlayer.hitBoard.getCellAt(position);
        const otherCellValue = otherPlayer.ownBoard.getCellAt(position);
        
        if (ownCellHitValue !== CellType.UNKNOWN) {
            return new Error('cell already attacked');
        }

        // DA RICORDARE: la cella avversaria può essere solo NAVE o MARE
        if (otherCellValue === CellType.SEA) { // TODO(team): cambia questo valore hardcoded 0 in una costante (o enums)
            currPlayer.hitBoard.setCellAt(position, CellType.SEA);
            // TODO(alb) sistemare la classe board inserendo cellType
            //Costruire la Board e modificare la board hit 
            
            return "miss";
        } else {
            currPlayer.hitBoard.setCellAt(position, CellType.HIT);
        }

        this.nextTurn();
        return "hit"; // TODO(team): cambia questo messaggio
    }

    placeShip(playerId: string, shipId: number, posSegment: Segment): void | Error {
        if (playerId !== this.player1.id && playerId !== this.player2.id) {
            return new Error('the player does not belong to this game or does not exist');
        }

        // TODO(team): questi check per lo status del gioco non dovrebbero essere qui
        // rendono il testing molto complicato, dato che non puoi prendere la logica delle singole funzioni da solo
        // dovremmo mettere tutta la roba per le eccezzioni da un wrapper o da qualcosa di simile
        if (this.gameStatus !== GameStatus.SETTING_SHIPS) {
            return new Error('wrong game status, can\'t place ship anymore');
        }

        const currPlayer = playerId === this.player1.id ? this.player1 : this.player2;
        const otherPlayer = playerId === this.player2.id ? this.player1 : this.player2;
        const err = currPlayer.placeShip(shipId, posSegment);

        if (currPlayer.hasFinishedPlacingShips() && otherPlayer.hasFinishedPlacingShips()) {
            this.gameStatus = GameStatus.PLAYING;
            console.log("playing now");
        }

        return err;
    }

    isGameOver(): boolean {
        return this.player1.hasLost() || this.player2.hasLost(); 
    }

}