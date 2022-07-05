// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// NOTA: questo route non deve essere usato nella versione finale, mi solo a me per resettare tutti i giochi 

import { GameHandler } from "./create";

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    GameHandler.games.clear();
    res.status(200).json({ name: 'resetted successfully' })
}