import { initTRPC } from "@trpc/server";
import { exampleRouter } from "./example";

const t = initTRPC.create();

export const appRouter = t.router({
  	example: exampleRouter,
});

export type AppRouter = typeof appRouter;
