This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Backend & Docker (added)

This project now includes a simple backend (Sequelize + SQLite) and Docker packaging to support the RSS server assignment.

Quick start (development):

```bash
cd assignment1
npm install
npm run db:init    # creates data/database.sqlite and seeds a sample post
npm run dev
```

Build and run in Docker:

```bash
cd assignment1
docker build -t rss-server .
docker run -p 3000:3000 rss-server
```

API endpoints:
- `GET /api/blog` - list blogs
- `POST /api/blog` - create blog (JSON body: `title`, `author`, `content`, `image`, `link`)
- `GET /api/blog/:id` - get blog
- `PUT /api/blog/:id` - update blog
- `DELETE /api/blog/:id` - delete blog
- `GET /api/health` - healthcheck (DB connectivity + uptime)
- `GET /api/count` - return persisted request counter
- `POST /api/count` - increment and return request counter

Demo checklist for video:
- Show `npm run db:init` output and `data/database.sqlite` file.
- Start app in Docker and show `curl http://localhost:3000/api/health`.
- Use the frontend `Createblog` page to create a post and show it appears in `BlogList`.
- Show `GET /api/count` before/after POST to demonstrate usage counting.
