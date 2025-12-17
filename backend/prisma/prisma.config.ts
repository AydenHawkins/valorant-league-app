import { defineConfig } from '@prisma/client';

export default defineConfig({
  schema: './schema.prisma',
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
