import fs from 'fs/promises';
import path from 'path';

export const getQuestions = async (id: string) => {
  const filePath = path.resolve('./data/questions', `${id}.json`);
  const json = await fs.readFile(filePath, { encoding: 'utf-8' });
  return JSON.parse(json);
};
