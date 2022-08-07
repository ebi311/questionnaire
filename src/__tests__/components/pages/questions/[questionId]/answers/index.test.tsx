/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import '@testing-library/jest-dom';
import { fireEvent, render as _render, waitFor } from '@testing-library/react';
import { ComponentProps } from 'react';
import { Question } from '~/models/question';
import AnswerPage from '~/pages/questions/[questionnaireId]/answers';
import stringify from 'json-stable-stringify';

const getChoices = (): Question[] => [
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

global.fetch = jest.fn();

const render = (props: ComponentProps<typeof AnswerPage>) =>
  _render(<AnswerPage {...props} />);

test('show answer page', () => {
  const target = render({ questions: getChoices() });
  const question1Choices = target
    .getByText('好きな果物は？')
    .parentElement!.querySelectorAll('ul li input');
  expect(question1Choices).toHaveLength(3);
  question1Choices.forEach(choice =>
    expect(choice).not.toHaveAttribute('checked'),
  );
  const question2Choices = target
    .getByText('苦手な野菜は？')
    .parentElement!.querySelectorAll('ul li input');
  expect(question2Choices).toHaveLength(3);
  question2Choices.forEach(choice =>
    expect(choice).not.toHaveAttribute('checked'),
  );
  const question3 = target
    .getByText('好きな料理を教えてください。')
    .parentElement!.querySelector('textarea') as HTMLTextAreaElement;
  expect(question3.value).toBe('');
});

test('onCommit to fetch', async () => {
  const target = render({ questions: getChoices() });
  fireEvent.change(target.getByLabelText('回答者氏名'), {
    target: { value: '海老原 賢次' },
  });
  fireEvent.click(target.getByLabelText('りんご'));
  fireEvent.click(target.getByLabelText('ほうれん草'));
  fireEvent.change(
    target
      .getByText('好きな料理を教えてください。')
      .parentElement!.querySelector('textarea') as HTMLTextAreaElement,
    {
      target: { value: '山形屋の皿うどん' },
    },
  );
  const q1a = target.getByLabelText('りんご') as HTMLInputElement;
  // 値がステートに反映されるのを待つ
  await waitFor(() => expect(q1a.checked).toBe(true));
  fireEvent.click(target.getByText('回答する'));
  await waitFor(() =>
    expect(global.fetch).toBeCalledWith('/api/questionnaires/q001/answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: stringify({
        name: '海老原 賢次',
        answers: [
          {
            questionId: '001',
            answer: ['apple'],
          },
          {
            questionId: '002',
            answer: 'spinach',
          },
          {
            questionId: '003',
            answer: '山形屋の皿うどん',
          },
        ],
      }),
    }),
  );
});
