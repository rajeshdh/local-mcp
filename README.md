# MCP-lite Server

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