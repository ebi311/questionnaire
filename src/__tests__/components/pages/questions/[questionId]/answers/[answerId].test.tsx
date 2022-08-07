/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import '@testing-library/jest-dom';
import { render as _render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { QuestionnaireAnswer } from '~/models/answer';
import { Question } from '~/models/question';
import AnswerPage from '~/pages/questions/[questionnaireId]/answers/[answerId]';

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

const render = (props: ComponentProps<typeof AnswerPage>) =>
  _render(<AnswerPage {...props} />);

test('show answer page', () => {
  const target = render({ questions: getChoices(), answer: answer() });
  const question1Choices = target
    .getByText('好きな果物は？')
    .parentElement!.querySelectorAll('ul li input');
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
    .parentElement!.querySelectorAll('ul li input');
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
