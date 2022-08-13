import React, {Component} from "react";
import { Button, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";

export class FindMatch extends Component {

    selected : boolean = false;
    id : string = "";

    changeStatus = () => {
        this.selected = !this.selected;
        this.updateView();
    }

    updateView = () => {
        const el = document.getElementById("search");
        
        if(el){
            el.innerHTML  = this.selected ? "Cancel" : "Find match";
        }
    }

    makeRequest = (createGame : boolean) => {

        //Send the first request to be added to the waiting list
        const reqWaitingListOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name : document.getElementById("playerName").value ,
                waitingList : true, //Riguada una richista che ha a che fare con la waiting list 
                accessWaitingList : createGame, // stabilisce se creare aggiungere o rimuovere dalla waiting list
                id : this.id
            })
        };
        
        const url = "/api/game/findGame";
        
        fetch(url, reqWaitingListOptions)
        .then(response => response.json())
        .then(data => {
            
            if(createGame){
                this.id = data.id;
                //Send the second request to the server to create a game
                const reqCreateGameOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id : this.id,
                        name : document.getElementById("playerName").value ,
                        waitingList : false, //Riguada una richista che ha a che fare con la waiting list
                        accessWaitingList : createGame // stabilisce se creare aggiungere o rimuovere dalla waiting list
                    })
                };
                
                //TODO : finire di completare la risposta della seconda richista (collegamento per generazione partita)
                fetch(url, reqCreateGameOptions).then(response => response.json())
                .then(data => {
                    console.log(data);
                });
            
            }
            


        }).catch(err => {
            console.log(err);
        });
        

    }


    send = () => {
        
        if(this.selected){
            this.changeStatus();
            this.makeRequest(false);
            document.getElementById("playerName").disabled = false;
            return;

        }

        //The id of the player always exists
        const name = document.getElementById("playerName").value;

        if(name && !this.selected){
            this.changeStatus();
            this.makeRequest(true);
            document.getElementById("playerName").disabled = true;
        }

        
    } 


    render() {
        return (
            <div>
                <TextField id="playerName" label="Player name" variant="outlined" required/>

                <ToggleButtonGroup>
                    <ToggleButton value="search" id = "search" onClick={this.send}>
                        Find match
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            
            
        )
    }
}