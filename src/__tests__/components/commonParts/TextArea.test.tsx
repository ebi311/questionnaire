/**
 * @jest-environment jsdom
 */
/*
- `label`プロパティの文字列を表示する
- `value`プロパティで渡された文字列を表示する。
- テキストボックスを変更した場合、`onChange`プロパティのイベントハンドラを実行する。引数に入力内容を渡す。
- DaisyUI のスタイルをあてる
*/
import { fireEvent, render } from '@testing-library/react';
import { ChangeEvent, useCallback, useState } from 'react';
import { TextArea } from '~/components/commonParts/TextArea';

const TestComponent = (props: { label: string; value: string }) => {
  const [value, setValue] = useState(props.value);
  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }, []);
  return <TextArea label={props.label} value={value} onChange={onChange} />;
};

const textArea = (props: Parameters<typeof TestComponent>[0]) =>
  render(<TestComponent {...props} />);

test('show value prop.', () => {
  const target = textArea({ label: 'ラベル', value: 'test' });
  target.getByLabelText('ラベル');
});

test('show value prop.', () => {
  const target = textArea({
    label: 'ラベル',
    value: 'prop value',
  });
  const textAreaElement = target.getByTestId(
    'text-area',
  ) as HTMLTextAreaElement;
  expect(textAreaElement.value).toBe('prop value');
});

test('call onChange', () => {
  const target = textArea({
    label: 'ラベル',
    value: 'prop value',
  });
  const textAreaElement = target.getByTestId(
    'text-area',
  ) as HTMLTextAreaElement;
  //
  fireEvent.change(textAreaElement, { target: { value: 'change value' } });
  expect(textAreaElement.value).toBe('change value');
});
