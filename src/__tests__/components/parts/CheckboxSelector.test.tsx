/**
 * @jest-environment jsdom
 */
/*
o プロパティで指定した配列の数だけチェックボックスを表示する。
o チェックボックスのラベルは、プロパティで指定した配列のdisplayValueを表示する。
o 複数選択できるようにする
o プロパティ`value`に指定した値のチェックボックスが選択されている状態とする。
o チェックボックスを選択した時に、その項目の`value`を引数としプロパティの関数`onChange`を実行する。
- チェックボックスを別コンポーネントとして分離する
*/
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { ComponentProps, useCallback, useState } from 'react';
import { CheckboxSelector } from '~/components/parts/CheckboxSelector';

type Props = ComponentProps<typeof CheckboxSelector>;

const getChoices = (): Props['choices'] => [
  { value: 'apple', displayValue: 'りんご' },
  { value: 'banana', displayValue: 'バナナ' },
  { value: 'orange', displayValue: 'オレンジ' },
];

const TestComponent = (props: {
  choices: Props['choices'];
  name: string;
  defaultValue: string[];
}) => {
  const [value, setValue] = useState(props.defaultValue);
  const onChange = useCallback((value: string[]) => {
    setValue(value);
  }, []);
  return (
    <CheckboxSelector
      choices={props.choices}
      name={props.name}
      value={value}
      onChange={onChange}
    />
  );
};

const checkboxSelector = (choices: ComponentProps<typeof TestComponent>) =>
  render(<TestComponent {...choices} />);

test('show checkbox list', () => {
  const choices = getChoices();
  let target = checkboxSelector({
    choices,
    defaultValue: [],
    name: 'test',
  });
  expect(target.getByTestId('checkbox-list')).toBeInTheDocument();
  expect(target.getAllByTestId('checkbox-item')).toHaveLength(3);
  expect(target.getByLabelText('りんご')).toBeInTheDocument();
  expect(target.getByLabelText('バナナ')).toBeInTheDocument();
  expect(target.getByLabelText('オレンジ')).toBeInTheDocument();
  // 一旦アンマウントしないと前のが残っている
  target.unmount();
  // 項目を追加して確認
  choices.push({ value: 'peach', displayValue: 'もも' });
  target = checkboxSelector({
    choices,
    name: 'test',
    defaultValue: [],
  });
  expect(target.getAllByTestId('checkbox-item')).toHaveLength(4);
});

test('set default value', () => {
  const target = checkboxSelector({
    choices: getChoices(),
    name: 'test',
    defaultValue: ['orange'],
  });
  const checkbox = target.getByLabelText('オレンジ') as HTMLInputElement;
  expect(checkbox.checked).toBe(true);
});

test('select multiple and check onChange', () => {
  const target = checkboxSelector({
    choices: getChoices(),
    name: 'test',
    defaultValue: [],
  });
  const checkboxApple = target.getByLabelText('りんご') as HTMLInputElement;
  const checkboxBanana = target.getByLabelText('バナナ') as HTMLInputElement;
  // 事前に選択されていないことを確認
  expect(checkboxApple.checked).toBe(false);
  expect(checkboxBanana.checked).toBe(false);
  fireEvent.click(checkboxApple);
  fireEvent.click(checkboxBanana);
  // 'バナナ'だけが選択されていることを確認する
  expect(checkboxApple.checked).toBe(true);
  expect(checkboxBanana.checked).toBe(true);
});
