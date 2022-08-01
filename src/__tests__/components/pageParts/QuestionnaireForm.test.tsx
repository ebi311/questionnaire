/**
 * @jest-environment jsdom
 */
import React, { ComponentProps } from 'react';
import { QuestionnaireForm } from '~/components/pageParts/QuestionnaireForm';
import {
  fireEvent,
  render as _render,
  waitFor,
  within,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Question } from '~/models/question';

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

const render = (props: ComponentProps<typeof QuestionnaireForm>) =>
  _render(<QuestionnaireForm {...props}></QuestionnaireForm>);

test('show input name', () => {
  const target = render({ questions: getChoices(), onCommit: jest.fn() });
  const nameInput = target.getByLabelText('回答者氏名') as HTMLInputElement;
  expect(nameInput).toBeInTheDocument();
  fireEvent.change(nameInput, { target: { value: 'test' } });
  expect(nameInput.value).toBe('test');
});

test('show questions', () => {
  const target = render({ questions: getChoices(), onCommit: jest.fn() });
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
  const target = render({
    questions: [choices[1], choices[2], choices[0]],
    onCommit: jest.fn(),
  });
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
  const target = render({ questions: getChoices(), onCommit: jest.fn() });
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
    answer: {
      name: '',
      answers: [
        { questionnaireId: '001', answer: ['orange'] },
        { questionnaireId: '002', answer: 'cabbage' },
        { questionnaireId: '003', answer: 'ドリア' },
      ],
    },
    onCommit: jest.fn(),
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

test('on commit', async () => {
  const onCommit = jest.fn();
  const target = render({
    questions: getChoices(),
    answer: {
      name: '',
      answers: [
        { questionnaireId: '001', answer: ['orange'] },
        { questionnaireId: '002', answer: 'cabbage' },
        { questionnaireId: '003', answer: 'ドリア' },
      ],
    },
    onCommit,
  });

  const nameInput = target.getByLabelText('回答者氏名') as HTMLInputElement;
  fireEvent.change(nameInput, { target: { value: '海老原 賢次' } });
  const commitButton = target.getByText('回答する') as HTMLButtonElement;
  fireEvent.click(commitButton);

  expect(
    target.queryByText('回答者氏名を入力してください。'),
  ).not.toBeInTheDocument();
  expect(
    target.queryByText('1つ以上選択してください。'),
  ).not.toBeInTheDocument();
  expect(target.queryByText('１つ選択してください。')).not.toBeInTheDocument();
  expect(target.queryByText('入力してください。')).not.toBeInTheDocument();

  await waitFor(() =>
    expect(onCommit).toHaveBeenCalledWith({
      name: '海老原 賢次',
      answers: [
        { questionnaireId: '001', answer: ['orange'] },
        { questionnaireId: '002', answer: 'cabbage' },
        { questionnaireId: '003', answer: 'ドリア' },
      ],
    }),
  );
});

test('validation', async () => {
  const onCommit = jest.fn();
  const target = render({
    questions: getChoices(),
    onCommit,
  });
  const commitButton = target.getByText('回答する') as HTMLButtonElement;
  fireEvent.click(commitButton);
  expect(
    await target.findByText('回答者氏名を入力してください。'),
  ).toBeInTheDocument();
  expect(
    await target.findByText('1つ以上選択してください。'),
  ).toBeInTheDocument();
  expect(await target.findByText('1つ選択してください。')).toBeInTheDocument();
  expect(await target.findByText('入力してください。')).toBeInTheDocument();
  expect(onCommit).not.toBeCalled();
});
