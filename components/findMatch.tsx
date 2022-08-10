import React, {Component} from "react";
import { Button, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";

export class FindMatch extends Component {

    selected : boolean = false;

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

    makeRequest = (param : string) => {

        //TODO: create the endpoint for the request

        /*
        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        };

        const url = "http://localhost:3000/" + param;
        
        fetch(url, reqOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });
        */

        console.log(`http://localhost:3000/${param}`);
    }


    send = () => {
        
        if(this.selected){
            this.changeStatus();
            this.makeRequest("cancelMatch");
            return;

        }

        //The id of the player always exists
        const name = document.getElementById("playerName").value;

        if(name && !this.selected){
            this.changeStatus();
            this.makeRequest("findMatch");
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