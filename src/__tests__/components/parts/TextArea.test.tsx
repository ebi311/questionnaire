/**
 * @jest-environment jsdom
 */
/*
- `value`プロパティで渡された文字列を表示する。
- テキストボックスを変更した場合、`onChange`プロパティのイベントハンドラを実行する。引数に入力内容を渡す。
*/
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { ChangeEvent, ComponentProps, useCallback, useState } from 'react';
import { TextArea } from '~/components/parts/TextArea';

const TestComponent = (props: { defaultValue: string; label: string }) => {
  const { label, defaultValue } = props;
  const [value, setValue] = useState(defaultValue);
  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }, []);
  return <TextArea onChange={onChange} value={value} label={label} />;
};

const textArea = (props: ComponentProps<typeof TestComponent>) =>
  render(<TestComponent {...props} />);

test('show label', () => {
  const target = textArea({
    label: 'ラベル',
    defaultValue: '',
  });
  expect(target.getByLabelText('ラベル')).toBeInTheDocument();
});

test('show value prop.', () => {
  const target = textArea({
    label: 'ラベル',
    defaultValue: 'prop value',
  });
  const textAreaElement = target.getByTestId(
    'text-area',
  ) as HTMLTextAreaElement;
  expect(textAreaElement.value).toBe('prop value');
});

test('show value prop.', () => {
  const target = textArea({
    label: 'ラベル',
    defaultValue: 'prop value',
  });
  const textAreaElement = target.getByTestId(
    'text-area',
  ) as HTMLTextAreaElement;
  expect(textAreaElement.value).toBe('prop value');
});

test('call onChange', () => {
  const target = textArea({
    label: 'ラベル',
    defaultValue: 'prop value',
  });
  const textAreaElement = target.getByTestId(
    'text-area',
  ) as HTMLTextAreaElement;
  //
  fireEvent.change(textAreaElement, { target: { value: 'change value' } });
  expect(textAreaElement.value).toBe('change value');
});
