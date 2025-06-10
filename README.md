# Autohaus Plus

Autohaus Plus is a web application built with [Next.js](https://nextjs.org) for managing car dealerships and inventory.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Manage car inventory with ease.
- View detailed car information.
- Search and filter cars by various criteria.
- Responsive design for seamless use on all devices.

## Using Prisma

This project uses [Prisma](https://www.prisma.io/) for database management.

### Generating Prisma Client

After making changes to the `prisma/schema.prisma` file, generate the Prisma client:

```bash
npx prisma generate
```

This ensures the client is updated with the latest schema changes.

### Running Migrations

To apply schema changes to the database, run migrations:

```bash
npx prisma migrate dev
```

This will create and apply migrations in the development environment.

### Seeding the Database

To seed the database with initial data for `CarMake` and `CarModel` models, run the following command:

```bash
npx tsx ./prisma/seed/main.ts
```

This script will populate the database with predefined car makes and models.

### Modifying the Database Without Creating a New Migration

In development mode, you can modify the database schema directly without creating a new migration:

1. Update the `prisma/schema.prisma` file with the desired changes.
2. Reset the database to apply the changes:
   ```bash
   npx prisma db push
   ```
   This command updates the database schema to match the `schema.prisma` file without generating a migration.

### Opening Prisma Studio

Prisma Studio provides a GUI for interacting with your database. Open it with:

```bash
npx prisma studio
```

Access Prisma Studio in your browser to view and edit database records.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Prisma Documentation](https://www.prisma.io/docs) - learn about Prisma features and API.

## Deploy on Vercel

The easiest way to deploy Autohaus Plus is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
