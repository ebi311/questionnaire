/**
 * @jest-environment jsdom
 */
/*
v プロパティで指定した配列の数だけラジオボンタを表示する。
v ラジオボタンのラベルは、プロパティで指定した配列のdisplayValueを表示する。
v 一意に選択できるようにする (radio の name に同じものを入れる)
v プロパティ`value`に指定した値のラジオボタンが選択されている状態とする。
v ラジオボタンを選択した時に、その項目の`value`を引数としプロパティの関数`onChange`を実行する。
o ラジオボタンを別コンポーネントとして分離する
*/
import { fireEvent } from '@storybook/testing-library';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ComponentProps, useCallback, useState } from 'react';
import { RadioSelector } from '~/components/parts/RadioSelector';

type Props = ComponentProps<typeof RadioSelector>;

const getChoices = (): Props['choices'] => [
  { value: 'apple', displayValue: 'りんご' },
  { value: 'banana', displayValue: 'バナナ' },
  { value: 'orange', displayValue: 'オレンジ' },
];

const TestComponent = (props: {
  choices: Props['choices'];
  name: string;
  defaultValue: string;
}) => {
  const [value, setValue] = useState(props.defaultValue);
  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);
  return (
    <RadioSelector
      choices={props.choices}
      name={props.name}
      value={value}
      onChange={onChange}
    />
  );
};

const radioSelector = (choices: ComponentProps<typeof TestComponent>) =>
  render(<TestComponent {...choices} />);

test('show radio list', () => {
  const choices = getChoices();
  let target = radioSelector({ choices, name: 'test', defaultValue: 'orange' });
  expect(target.getByTestId('radio-list')).toBeInTheDocument();
  expect(target.getAllByTestId('radio-item')).toHaveLength(3);
  expect(target.getByLabelText('りんご')).toBeInTheDocument();
  expect(target.getByLabelText('バナナ')).toBeInTheDocument();
  expect(target.getByLabelText('オレンジ')).toBeInTheDocument();
  // 一旦アンマウントしないと前のが残っている
  target.unmount();
  // 項目を追加して確認
  choices.push({ value: 'peach', displayValue: 'もも' });
  target = radioSelector({ choices, name: 'test', defaultValue: 'orange' });
  expect(target.getAllByTestId('radio-item')).toHaveLength(4);
});

test('select single and check onChange', () => {
  const target = radioSelector({
    choices: getChoices(),
    name: 'test',
    defaultValue: 'orange',
  });
  const radioApple = target.getByLabelText('りんご') as HTMLInputElement;
  const radioBanana = target.getByLabelText('バナナ') as HTMLInputElement;
  // 事前に選択されていないことを確認
  expect(radioApple.checked).toBe(false);
  expect(radioBanana.checked).toBe(false);
  fireEvent.click(radioApple);
  fireEvent.click(radioBanana);
  // 'バナナ'だけが選択されていることを確認する
  expect(radioApple.checked).toBe(false);
  expect(radioBanana.checked).toBe(true);
});

test('set default value', () => {
  const target = radioSelector({
    choices: getChoices(),
    name: 'test',
    defaultValue: 'orange',
  });
  const radio = target.getByLabelText('オレンジ') as HTMLInputElement;
  expect(radio.checked).toBe(true);
});
