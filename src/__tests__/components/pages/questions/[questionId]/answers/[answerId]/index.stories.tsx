import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Answer from '~/pages/questions/[questionId]/answers/[answersId]';
import { StoryDecorator } from '../../../../../StoryDecorator';

export default {
  title: 'pages/answer/index',
  component: Answer,
  decorators: [
    Story => (
      <StoryDecorator>
        <Story />
      </StoryDecorator>
    ),
  ],
} as ComponentMeta<typeof Answer>;

const Template: ComponentStory<typeof Answer> = props => <Answer {...props} />;

export const Normal = Template.bind({});

Normal.args = {};
