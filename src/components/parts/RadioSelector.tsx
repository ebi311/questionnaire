import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { RadioButton } from './RadioButton';

type Props = {
  /** 選択肢となるデータのリスト */
  choices: { value: string; displayValue: string }[];
  /** コントロールを一意に判別する名前 input#name と同意 */
  name: string;
  /** コントロールの値 */
  value: string;
  /** 値が変更されたときのイベントハンドラ */
  onChange: (value: string) => void;
};

export const RadioSelector: React.FC<Props> = props => {
  const { choices, name, value } = props;

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      props.onChange(value);
    },
    [props],
  );

  const radioElements = useMemo(
    () =>
      choices.map(choice => (
        <li key={choice.value}>
          <RadioButton
            name={name}
            checked={choice.value === value}
            value={choice.value}
            onChange={onChange}
          >
            {choice.displayValue}
          </RadioButton>
        </li>
      )),
    [choices, name, onChange, value],
  );

  return <ul data-testid="radio-list">{radioElements}</ul>;
};
