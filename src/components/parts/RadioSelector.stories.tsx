import { expect } from '@storybook/jest';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { ComponentProps } from 'react';
import { StoryDecorator } from '../StoryDecorator';
import { RadioSelector } from './RadioSelector';

type Props = ComponentProps<typeof RadioSelector>;

const getProps = (): Props => ({
  choices: [
    { value: 'apple', displayValue: 'りんご' },
    { value: 'banana', displayValue: 'バナナ' },
    { value: 'orange', displayValue: 'オレンジ' },
  ],
  name: 'test',
  value: 'banana',
  onChange: () => {
    /** */
  },
});

export default {
  title: 'parts/RadioSelector',
  component: RadioSelector,
  decorators: [story => <StoryDecorator Story={story} />],
} as ComponentMeta<typeof RadioSelector>;

const Template: ComponentStory<typeof RadioSelector> = args => {
  return <RadioSelector {...args} />;
};

export const Normal = Template.bind({});

Normal.args = {
  ...getProps(),
};
