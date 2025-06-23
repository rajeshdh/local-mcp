import { z } from "zod";

export const greeterTool = {
  name: "greeter",
  inputSchema: z.object({ name: z.string().min(2) }),
  description: "Generates a friendly greeting for a given name.",
  handler: async (input: { name: string }) => {
    return `Hello, ${input.name}!`;
  }
};
