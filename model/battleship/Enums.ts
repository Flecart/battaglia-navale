export enum CellType{
    UNKNOWN = 0,
    SEA = 1,
    HIT = 2,
}

// indica a che numero inizia il valore libero per la cella
export const kCellOffset = 3; 

// WAITING_FOR_PLAYERS indica che il giocatore è in attesa di altri giocatori
// SETTING_SHIP indica che si è nella fase di settaggio delle navi
// PLAYING indica che si è iniziato il gioco
// FINISHED indica che il gioco è terminato
export enum GameStatus {
    WAITING_FOR_PLAYERS = 0,
    SETTING_SHIPS = 1,
    PLAYING = 2,
    FINISHED = 3,
}

// CONFIG: lunghezza di ogni tipo di nave
export enum ShipType {
    DESTROYER = 2,
    FRIGATES = 3,
    CRUISER = 4,
    AIRCRAFT = 5,
}

// CONFIG numero di navi per ogni giocatore
export const ShipNumbers = {
    [ShipType.DESTROYER]: 2,
    // [ShipType.FRIGATES]: 3,
    // [ShipType.CRUISER]: 2,
    // [ShipType.AIRCRAFT]: 1,
}