import { User } from "./User";

export class Message{
    sender : User;
    time : Date;
    content : string; //TODO , il contenuto del messaggio varia in base alla sua tipologia ES : testo,immagine,audio.

    //TODO , pensare se è il caso di aggiungere la proprità isReaded , se il messaggio è stato letto o meno dall'utente
     



    constructor(sender:User,content:string){
        this.sender = sender;
        this.content = content;
        this.time = new Date();
    }

    getTime() : Date {
        return this.time;
    }
}

console.log("ok");