import classNames from 'classnames';
import React, { InputHTMLAttributes, PropsWithChildren } from 'react';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'>;

export const RadioButton: React.FC<PropsWithChildren<Props>> = props => {
  const { children, className: _className, ..._props } = props;
  const className = classNames(_className, 'radio', 'radio-primary');
  return (
    <label className="flex align-middle">
      <input
        className={className}
        {..._props}
        type="radio"
        data-testid="radio-item"
      />
      <div className="ml-2">{children}</div>
    </label>
  );
};
