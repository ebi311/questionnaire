import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { Checkbox } from './Checkbox';

type Props = {
  /** 選択肢となるデータのリスト */
  choices: { value: string; displayValue: string }[];
  /** コントロールを一意に判別する名前 input#name と同意 */
  name: string;
  /** コントロールの値 */
  value: string[];
  /** 値が変更されたときのイベントハンドラ */
  onChange: (value: string[]) => void;
};

export const CheckboxSelector: React.FC<Props> = props => {
  const { choices, name, onChange: _onChange, value } = props;

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { checked, value: selectValue } = e.target;
      const newValue = checked
        ? [...value, selectValue]
        : value.filter(v => v !== selectValue);
      // 項目をユニークな配列にする
      _onChange([...new Set(newValue)]);
    },
    [_onChange, value],
  );

  const checkboxList = useMemo(
    () =>
      choices.map(choice => (
        <li key={choice.value} className="mb-2">
          <Checkbox
            label={choice.displayValue}
            checked={value.includes(choice.value)}
            value={choice.value}
            onChange={onChange}
            name={name}
          />
        </li>
      )),
    [choices, name, onChange, value],
  );
  return <ul data-testid="checkbox-list">{checkboxList}</ul>;
};
