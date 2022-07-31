/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import '@testing-library/jest-dom';
import { render as _render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { Question } from '~/models/question';
import Answer from '~/pages/questions/[questionId]/answers';

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

const render = (props: ComponentProps<typeof Answer>) =>
  _render(<Answer {...props} />);

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
