import React, {
  ChangeEvent,
  useCallback,
  useId,
  useMemo,
  useState,
} from 'react';
import { Answer } from '~/models/answer';
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

type QuestionnaireAnswer = { name: string; answers: Answer[] };

const createQuestionElement = (
  q: Question,
  setValue: React.Dispatch<
    React.SetStateAction<{
      name: string;
      answers: Answer[];
    }>
  >,
  value: QuestionnaireAnswer,
) => {
  const answer = value.answers.find(a => a.questionnaireId === q.id) || {
    answer: '',
    questionnaireId: q.id,
  };
  const element = getAnswerControl[q.type](q, answer?.answer, v =>
    setValue(stateValue => {
      answer.answer = v;
      const newAnswer = stateValue.answers.filter(
        a => a.questionnaireId !== q.id,
      );
      return { ...stateValue, answers: [...newAnswer, answer] };
    }),
  );
  return (
    <div key={q.id}>
      <p>{q.question}</p>
      {element}
    </div>
  );
};

type Props = {
  questions: Question[];
  answer?: QuestionnaireAnswer;
  onCommit: (arg: QuestionnaireAnswer) => void;
};

const initAnswers: QuestionnaireAnswer = {
  name: '',
  answers: [],
};

export const QuestionnaireForm = (props: Props) => {
  const { questions, answer, onCommit: _onCommit } = props;
  const [value, setValue] = useState(answer || initAnswers);

  const questionElements = useMemo(
    () => questions.map(q => createQuestionElement(q, setValue, value)),
    [questions, value],
  );

  const id = useId();

  const onCommit = useCallback(() => {
    _onCommit(value);
  }, [_onCommit, value]);

  const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(stateValue => ({ ...stateValue, name: e.target.value }));
  }, []);

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
          value={value.name}
          onChange={onNameChange}
          className="input input-primary"
        />
      </div>
      <div data-testid="question-list">{questionElements}</div>
      <div>
        <button onClick={onCommit}>回答する</button>
      </div>
    </form>
  );
};
