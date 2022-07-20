import classNames from 'classnames';
import React, { InputHTMLAttributes, useMemo } from 'react';

type Props = {
  label: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'>;

export const Checkbox: React.FC<Props> = props => {
  const { label, className: _className, ..._props } = props;

  const inputClassName = classNames(_className, 'checkbox', 'checkbox-primary');

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
        className={inputClassName}
        data-testid="checkbox-item"
        type="checkbox"
        {..._props}
      />
      <span className={labelStyle}>{label}</span>
    </label>
  );
};
