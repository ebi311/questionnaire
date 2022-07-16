import classNames from 'classnames';
import React, { InputHTMLAttributes, useId, useMemo } from 'react';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'>;

export const RadioButton: React.FC<Props> = props => {
  const { children, className, ..._props } = props;
  const styles = useMemo(
    () => ({
      radio: classNames('radio', 'mr-2', 'checked:radio-primary', className),
    }),
    [className],
  );
  const id = useId();
  return (
    <>
      <input id={id} className={styles.radio} type="radio" {..._props} />
      <label htmlFor={id} className="radio-label">
        {children}
      </label>
    </>
  );
};
