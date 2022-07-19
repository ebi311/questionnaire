import React, { InputHTMLAttributes, PropsWithChildren } from 'react';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'>;

export const RadioButton: React.FC<PropsWithChildren<Props>> = props => {
  // input に`...`を使った渡したいため、`children`を除外する
  const { children, ..._props } = props;
  return (
    <label>
      <input {..._props} type="radio" data-testid="radio-item" />
      {children}
    </label>
  );
};
