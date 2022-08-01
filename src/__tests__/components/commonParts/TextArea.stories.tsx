import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChangeEvent, useCallback, useState } from 'react';
import { TextArea } from '~/components/commonParts/TextArea';
import { StoryDecorator } from '~/__tests__/components/StoryDecorator';

export default {
  title: 'parts/TextArea',
  component: TextArea,
  decorators: [
    Story => (
      <StoryDecorator>
        <Story />
      </StoryDecorator>
    ),
  ],
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = props => {
  const { value: _value, ..._props } = props;
  const [value, setValue] = useState(_value);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [setValue],
  );

  return (
    <form>
      <TextArea {..._props} onChange={onChange} value={value} />
    </form>
  );
};

export const Normal = Template.bind({});

Normal.args = {
  label: 'ラベル',
  value: 'text area',
};
