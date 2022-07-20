import classNames from 'classnames';
import React, { InputHTMLAttributes, PropsWithChildren, useMemo } from 'react';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'>;

export const RadioButton: React.FC<PropsWithChildren<Props>> = props => {
  // input に`...`を使った渡したいため、`children`を除外する
  const { children, className: _className, ..._props } = props;
  const inputClassName = classNames(_className, 'radio', 'radio-primary');
  const labelStyle = useMemo(
    () =>
      classNames([
        'ml-2',
        { 'bg-primary text-primary-content': _props.checked },
      ]),
    [_props.checked],
  );
  return (
    <label className="flex align-middle">
      <input
        {..._props}
        type="radio"
        data-testid="radio-item"
        className={inputClassName}
      />
      <span className={labelStyle}>{children}</span>
    </label>
  );
};
