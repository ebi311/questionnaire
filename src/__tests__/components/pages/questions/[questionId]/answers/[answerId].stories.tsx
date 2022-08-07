import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import AnswerPage from '~/pages/questions/[questionnaireId]/answers/[answerId]';
import { StoryDecorator } from '~/__tests__/components/StoryDecorator';

export default {
  title: 'pages/answer/[answerId]',
  component: AnswerPage,
  decorators: [
    Story => (
      <StoryDecorator>
        <Story />
      </StoryDecorator>
    ),
  ],
} as ComponentMeta<typeof AnswerPage>;

const Template: ComponentStory<typeof AnswerPage> = props => (
  <AnswerPage {...props} />
);

export const Normal = Template.bind({});

Normal.args = {};
