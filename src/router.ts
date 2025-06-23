import { zodToJsonSchema } from "zod-to-json-schema";
import express from "express";
import { z } from "zod";
import { greeterTool } from "./tools/greeter";
import { websiteTitleScraperTool } from "./tools/websiteTitleScraper";

type Tool<T> = {
  name: string;
  description?: string;
  inputSchema: z.ZodType<T>;
  handler: (input: T) => Promise<any>;
};

const tools: Tool<any>[] = [greeterTool, websiteTitleScraperTool];
const router = express.Router();

tools.forEach((tool) => {
  router.post(`/invoke/${tool.name}`, async (req, res) => {
    try {
      const parsed = tool.inputSchema.parse(req.body);
      const result = await tool.handler(parsed);
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });
});

router.get("/mcp", (req, res) => {
  const toolSpecs = tools.map((tool) => {
    const schema = zodToJsonSchema(tool.inputSchema);
    return {
      name: tool.name,
      description: tool.description || "",
      parameters: schema
    };
  });

  res.json(toolSpecs);
});

export default router;