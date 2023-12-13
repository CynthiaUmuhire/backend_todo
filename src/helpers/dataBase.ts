import { Config, JsonDB } from 'node-json-db';

export const db = new JsonDB(new Config('todo-db.json', true, true, '/'));

export default async function dataBase() {
  if (!db.exists('/tasks')) await db.push('/tasks', []);
  if (!db.exists('/categories')) await db.push('/categories', []);
}
