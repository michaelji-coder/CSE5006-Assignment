import fs from 'fs';
import path from 'path';
import { sequelize, Blog, Counter } from '../models/index.js';

async function init() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

  await sequelize.sync({ alter: true });

  // Ensure a counter row exists
  const [row] = await Counter.findOrCreate({ where: { name: 'requests' } });

  // Seed a sample blog if none exist
  const count = await Blog.count();
  if (count === 0) {
    await Blog.create({
      title: 'Welcome to the RSS Server',
      author: 'System',
      content: 'This is a seeded post created during DB initialization.',
      image: null,
      link: '',
    });
  }

  console.log('Database initialized.');
  process.exit(0);
}

init().catch((err) => {
  console.error(err);
  process.exit(1);
});
