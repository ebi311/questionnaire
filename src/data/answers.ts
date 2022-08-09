import fs from 'fs/promises';
import stringify from 'json-stable-stringify';
import path from 'path';
import { QuestionnaireAnswer } from '~/models/answer';

export const getAnswer = async (questionnaireId: string, answerId: string) => {
  const filePath = path.resolve(
    './data/answers',
    `${questionnaireId}-${answerId}.json`,
  );
  const json = await fs.readFile(filePath, { encoding: 'utf-8' });
  return JSON.parse(json) as QuestionnaireAnswer;
};

export const postAnswer = async (
  questionnaireId: string,
  answerId: string,
  data: QuestionnaireAnswer,
) => {
  const filePath = path.resolve(
    './data/answers',
    `${questionnaireId}-${answerId}.json`,
  );
  const json = stringify(data);
  await fs.writeFile(filePath, json, { encoding: 'utf-8' });
  return answerId;
};
