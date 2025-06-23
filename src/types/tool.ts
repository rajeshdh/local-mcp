import { z } from "zod";

export interface Tool<T extends z.ZodTypeAny> {
  name: string;
  inputSchema: T;
  handler: (input: z.infer<T>) => Promise<unknown>;
}
