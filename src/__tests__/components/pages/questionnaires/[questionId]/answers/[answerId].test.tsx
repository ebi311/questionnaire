/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import '@testing-library/jest-dom';
import { fireEvent, render as _render, waitFor } from '@testing-library/react';
import stringify from 'json-stable-stringify';
import { ComponentProps } from 'react';
import { QuestionnaireAnswer } from '~/models/answer';
import { Question } from '~/models/question';
import AnswerPage from '~/pages/questionnaires/[questionnaireId]/answers/[answerId]';

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

const answer = (): QuestionnaireAnswer => ({
  name: '海老原 賢次',
  answers: [
    {
      questionId: '001',
      answer: ['apple', 'orange'],
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
});

global.fetch = jest.fn();

const render = (props: ComponentProps<typeof AnswerPage>) =>
  _render(<AnswerPage {...props} />);

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      questionnaireId: 'q001',
      answerId: 'a001',
    },
  }),
}));

test('show answer page', () => {
  const target = render({ questions: getChoices(), answer: answer() });
  const question1Choices = target
    .getByText('好きな果物は？')
    .parentElement!.querySelectorAll(
      'ul li input',
    ) as NodeListOf<HTMLInputElement>;
  expect(question1Choices).toHaveLength(3);
  question1Choices.forEach(choice => {
    if (choice.getAttribute('value') === 'banana') {
      expect(choice).not.toHaveAttribute('checked');
    } else {
      expect(choice).toHaveAttribute('checked');
    }
  });
  const question2Choices = target
    .getByText('苦手な野菜は？')
    .parentElement!.querySelectorAll(
      'ul li input',
    ) as NodeListOf<HTMLInputElement>;
  expect(question2Choices).toHaveLength(3);
  question2Choices.forEach(choice => {
    if (choice.getAttribute('value') === 'spinach') {
      expect(choice).toHaveAttribute('checked');
    } else {
      expect(choice).not.toHaveAttribute('checked');
    }
  });
  const question3 = target
    .getByText('好きな料理を教えてください。')
    .parentElement!.querySelector('textarea') as HTMLTextAreaElement;
  expect(question3.value).toBe('山形屋の皿うどん');
});

test('on commit', async () => {
  const target = render({ questions: getChoices(), answer: answer() });

  fireEvent.click(target.getByLabelText('りんご'));
  fireEvent.click(target.getByLabelText('バナナ'));

  fireEvent.click(target.getByLabelText('キャベツ'));

  fireEvent.change(target.container.getElementsByTagName('textarea')[0], {
    target: { value: 'かるかん' },
  });

  await waitFor(() =>
    expect((target.getByLabelText('バナナ') as HTMLInputElement).checked).toBe(
      true,
    ),
  );
  fireEvent.click(target.getByText('回答する'));
  await waitFor(() =>
    expect(global.fetch).toBeCalledWith(
      '/api/questionnaires/q001/answers/a001',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: stringify({
          name: '海老原 賢次',
          answers: [
            {
              questionId: '001',
              answer: ['orange', 'banana'],
            },
            {
              questionId: '002',
              answer: 'cabbage',
            },
            {
              questionId: '003',
              answer: 'かるかん',
            },
          ],
        }),
      },
    ),
  );
});
