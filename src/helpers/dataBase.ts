import { Config, JsonDB } from 'node-json-db';

export default async function dataBase() {
  const database = new JsonDB(new Config('todo-db.json', true, true, '/'));
  // console.log(database.getData('/'));
  if (!database.exists('/tasks')) await database.push('/tasks', []);
  if (!database.exists('/categories')) await database.push('/categories', []);
  return database;
}
