import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../services/prisma";

export default async function getAttributes(req: NextApiRequest, res: NextApiResponse){
    const attributes = await prisma.attribute.findMany()

    switch(req.method){
        case 'GET':
            res.status(200).json(attributes)
            break

        default:
            res.status(500).json({message:"Invalid method."})
            break
    }
}