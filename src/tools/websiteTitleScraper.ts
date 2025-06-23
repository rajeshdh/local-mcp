import { z } from "zod";
import axios from "axios";
import * as cheerio from "cheerio";

export const websiteTitleScraperTool = {
  name: "websiteTitleScraper",
  inputSchema: z.object({ url: z.string().url() }),
  description: "Scrapes and returns the <title> of a given webpage URL.",
  handler: async (input: { url: string }) => {
    const response = await axios.get(input.url);
    const $ = cheerio.load(response.data);
    return $("title").text();
  }
};
