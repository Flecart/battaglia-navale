import { ShipType } from "/model/Enums";

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    
    const type = ShipType.AIRCRAFT;
    console.log(type);

    res.status(200).json({ ciao: type });
}



