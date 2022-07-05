import { uuid } from 'uuidv4';

import { Ship } from "./Ship";
import { Player } from "./Player";
import { Fleet } from "./Fleet";
import { Position } from './structs/Position';
import { CellType } from './CellType';
import { GameLog } from './GameLog';
export class Game {
    id: string;
    player1: Player;
    player2: Player;
    turn: number;
    idToDistribute: number;
    fleet: Fleet;
    gameLog : GameLog;
    ships: Ship[]; // TODO(team): cambia sto array di ship nel gestore di ship, la FLOTTA

    constructor(usernamePlayer1 : string, usernamePlayer2 : string, boardSize: number = 10) {
        this.id = uuid();
        this.player1 = new Player(boardSize, usernamePlayer1);
        this.player2 = new Player(boardSize, usernamePlayer2);
        this.turn = 1;
        this.ships = []; // TODO(team): cambia sto array di ship nel gestore di ship, la FLOTTA
        this.fleet = new Fleet(this.ships);
        this.gameLog = new GameLog();

        this.idToDistribute = 1; // usato per distribuire l'id, serve nella fase di creazione del gioco
    }
    
    nextTurn() {
        this.turn = this.turn === 1 ? 2 : 1;
    }
    
    getPlayerId() {
        return this.turn === 1 ? this.player1.id : this.player2.id;
    }

    getOpponentId() {
        return this.turn === 2 ? this.player1.id : this.player2.id;
    }

    // ritorna l'id del giocatore, usato per settare il ruolo mentre si inizia il gioco  
    // NOTA: mi sembra sia un pò hardcoded, non so se è la soluzione migliore
    distributeId(): string {
        let id: string; 
        if (this.idToDistribute === 1) {
            id = this.player1.id; 
        } else if (this.idToDistribute === 2) {
            id = this.player2.id; 
        } else {
            throw new Error('invalid id, can\'t request more IDS');
        }
        this.idToDistribute++;
        return id; 
    }

    // TODO(ang): non so se ritornare la stringa ha senso, ma per ora lo faccio
    // pensavo come log di quello che sta facendo...
    attack(playerId: string, position: Position): string {
        if (this.getPlayerId() !== playerId) {
            console.log(this.getPlayerId(), playerId);
            console.log(this.getOpponentId(), playerId);
            throw new Error('wrong player');
        }

        const currPlayer = this.turn === 1 ? this.player1 : this.player2;
        const otherPlayer = this.turn === 1 ? this.player2 : this.player1;
        const cellValue = otherPlayer.ownBoard.getCellAt(position);

        if (cellValue === CellType.UNKNOWN) { // TODO(team): cambia questo valore hardcoded 0 in una costante (o enums)
            this.gameLog.add(currPlayer,position,CellType.UNKNOWN);
            // TODO(alb) sistemare la classe board inserendo cellType
            //Costruire la Board e modificare la board hit 
            
            return "miss";
        }

        const ship = this.fleet.getShip(cellValue);
        if (ship === null) {
            // questo non dovrebbe mai succedere, nel caso è un codice 500, ci sarà stata una corruzzione dei dati
            // TODO(ang): scommenta questa parte dopo che si abbia fatto la posizione delle navi
            // throw new Error('ship not found'); 
            return "no shiphere!";
        }
        // ship.reduceHealth();
        if (ship.getHealth() === 0) {
            this.fleet.removeShip(ship);
        }

        this.nextTurn();
        return "hit"; // TODO(team): cambia questo messaggio
    }

    

    isGameOver(): boolean {
        return this.fleet.isFleetEmpty();
    }
}