import { expect } from '@storybook/jest';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { ChangeEvent, ComponentProps, useCallback, useState } from 'react';
import { StoryDecorator } from '../StoryDecorator';
import { RadioSelector } from './RadioSelector';

type Props = ComponentProps<typeof RadioSelector>;

const getChoices = (): Props['choices'] => [
  { value: 'apple', displayValue: 'りんご' },
  { value: 'banana', displayValue: 'バナナ' },
  { value: 'orange', displayValue: 'オレンジ' },
];

export default {
  title: 'parts/RadioSelector',
  component: RadioSelector,
  decorators: [story => <StoryDecorator Story={story} />],
} as ComponentMeta<typeof RadioSelector>;

const Template: ComponentStory<typeof RadioSelector> = props => {
  const { value: _value, onChange: _onChange, ..._props } = props;
  const [value, setValue] = useState(_value);
  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  return (
    <form>
      <RadioSelector {..._props} value={value} onChange={onChange} />
    </form>
  );
};

export const Normal = Template.bind({});

Normal.args = {
  choices: getChoices(),
  name: 'test',
  value: 'orange',
};
