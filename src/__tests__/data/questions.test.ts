import { getQuestions } from '~/data/questions';
import { Question } from '~/models/question';
import fs from 'fs/promises';
import path from 'path';

const getDummyQuestions = (): Question[] => [
  {
    id: '001',
    type: 'multiple',
    name: 'fruits',
    question: '好きな果物は？',
    choices: [
      { value: 'apple', displayValue: 'りんご' },
      { value: 'banana', displayValue: 'バナナ' },
      { value: 'orange', displayValue: 'オレンジ' },
    ],
  },
  {
    id: '002',
    type: 'single',
    name: 'vegetables',
    question: '苦手な野菜は？',
    choices: [
      { value: 'cabbage', displayValue: 'キャベツ' },
      { value: 'lettuce', displayValue: 'レタス' },
      { value: 'spinach', displayValue: 'ほうれん草' },
    ],
  },
  {
    id: '003',
    type: 'text',
    question: '好きな料理を教えてください。',
    name: 'favoriteMeal',
  },
];

jest.mock('fs/promises', () => ({
  readFile: jest.fn(async () => JSON.stringify(getDummyQuestions())),
}));

test('get question by id', async () => {
  const result = await getQuestions('001');
  expect(fs.readFile).toBeCalledWith(
    path.resolve('./data/questions/001.json'),
    { encoding: 'utf-8' },
  );
  expect(result).toEqual(getDummyQuestions());
});
