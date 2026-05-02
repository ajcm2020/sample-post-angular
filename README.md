# sample-post-angular

A simple blog application built with **Angular 21** that lets you list and create posts. The backend is fully in-memory — no server or database required.

## Features

- **Post list** — displays all posts newest-first, with title, author, date, and content preview
- **New post form** — create a post with title, author, and content; includes client-side validation
- **In-memory backend** — `PostService` stores posts in Angular signals; 3 seed posts are pre-loaded
- **Routing** — `/` shows the list, `/new` opens the form

## Project structure

```
src/app/
├── models/
│   └── post.model.ts               # Post interface
├── services/
│   └── post.service.ts             # In-memory store (signals)
├── components/
│   ├── post-list/                  # List view
│   └── post-form/                  # Create form
├── app.routes.ts
└── app.ts
```

## Models

### `Post` — `src/app/models/post.model.ts`

| Field | Type | Description |
|---|---|---|
| `id` | `number` | Auto-incremented unique identifier |
| `title` | `string` | Post headline |
| `author` | `string` | Display name of the author |
| `content` | `string` | Full body text of the post |
| `createdAt` | `Date` | Timestamp set automatically on creation |

```ts
export interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  createdAt: Date;
}
```

When creating a post via `PostService.addPost()`, only `title`, `author`, and `content` are required — `id` and `createdAt` are assigned by the service.

## Getting started

```bash
npm install
npm start          # dev server → http://localhost:4200
```

Or, if `ng` is on your PATH:

```bash
ng serve
```

## Available commands

| Command | Description |
|---|---|
| `npm start` | Start dev server at `http://localhost:4200` |
| `npm run build` | Production build into `dist/` |
| `npm test` | Run unit tests (Karma + Jasmine, ChromeHeadless) |
| `npm run watch` | Dev build in watch mode |

## Running tests

17 unit tests across 3 suites:

```bash
npm test
```

| Suite | Coverage |
|---|---|
| `PostService` | seed data, reverse order, addPost, id auto-increment |
| `PostList` | renders cards, shows titles, nav link, empty state |
| `PostForm` | field rendering, validation, submit + navigate, whitespace rejection |

## Tech stack

- Angular 21 (standalone components, signals, `@for` / `@if` control flow)
- Karma + Jasmine for unit tests
- No external UI library — plain CSS
