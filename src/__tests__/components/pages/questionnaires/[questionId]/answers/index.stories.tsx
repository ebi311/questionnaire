import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Question } from '~/models/question';
import AnswerPage from '~/pages/questionnaires/[questionnaireId]/answers';
import { StoryDecorator } from '../../../../StoryDecorator';

export default {
  title: 'pages/answer/index',
  component: AnswerPage,
  decorators: [
    Story => (
      <StoryDecorator>
        <Story />
      </StoryDecorator>
    ),
  ],
} as ComponentMeta<typeof AnswerPage>;

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

const Template: ComponentStory<typeof AnswerPage> = props => (
  <AnswerPage {...props} />
);

export const Normal = Template.bind({});

Normal.args = {
  questions: getChoices(),
};
