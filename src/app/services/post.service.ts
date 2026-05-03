import { Injectable, signal, computed } from '@angular/core';
import { Post, PostStatus } from '../models/post.model';

const CONTENT = [
  'Explore the core concepts and practical patterns every developer should understand for modern web applications.',
  'A hands-on walkthrough with real code examples, covering setup, common pitfalls, and performance considerations.',
  'Deep dive into the internals with annotated samples designed to be adapted for production environments.',
  'Learn how this technique simplifies your workflow and leads to more maintainable, scalable software.',
  'Breaking down the key changes, why they matter, and how to start adopting them in your projects today.',
  'Everything you need to adopt this confidently — from first steps through advanced edge cases.',
  'Compare the trade-offs, understand the constraints, and make better architectural decisions for your team.',
  'Step-by-step guide covering the happy path and the tricky edge cases you will encounter in practice.',
  'A first-principles look at why this exists, how it works under the hood, and when to reach for it.',
  'An up-to-date reference covering best practices, recommended tooling, and real-world deployment patterns.',
];

function sp(id: number, title: string, authorId: number, date: string, status: PostStatus = 'published'): Post {
  return {
    id,
    title,
    authorId,
    content: CONTENT[id % CONTENT.length],
    imageUrl: `https://picsum.photos/seed/p${id}/600/400`,
    status,
    createdAt: new Date(date),
    publishedAt: status === 'published' ? new Date(date) : null,
  };
}

const SEED_POSTS: Post[] = [
  // --- Angular ---
  sp(1,   'Getting Started with Angular 21',            2, '2024-01-05'),
  sp(2,   'Building Reactive UIs with Signals',          3, '2024-01-13'),
  sp(3,   'Standalone Components Best Practices',        2, '2024-01-21'),
  sp(4,   'Angular Signals Deep Dive',                   3, '2024-01-29'),
  sp(5,   'Lazy Loading in Angular 21',                  2, '2024-02-06'),
  sp(6,   'Angular Router: The Complete Guide',          3, '2024-02-14'),
  sp(7,   'Template-Driven vs Reactive Forms',           1, '2024-02-22'),
  sp(8,   'Content Projection with ng-content',          2, '2024-03-01'),
  sp(9,   'Custom Directives in Angular',                3, '2024-03-09'),
  sp(10,  'Optimizing Angular Bundle Size',              1, '2024-03-17'),
  // --- React & Vue ---
  sp(11,  'React Server Components Explained',           2, '2024-03-25'),
  sp(12,  'Building with Next.js 15',                    3, '2024-04-02'),
  sp(13,  'Zustand vs Redux Toolkit',                    1, '2024-04-10'),
  sp(14,  'React Query for Data Fetching',               2, '2024-04-18'),
  sp(15,  'Building Accessible React Components',        3, '2024-04-26'),
  sp(16,  'Vue 4 Composition API in Depth',              1, '2024-05-04'),
  sp(17,  'Svelte 5 Runes: A New Era',                   2, '2024-05-12'),
  sp(18,  'Nuxt 4 App Directory Guide',                  3, '2024-05-20'),
  sp(19,  'HTMX: Hypermedia Apps Return',                1, '2024-05-28'),
  sp(20,  'Web Components in 2026',                      2, '2024-06-05'),
  // --- JavaScript & TypeScript ---
  sp(21,  'TypeScript 5.8 New Features',                 3, '2024-06-13'),
  sp(22,  'Advanced TypeScript Generics',                1, '2024-06-21'),
  sp(23,  'JavaScript Temporal API Guide',               2, '2024-06-29'),
  sp(24,  'ES2026 Features You Should Know',             3, '2024-07-07'),
  sp(25,  'Functional Programming in JavaScript',        1, '2024-07-15'),
  sp(26,  'Design Patterns in TypeScript',               2, '2024-07-23'),
  sp(27,  'Monorepo Management with Turborepo',          3, '2024-07-31'),
  sp(28,  'Testing with Vitest: A Full Guide',           1, '2024-08-08'),
  sp(29,  'Bun vs Node.js: Performance Battle',          2, '2024-08-16'),
  sp(30,  'Deno 2.0 Is Production Ready',                3, '2024-08-24'),
  // --- CSS & Design ---
  sp(31,  'CSS Grid vs Flexbox in 2026',                 1, '2024-09-01'),
  sp(32,  'CSS Container Queries Guide',                 2, '2024-09-09'),
  sp(33,  'Tailwind CSS 4 Released',                     3, '2024-09-17'),
  sp(34,  'Dark Mode Best Practices',                    1, '2024-09-25'),
  sp(35,  'CSS Custom Properties Deep Dive',             2, '2024-10-03'),
  sp(36,  'Responsive Typography Systems',               3, '2024-10-11'),
  sp(37,  'Design Tokens with Style Dictionary',         1, '2024-10-19'),
  sp(38,  'Building Your First Design System',           2, '2024-10-27'),
  sp(39,  'Figma to Code Workflow',                      3, '2024-11-04'),
  sp(40,  'Color Theory for Developers',                 1, '2024-11-12'),
  // --- Backend ---
  sp(41,  'Node.js 22 LTS: What\'s New',                2, '2024-11-20'),
  sp(42,  'Building REST APIs with Fastify',             3, '2024-11-28'),
  sp(43,  'Go Generics in Production',                   1, '2024-12-06'),
  sp(44,  'Rust and WebAssembly Guide',                  2, '2024-12-14'),
  sp(45,  'Python FastAPI vs Django',                    3, '2024-12-22'),
  sp(46,  'GraphQL vs REST in 2026',                     1, '2024-12-30'),
  sp(47,  'Real-Time Apps with WebSockets',              2, '2025-01-07'),
  sp(48,  'gRPC for Microservices',                      3, '2025-01-15'),
  sp(49,  'Server-Sent Events Explained',                1, '2025-01-23'),
  sp(50,  'API Rate Limiting Strategies',                2, '2025-01-31'),
  // --- DevOps & Cloud ---
  sp(51,  'Docker Compose for Development',              3, '2025-02-08'),
  sp(52,  'Kubernetes for Frontend Developers',          1, '2025-02-16'),
  sp(53,  'GitHub Actions CI/CD Pipeline',               2, '2025-02-24'),
  sp(54,  'AWS Lambda Cold Start Problem',               3, '2025-03-04'),
  sp(55,  'Vercel vs Netlify vs Cloudflare Pages',       1, '2025-03-12'),
  sp(56,  'Terraform for Beginners',                     2, '2025-03-20'),
  sp(57,  'Monitoring with Prometheus and Grafana',      3, '2025-03-28'),
  sp(58,  'Container Security Scanning',                 1, '2025-04-05'),
  sp(59,  'Blue-Green Deployment Strategy',              2, '2025-04-13'),
  sp(60,  'Edge Functions: The Future of Serverless',    3, '2025-04-21'),
  // --- Databases ---
  sp(61,  'PostgreSQL Full Text Search',                 1, '2025-04-29'),
  sp(62,  'Redis Caching Strategies',                    2, '2025-05-07'),
  sp(63,  'MongoDB Schema Design Patterns',              3, '2025-05-15'),
  sp(64,  'SQLite for Edge Computing',                   1, '2025-05-23'),
  sp(65,  'Prisma ORM: Beyond the Basics',               2, '2025-05-31'),
  sp(66,  'Database Migration Strategies',               3, '2025-06-08'),
  sp(67,  'Vector Databases Explained',                  1, '2025-06-16'),
  sp(68,  'Event Sourcing with PostgreSQL',              2, '2025-06-24'),
  sp(69,  'Time Series Data with InfluxDB',              3, '2025-07-02'),
  sp(70,  'Choosing Between SQL and NoSQL',              1, '2025-07-10'),
  // --- Architecture ---
  sp(71,  'Domain-Driven Design Primer',                 2, '2025-07-18'),
  sp(72,  'Clean Architecture in Practice',              3, '2025-07-26'),
  sp(73,  'Micro-Frontends with Module Federation',      1, '2025-08-03'),
  sp(74,  'CQRS Pattern Explained',                      2, '2025-08-11'),
  sp(75,  'Event-Driven Architecture Guide',             3, '2025-08-19'),
  sp(76,  'Serverless Architecture Trade-offs',          1, '2025-08-27'),
  sp(77,  'Feature Flags Best Practices',                2, '2025-09-04'),
  sp(78,  'API Gateway Patterns',                        3, '2025-09-12'),
  sp(79,  'Circuit Breaker Pattern in Node.js',          1, '2025-09-20'),
  sp(80,  'Hexagonal Architecture Guide',                2, '2025-09-28'),
  // --- Security ---
  sp(81,  'JWT Best Practices in 2026',                  3, '2025-10-06'),
  sp(82,  'OAuth 2.0 PKCE Flow Explained',               1, '2025-10-14'),
  sp(83,  'Content Security Policy Guide',               2, '2025-10-22'),
  sp(84,  'SQL Injection Prevention',                    3, '2025-10-30'),
  sp(85,  'Zero Trust Security Model',                   1, '2025-11-07'),
  sp(86,  'HTTPS and TLS 1.3 Explained',                 2, '2025-11-15'),
  sp(87,  'Rate Limiting and DDoS Protection',           3, '2025-11-23'),
  sp(88,  'Dependency Auditing with npm audit',          1, '2025-12-01'),
  sp(89,  'Secrets Management with Vault',               2, '2025-12-09'),
  sp(90,  'OWASP Top 10 for Developers',                 3, '2025-12-17'),
  // --- Mobile & PWA ---
  sp(91,  'PWA in 2026: Still Worth It?',                1, '2025-12-25'),
  sp(92,  'React Native New Architecture',               2, '2026-01-02'),
  sp(93,  'Flutter vs React Native in 2026',             3, '2026-01-10'),
  sp(94,  'Offline-First App Design',                    1, '2026-01-18'),
  sp(95,  'Web Push Notifications API',                  2, '2026-01-26'),
  // --- Career & Productivity ---
  sp(96,  'Code Review Best Practices',                  3, '2026-02-03'),
  sp(97,  'Managing Technical Debt',                     1, '2026-02-11'),
  sp(98,  'Remote Work Developer Workflow',              2, '2026-02-19'),
  sp(99,  'Effective Pair Programming',                  3, '2026-02-27'),
  sp(100, 'Developer Interview Prep Guide',              1, '2026-03-07'),
  sp(101, 'Contributing to Open Source',                 2, '2026-03-15'),
  sp(102, 'Writing Technical Documentation',             3, '2026-03-23'),
  sp(103, 'Burnout Prevention for Developers',           1, '2026-03-31'),
  sp(104, 'Git Workflow for Teams',                      2, '2026-04-08'),
  sp(105, 'The Art of Debugging',                        3, '2026-04-16'),
  // --- Drafts ---
  sp(106, 'Draft: WebGPU for Real-Time Graphics',        1, '2026-04-20', 'draft'),
  sp(107, 'Draft: AI Code Generation Tools Review',      2, '2026-04-24', 'draft'),
  sp(108, 'Draft: WebAssembly System Interface',         3, '2026-04-26', 'draft'),
  sp(109, 'Draft: Bun 2.0 Early Preview',                1, '2026-04-28', 'draft'),
  sp(110, 'Draft: CSS Anchor Positioning',               2, '2026-05-01', 'draft'),
];

@Injectable({ providedIn: 'root' })
export class PostService {
  private _posts = signal<Post[]>(SEED_POSTS);
  private _nextId = signal(111);

  readonly posts = computed(() => [...this._posts()].reverse());

  getById(id: number): Post | undefined {
    return this._posts().find(p => p.id === id);
  }

  addPost(data: Omit<Post, 'id' | 'createdAt'>): Post {
    const post: Post = {
      id: this._nextId(),
      ...data,
      createdAt: new Date(),
    };
    this._posts.update(posts => [...posts, post]);
    this._nextId.update(n => n + 1);
    return post;
  }
}
