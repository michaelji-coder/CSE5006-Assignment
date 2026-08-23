import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const blogsFile = path.join(dataDir, 'blogs.json');
const counterFile = path.join(dataDir, 'counter.json');

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(blogsFile)) fs.writeFileSync(blogsFile, JSON.stringify([]));
  if (!fs.existsSync(counterFile)) fs.writeFileSync(counterFile, JSON.stringify({ requests: 0 }));
}

export function readBlogs() {
  ensureDataDir();
  const raw = fs.readFileSync(blogsFile, 'utf8');
  return JSON.parse(raw || '[]');
}

export function writeBlogs(list) {
  ensureDataDir();
  fs.writeFileSync(blogsFile, JSON.stringify(list, null, 2));
}

export function readCounter() {
  ensureDataDir();
  const raw = fs.readFileSync(counterFile, 'utf8');
  return JSON.parse(raw || '{"requests":0}');
}

export function writeCounter(obj) {
  ensureDataDir();
  fs.writeFileSync(counterFile, JSON.stringify(obj, null, 2));
}
