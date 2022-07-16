import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RadioButton } from './RadioButton';
import { screen, userEvent, waitFor, within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';
import { expect } from '@storybook/jest';
import { StoryDecorator } from '../StoryDecorator';

export default {
  title: 'parts/RadioButton',
  component: RadioButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    checked: { control: 'boolean' },
  },
  decorators: [
    Story => (
      <StoryDecorator>
        <Story />
      </StoryDecorator>
    ),
  ],
} as ComponentMeta<typeof RadioButton>;

const Template: ComponentStory<typeof RadioButton> = args => {
  const { children, ..._props } = args;
  return <RadioButton {..._props}>{children}</RadioButton>;
};

export const LabelText = Template.bind({});

LabelText.args = {
  children: 'ラベル',
  onChange: action('onChange'),
  name: 'check',
};

LabelText.play = async () => {
  // プロパティで指定したラベルが表示されること
  const block = within(screen.getByTestId('light'));
  const clickLabel = block.getByText('ラベル');

  // ラベルをクリックして選択できること
  await userEvent.click(clickLabel);
  await expect(block.getByLabelText('ラベル')).toBeChecked();
};

export const LabelVDom = Template.bind({});

LabelVDom.args = {
  children: <span>ラベル</span>,
};

export const Checked = Template.bind({});

Checked.args = {
  checked: true,
  children: <span>ラベル</span>,
  value: 'apple',
};
