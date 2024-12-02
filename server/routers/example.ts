import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const t = initTRPC.create();

export const exampleRouter = t.router({
	hello: t.procedure //POST request with body {"text":"your text"}
		.input(z.object({ text: z.string().optional() }))
		.mutation(({ input }) => {
			return { greeting: input };
		}),
	getUsers: t.procedure.query(async () => {
		const users = await prisma.user.findMany();
		return users;
	}),
	createUser: t.procedure
		.input(
			z.object({
				email: z.string().optional(),
				name: z.string().optional(),
				desgination: z.string().optional(),
			})
		)
		.mutation(async ({ input }: { input: any }) => {
			try {
				const newUser = await prisma.user.create({
				data: input,
				});
				return newUser;
			} catch (error) {
				throw new Error(`Failed to create user: ${error}`);
			}
		}),
});

export type ExampleRouter = typeof exampleRouter;
