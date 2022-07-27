import React, { useId, useMemo, useState } from 'react';
import { MultipleChoice, Question, SingleChoice } from '~/models/question';
import { CheckboxSelector } from '../commonParts/CheckboxSelector';
import { RadioSelector } from '../commonParts/RadioSelector';
import { TextArea } from '../commonParts/TextArea';

const getAnswerControl: {
  [key in Question['type']]: (
    q: Question,
    value: string | string[],
    onChange: (value: string | string[]) => void,
  ) => JSX.Element;
} = {
  multiple: (q, value, onChange) => (
    <CheckboxSelector
      choices={(q as MultipleChoice).choices}
      value={value as string[]}
      onChange={onChange}
      name={q.name}
    />
  ),
  single: (q, value, onChange) => (
    <RadioSelector
      choices={(q as SingleChoice).choices}
      name={q.name}
      value={value as string}
      onChange={onChange}
    />
  ),
  text: (q, value, onChange) => (
    <TextArea
      name={q.name}
      value={value as string}
      onChange={e => onChange(e.target.value)}
      label="100文字以内"
    />
  ),
};

type Props = {
  questions: Question[];
  answers?: [string[], string, string];
};

const initAnswers = [[], '', ''] as [string[], string, string];

export const QuestionnaireForm = (props: Props) => {
  const { questions, answers } = props;
  const [value, setValue] = useState(answers || initAnswers);

  const questionElements = useMemo(
    () =>
      questions.map((q, i) => {
        const element = getAnswerControl[q.type](q, value[i], v =>
          setValue(stateValue => {
            stateValue[i] = v;
            return [...stateValue];
          }),
        );
        return (
          <div key={i}>
            <p>{q.question}</p>
            {element}
          </div>
        );
      }),
    [questions, value],
  );

  const id = useId();
  return (
    <form>
      <div>
        <label htmlFor={id} className="label">
          <span className="label-text">回答者氏名</span>
        </label>
        <input
          id={id}
          type="text"
          data-testid="respondent"
          className="input input-primary"
        />
      </div>
      <div data-testid="question-list">{questionElements}</div>
    </form>
  );
};
