import { seedDatabase } from "./utils/seed-data";

/**
 * Seed script to populate the database with fake track data
 *
 * Usage: npm run build && node dist/seed.js [count]
 * Or: ts-node src/seed.ts [count]
 *
 * Where [count] is the number of tracks to generate (default: 50)
 */

const count = process.argv[2] ? parseInt(process.argv[2], 10) : 50;

seedDatabase(count)
  .then(() => {
    process.exit(0);
  })
  .catch((_error) => {
    process.exit(1);
  });
