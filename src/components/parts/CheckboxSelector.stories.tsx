import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ComponentProps, useCallback, useState } from 'react';
import { StoryDecorator } from '../StoryDecorator';
import { CheckboxSelector } from './CheckboxSelector';

type Props = ComponentProps<typeof CheckboxSelector>;

const getChoices = (): Props['choices'] => [
  { value: 'apple', displayValue: 'りんご' },
  { value: 'banana', displayValue: 'バナナ' },
  { value: 'orange', displayValue: 'オレンジ' },
];

export default {
  title: 'parts/CheckboxSelector',
  component: CheckboxSelector,
  decorators: [
    Story => (
      <StoryDecorator>
        <Story />
      </StoryDecorator>
    ),
  ],
} as ComponentMeta<typeof CheckboxSelector>;

const Template: ComponentStory<typeof CheckboxSelector> = props => {
  const { value: _value, onChange: _onChange, ..._props } = props;
  const [value, setValue] = useState(_value);
  const onChange = useCallback((value: string[]) => {
    setValue(value);
  }, []);

  return (
    <form>
      <CheckboxSelector {..._props} value={value} onChange={onChange} />
    </form>
  );
};

export const Normal = Template.bind({});

Normal.args = {
  choices: getChoices(),
  name: 'test',
  value: ['orange'],
};
