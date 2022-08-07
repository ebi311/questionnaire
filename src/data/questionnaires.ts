import fs from 'fs/promises';
import path from 'path';
import { Question } from '~/models/question';

export const getQuestionnaire = async (id: string) => {
  const filePath = path.resolve('./data/questionnaires', `${id}.json`);
  const json = await fs.readFile(filePath, { encoding: 'utf-8' });
  return JSON.parse(json) as Question[];
};
