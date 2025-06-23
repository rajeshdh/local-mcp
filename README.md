# Building a Local MCP Server and Using It with Cursor

A lightweight, local Model Context Protocol (MCP)-style server built with TypeScript, Express, and Zod.

## Features
- **Tool invocation:** Call tools via HTTP POST (e.g., `/invoke/greeter`).
- **Input validation:** Each tool uses Zod schemas for robust input validation.
- **Schema discovery:** `GET /mcp` returns all tool input schemas as JSON Schema.
- **Easy extensibility:** Add new tools by creating a module in `src/tools/` and registering it in `src/router.ts`.

## Getting Started

### Install dependencies
```bash
npm install
```

### Run the server (dev mode)
```bash
npm run dev
```

Server runs at [http://localhost:8080](http://localhost:8080) by default.

## Adding to Cursor as MCP Tool

To use this server as a local MCP tool in [Cursor](https://www.cursor.so/):

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Configure Cursor MCP:**
   - Open Cursor
   - Go to `Settings` > `Tools & Integrations` > `MCP`
   - Add a new MCP server configuration:
     ```json
     {
       "name": "local-mcp-server",
       "command": "node",
       "args": ["dist/server.js"],
       "env": {}
     }
     ```

3. **Build for production (optional):**
   ```bash
   npm run build
   ```

4. **Restart Cursor** to load the new MCP server.

Now Cursor can invoke your local tools through the MCP protocol!

## Example Usage

### Greeter Tool
```bash
curl -X POST http://localhost:8080/invoke/greeter \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice"}'
```

### Website Title Scraper Tool
```bash
curl -X POST http://localhost:8080/invoke/websiteTitleScraper \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

### Discover Tools & Schemas
```bash
curl http://localhost:8080/mcp
```

## Adding a New Tool
1. Create a new file in `src/tools/` exporting `{ name, inputSchema, handler }`.
2. Import and add it to the `tools` array in `src/router.ts`.

---

MIT License 