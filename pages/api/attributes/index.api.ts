import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../services/prisma";

export default async function AttributesApi(req: NextApiRequest, res: NextApiResponse){
    const attributes = await prisma.attribute.findMany()

    switch(req.method){
        case 'GET':
            res.status(200).json(attributes)
            break

        case 'PATCH':
            console.log(req.body)
            const attribute = await prisma.attribute.update({
                where: {
                    id: req.body.attribute.id
                },
                data: {
                    value: req.body.attribute.value
                }
            })
            res.status(200).json(attribute)
            break

        default:
            res.status(500).json({message:"Invalid method."})
            break
    }
}