import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../services/prisma";

import { type Prisma } from "@prisma/client";

export default async function UserApi(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "POST":
			console.log(req.body)
			const post = await prisma.user.findFirst({
				where: {
					email: req.body.email,
				},
			});
			if (post !== null) {
				res.status(200).json(post);
			} else {
				const payload: Prisma.UserCreateInput = {
						email: req.body.email,
						name: req.body.name,
						firebaseId: req.body.firebaseId,
						admin: false
				}

				const user = await prisma.user.create({data: payload})
				res.status(200).json(user);
			}

			break;

		case "DELETE":
			const remove = await prisma.user.delete({
				where: { email: req.body.email },
			}).then(() => {
				res.status(200).json({ message: `User with email ${req.body.email} was deleted!` });
			})
				.catch(error => res.status(400).json({ message: error }));

			break;

		default:
			res.status(500).json({ message: "Invalid method." });
			break;
	}
}
