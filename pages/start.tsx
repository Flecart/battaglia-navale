import { NextPage } from "next"
import { useState } from "react"
import Button from "@mui/material/Button"



const StartGame: NextPage = () => {
    const [gameCreated, setGameCreated] = useState(false);
    const createGame = () => {
        if (gameCreated === false) {
            fetch("/api/game/create", {
                method: "POST",
            }).then(res => {
                return res.json();
            }).then(data => {
                setGameCreated(true);
                // redirect to play area
                window.location.href = `/play/${data.gameId}`;
            }).catch(err => {
                console.log(err);
            });
        } else {
            // TODO(ang): handle error
            console.log("cant create game")
        }
    }

    return (
        <Button  variant="contained" onClick={createGame}>
            Start Game
        </Button>
    );
}

export default StartGame
