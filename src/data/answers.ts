import fs from 'fs/promises';
import path from 'path';
import { QuestionnaireAnswer } from '~/models/answer';

export const getAnswer = async (id: string) => {
  const filePath = path.resolve('./data/answers', `${id}.json`);
  const json = await fs.readFile(filePath, { encoding: 'utf-8' });
  return JSON.parse(json) as QuestionnaireAnswer;
};
