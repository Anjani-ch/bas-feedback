## Setup

Setup env variables in local .env file following .env.example.
Vercel/DB variables can be found in vercel dashboard.

For development it can be better to use the docker file located in the project root:

Run command below for local db setup:
```bash
docker compose up
```

## Deployment
Deployment will automatically trigger when pushing to master branch. You can monitor deployment process in Vercel dashboard.

## Project structure
### Drizzle
Drizzle is the type-ORM used for communicating the database. You can find both config and schemas in src/db.

#### Migrations
Migrations are located in drizzle/migrations.

To generate migrations run:
```bash
npm run migrations:generate
```

To push migrations to Db run:
```bash
npm run db:push
```

#### Data access
All logic for Db interactions is located in the data-access folder. This makes it easer to update the DB implementation behind the scenes without having to change much of the project. It will be organized under their respective entity, for example:
```
data-access/user
data-access/issue.
```

#### Use cases
Use cases are built taking in a context which is the needed dependencies of the use-case, typically the data-access implementations. They can also take in an optional data argument for passing needed data down to the context methods. Use cases are generally the uses of the application. This is where business logic could be implemented for handling errors. Use-caaes follow the same folder structure as data-access, and can have extra files for greating the use-case, for example a types.ts for type definitions of the use-case context.

#### UI
UI is mostly built with shadcn UI. But it is possible to add other libraries or own UI components from scratch. The CSS is implemented in the form of tailwind CSS.

# Next.js standard README

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
