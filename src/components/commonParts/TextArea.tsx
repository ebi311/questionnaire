import classNames from 'classnames';
import React, { TextareaHTMLAttributes, useId } from 'react';

type Props = {
  label: string;
  //
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'>;

export const TextArea = (props: Props) => {
  const id = useId();
  return (
    <>
      <label htmlFor={id} className="label">
        <span className="label-text">{props.label}</span>
      </label>
      <textarea
        id={id}
        data-testid="text-area"
        {...props}
        className={classNames(props.className, 'textarea textarea-primary')}
      />
    </>
  );
};
