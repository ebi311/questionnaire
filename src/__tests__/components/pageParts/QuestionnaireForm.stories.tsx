import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { QuestionnaireForm } from '~/components/pageParts/QuestionnaireForm';
import { Question } from '~/models/question';
import { StoryDecorator } from '../StoryDecorator';

export default {
  title: 'pageParts/QuestionnaireForm',
  component: QuestionnaireForm,
  argTypes: {},
  decorators: [
    Story => (
      <StoryDecorator>
        <Story />
      </StoryDecorator>
    ),
  ],
} as ComponentMeta<typeof QuestionnaireForm>;

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
    question: '好きな料理を教えてください',
    name: 'comment',
  },
];

const Template: ComponentStory<typeof QuestionnaireForm> = args => (
  <QuestionnaireForm {...args} />
);

export const NewPost = Template.bind({});

NewPost.args = {
  questions: getChoices(),
  answer: {
    name: 'ebihara',
    answers: [
      { questionnaireId: '001', answer: ['apple', 'banana'] },
      { questionnaireId: '002', answer: 'cabbage' },
      { questionnaireId: '003', answer: 'げたんは' },
    ],
  },
  onCommit: () => console.log('on commit'),
};
