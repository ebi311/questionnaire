/**
 * @jest-environment jsdom
 */
import React, { ComponentProps } from 'react';
import { QuestionnaireForm } from '~/components/pageParts/QuestionnaireForm';
import { fireEvent, render as _render, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Question } from '~/models/question';

const getChoices = (): Question[] => [
  {
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
    type: 'text',
    question: '好きな料理を教えてください。',
    name: 'favoriteMeal',
  },
];

const render = (props: ComponentProps<typeof QuestionnaireForm>) =>
  _render(<QuestionnaireForm {...props}></QuestionnaireForm>);

test('show input name', () => {
  const target = render({ questions: getChoices() });
  const nameInput = target.getByLabelText('回答者氏名') as HTMLInputElement;
  expect(nameInput).toBeInTheDocument();
  fireEvent.change(nameInput, { target: { value: 'test' } });
  expect(nameInput.value).toBe('test');
});

test('show questions', () => {
  const target = render({ questions: getChoices() });
  const questions = target.getByTestId('question-list').children;
  expect(questions).toHaveLength(3);
  // 1番目はチェックボックスリスト
  expect(
    within(questions[0] as HTMLElement).getByTestId('checkbox-list'),
  ).toBeInTheDocument();
  // 2番目はラジオボタンリスト
  expect(
    within(questions[1] as HTMLElement).getByTestId('radio-list'),
  ).toBeInTheDocument();
  // 3番目はテキスト入力
  expect(
    within(questions[2] as HTMLElement).getByTestId('text-area'),
  ).toBeInTheDocument();
  // 質問文の表示
  expect(target.getByText('好きな果物は？')).toBeInTheDocument();
  expect(target.getByText('苦手な野菜は？')).toBeInTheDocument();
  expect(target.getByText('好きな料理を教えてください。')).toBeInTheDocument();
});

test('show questions2', () => {
  const choices = getChoices();
  const target = render({ questions: [choices[1], choices[2], choices[0]] });
  const questions = target.getByTestId('question-list').children;
  expect(questions).toHaveLength(3);
  // 1番目はラジオボタンリスト
  expect(
    within(questions[0] as HTMLElement).getByTestId('radio-list'),
  ).toBeInTheDocument();
  // 2番目はテキスト入力
  expect(
    within(questions[1] as HTMLElement).getByTestId('text-area'),
  ).toBeInTheDocument();
  // 3番目はチェックボックスリスト
  expect(
    within(questions[2] as HTMLElement).getByTestId('checkbox-list'),
  ).toBeInTheDocument();
});

test('input answers', () => {
  const target = render({ questions: getChoices() });
  const appleCheckbox = target.getByLabelText('りんご') as HTMLInputElement;
  // 初期はチェックされていない
  expect(appleCheckbox.checked).toBe(false);
  // チェックボックス をクリック
  fireEvent.click(appleCheckbox);
  expect(appleCheckbox.checked).toBe(true);
  // ラジオボタンをクリック
  const lettuceRadioButton = target.getByLabelText(
    'レタス',
  ) as HTMLInputElement;
  fireEvent.click(lettuceRadioButton);
  expect(lettuceRadioButton.checked).toBe(true);
  // 自由入力欄にテキストを入れる
  const favoriteMeal = target.getByLabelText('100文字以内') as HTMLInputElement;
  fireEvent.change(favoriteMeal, { target: { value: 'カツ丼' } });
  expect(favoriteMeal.value).toBe('カツ丼');
});

test('set default answers', () => {
  const target = render({
    questions: getChoices(),
    answers: [['orange'], 'cabbage', 'ドリア'],
  });

  const orangeCheckbox = target.getByLabelText('オレンジ') as HTMLInputElement;
  expect(orangeCheckbox.checked).toBe(true);
  const cabbageRadiobutton = target.getByLabelText(
    'キャベツ',
  ) as HTMLInputElement;
  expect(cabbageRadiobutton.checked).toBe(true);
  const favoriteMeal = target.getByLabelText('100文字以内') as HTMLInputElement;
  expect(favoriteMeal.value).toBe('ドリア');
});
