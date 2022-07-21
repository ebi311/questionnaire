import classNames from 'classnames';
import { TextareaHTMLAttributes, useId } from 'react';

type Props = {
  label: string;
  //
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = (props: Props) => {
  const { label, className, ..._props } = props;
  const id = useId();
  return (
    <>
      <label className="label" htmlFor={id}>
        <span className="label-text">{label}</span>
      </label>
      <textarea
        id={id}
        {..._props}
        className={classNames(className, 'textarea', 'textarea-primary')}
        data-testid="text-area"
      />
    </>
  );
};
