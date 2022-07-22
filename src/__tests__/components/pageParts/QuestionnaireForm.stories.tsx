import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { QuestionnaireForm } from '~/components/pageParts/QuestionnaireForm';
import { StoryDecorator } from '~/components/StoryDecorator';

export default {
  title: 'pageParts/QuestionnaireForm',
  component: QuestionnaireForm,
  argTypes: {},
  decorators: [StoryDecorator],
} as ComponentMeta<typeof QuestionnaireForm>;

const Template: ComponentStory<typeof QuestionnaireForm> = args => (
  <QuestionnaireForm {...args} />
);

export const NewPost = Template.bind({});

NewPost.args = {};
