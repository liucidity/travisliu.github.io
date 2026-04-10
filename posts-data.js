/**
 * =============================================
 *  BLOG POSTS DATA FILE
 * =============================================
 *  To add a new blog post:
 *  1. Copy one of the post objects below
 *  2. Fill in: slug, title, date, excerpt, tags, content
 *  3. Add it to the TOP of the POSTS array (newest first)
 *
 *  - slug: unique URL identifier (e.g. "my-new-post")
 *  - content: written in Markdown syntax
 * =============================================
 */

window.POSTS = [
  {
    slug: "building-real-time-apps-with-websockets",
    title: "What I Learned Building a Real-Time Multiplayer Game",
    date: "2026-04-08",
    excerpt: "WebSockets sound simple until you're managing dozens of simultaneous game states. Here's what BusRiders taught me about real-time architecture.",
    tags: ["WebSockets", "Node.js", "Architecture"],
    content: `
# What I Learned Building a Real-Time Multiplayer Game

When I started **BusRiders**, I thought the hardest part would be the game logic. It wasn't. It was state.

## The Problem With "Just Use WebSockets"

WebSockets give you a persistent connection — but they don't tell you how to structure what flows through them. Early on, I had a tangled mess of events with no clear ownership. When did the server own the state? When did the client?

## What Actually Worked

After a few painful rewrites, I landed on a simple rule: **the server owns all game state, always**. Clients only send *intentions* (e.g., "player wants to draw a card"), and the server broadcasts the *resulting state* to everyone.

\`\`\`js
// Server: broadcast updated game state after every action
io.to(roomId).emit('game:state', getGameState(roomId));
\`\`\`

This made debugging dramatically easier — there was one source of truth.

## Handling Disconnections

Real players disconnect. You need to decide: do you pause the game? Boot the player? Reconnect them?

For BusRiders, I gave players a 10-second reconnect window before removing them from the room. On reconnect, the server sends the full current state, and the client re-renders from scratch.

## Lessons Learned

- Design your event schema before writing a single socket handler
- Always broadcast full state rather than diffs when starting out
- WebSocket rooms (socket.io's \`room\` feature) are your best friend for isolating game sessions

Real-time is hard, but it's also some of the most satisfying code to write when it clicks.
    `
  },
  {
    slug: "postgresql-things-i-wish-i-knew",
    title: "PostgreSQL: Things I Wish I Knew Earlier",
    date: "2026-03-22",
    excerpt: "After building SQLBase I know a lot more about Postgres than I did before. Here are the concepts that would've saved me the most time.",
    tags: ["PostgreSQL", "Databases", "Backend"],
    content: `
# PostgreSQL: Things I Wish I Knew Earlier

Building **SQLBase** — a browser-based PostgreSQL management tool — forced me to understand Postgres at a much deeper level than typical app development does.

## 1. \`pg_catalog\` Is Your Friend

Every piece of metadata about your database lives in \`pg_catalog\`. Tables, columns, constraints, indexes — it's all there.

\`\`\`sql
-- Get all tables in the public schema
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';
\`\`\`

## 2. Connection Pooling Matters More Than You Think

Every time your Node.js app calls \`new Client()\` and \`client.connect()\`, Postgres spins up a new backend process. At scale, this destroys performance.

Use \`pg.Pool\` instead:

\`\`\`js
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// Reuses connections automatically
\`\`\`

## 3. \`EXPLAIN ANALYZE\` Is Not Optional

Before I started using \`EXPLAIN ANALYZE\`, I had queries that "worked" but were doing full table scans on 100k-row tables. Two minutes of analysis saved seconds per request.

## 4. Transactions Are Not Just for Safety

Wrapping multiple operations in a transaction isn't just about rollback safety — it also guarantees consistency. If a multi-step operation partially fails, your database stays coherent.
    `
  },
  {
    slug: "first-post",
    title: "Hello World — Starting a Dev Blog",
    date: "2026-03-10",
    excerpt: "I've been meaning to start writing about what I build and learn. Better late than never.",
    tags: ["Personal"],
    content: `
# Hello World — Starting a Dev Blog

I've been building software for a while now and I've always told myself I'd start writing about it. This is that post.

## Why Bother?

**Writing forces clarity.** When I try to explain something I built, I often realize I only half-understood it. The process of writing this blog will make me a better engineer.

**It's a useful artifact.** Future me will want to remember why I made certain decisions. Future employers might find it interesting. Future developers might search for solutions I've already documented.

**I just want to.** Honestly, that's enough.

## What I'll Write About

Mostly what I'm building — projects, technical problems I run into, things I learn. I'm not trying to write tutorials or explain fundamentals. I'll write about the specific, messy, real problems I encounter.

If one person finds something useful here, great. If not, it still helped me write it.

Here we go.
    `
  }
];
