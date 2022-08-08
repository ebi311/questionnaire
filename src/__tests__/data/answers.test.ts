import { getAnswer, postAnswer } from '~/data/answers';
import { QuestionnaireAnswer } from '~/models/answer';
import fs from 'fs/promises';
import path from 'path';
import stringify from 'json-stable-stringify';

const getDummyAnswer = (): QuestionnaireAnswer => ({
  answers: [
    { answer: ['apple', 'banana'], questionId: '001' },
    { answer: 'cabbage', questionId: '002' },
    { answer: 'げたんは', questionId: '003' },
  ],
  name: '海老原 賢次',
});

jest.mock('fs/promises', () => ({
  readFile: jest.fn(async () => JSON.stringify(getDummyAnswer())),
  writeFile: jest.fn(),
}));

test('get Answer', async () => {
  const result = await getAnswer('001');
  expect(fs.readFile).toBeCalledWith(path.resolve('./data/answers/001.json'), {
    encoding: 'utf-8',
  });
  expect(result).toEqual(getDummyAnswer());
});

test('post exist Answer', async () => {
  const data = getDummyAnswer();
  data.name = 'リアクト 太郎';
  const result = await postAnswer('002', data);
  expect(fs.writeFile).toBeCalledWith(
    path.resolve('./data/answers/002.json'),
    stringify(data),
    {
      encoding: 'utf-8',
    },
  );
  expect(result).toBe('002');
});
