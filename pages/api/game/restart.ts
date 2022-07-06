import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

import { GameHandler } from "@api/game/create";

const schema = yup.object().shape({
    gameId: yup.string()
    .uuid("The inputted string is not a uuid")
    .required(),
    forceRestart: yup.boolean()
}).required();

type Data = {
    message?: string
    error?: string
}

export default function handler (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "POST") {
        res.status(405).send({ error: "Only POST requests allowed" });
        return;
    }

    const data = schema.validate(req.body)
    .catch((err: { message: string; }) => {
        res.status(400).json({ error: err.message });
        return;
    });

    const gameObject = GameHandler.findGame(data.gameId);
    if (gameObject instanceof Error) {
        res.status(500).json({ error: gameObject.message });
        return;
    }

    const err = gameObject.restart(data.forceRestart);
    if (err instanceof Error) {
        res.status(500).json({ error: err.message });
        return;
    }
    res.status(200).json({ message: "restarted successfully" });
}