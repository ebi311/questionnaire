import { useCallback, useId, useMemo } from 'react';
import { Control, Controller, FieldErrors, useForm } from 'react-hook-form';
import { Answer, QuestionnaireAnswer } from '~/models/answer';
import { MultipleChoice, Question, SingleChoice } from '~/models/question';
import { CheckboxSelector } from '../commonParts/CheckboxSelector';
import { RadioSelector } from '../commonParts/RadioSelector';
import { TextArea } from '../commonParts/TextArea';

const getAnswerControl: {
  [key in Question['type']]: (props: {
    q: Question;
    control: Control;
    index: number;
    errors: FieldErrors<QuestionnaireAnswer>;
  }) => JSX.Element;
} = {
  multiple: ({ q, control, index, errors }) => (
    <Controller
      control={control}
      name={`answers[${index}].answer`}
      rules={{
        required: '1つ以上選択してください。',
      }}
      render={({ field: { value, name, onChange } }) => {
        return (
          <>
            <CheckboxSelector
              choices={(q as MultipleChoice).choices}
              value={value}
              onChange={v => {
                onChange(v);
              }}
              name={name}
            />
            {errors.answers?.[index] ? (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.answers?.[index]?.answer?.message}
                </span>
              </label>
            ) : null}
          </>
        );
      }}
    />
  ),
  single: ({ q, control, index, errors }) => (
    <Controller
      control={control}
      name={`answers[${index}].answer`}
      rules={{ required: '1つ選択してください。' }}
      render={({ field: { value, name, onChange } }) => (
        <>
          <RadioSelector
            choices={(q as SingleChoice).choices}
            name={name}
            value={value}
            onChange={v => {
              onChange(v);
            }}
          />
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.answers?.[index]?.answer?.message}
            </span>
          </label>
        </>
      )}
    />
  ),
  text: ({ control, index, errors }) => (
    <Controller
      control={control}
      name={`answers[${index}].answer`}
      rules={{ required: '入力してください。' }}
      render={({ field: { value, name, onChange } }) => (
        <>
          <TextArea
            name={name}
            value={value}
            onChange={onChange}
            label="100文字以内"
          />
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.answers?.[index]?.answer?.message}
            </span>
          </label>
        </>
      )}
    />
  ),
};

const createQuestionElement = (
  q: Question,
  control: Control,
  value: QuestionnaireAnswer,
  errors: FieldErrors<QuestionnaireAnswer>,
) => {
  const index = value.answers.findIndex(a => a.questionId === q.id);
  if (index === -1) {
    throw new Error('Answer not found');
  }
  const Element = getAnswerControl[q.type];
  return (
    <div key={q.id}>
      <p>{q.question}</p>
      <Element control={control} index={index} q={q} errors={errors} />
    </div>
  );
};

type Props = {
  questions: Question[];
  answer?: QuestionnaireAnswer;
  onCommit: (arg: QuestionnaireAnswer) => void;
};

const initAnswers = (q: Question[]): QuestionnaireAnswer => {
  const answers: Answer[] = q.map(q => ({
    answer: q.type === 'multiple' ? [] : '',
    questionId: q.id,
  }));
  return { name: '', answers };
};

export const QuestionnaireForm = (props: Props) => {
  const { questions, answer, onCommit: _onCommit } = props;
  const { register, getValues, trigger, formState, control, watch } = useForm({
    defaultValues: answer || initAnswers(questions),
  });

  const value = watch();

  const questionElements = useMemo(
    () =>
      questions.map(q =>
        createQuestionElement(
          q,
          control as unknown as Control,
          value,
          formState.errors,
        ),
      ),
    [questions, control, value, formState.errors],
  );

  const id = useId();

  const onCommit = useCallback(async () => {
    const valid = await trigger();
    if (!valid) return;
    const value = getValues();
    _onCommit(value);
  }, [_onCommit, getValues, trigger]);

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
          {...register('name', { required: true })}
        />
        {formState.errors.name ? (
          <label htmlFor={id} className="label">
            <span className="label-text text-error">
              回答者氏名を入力してください。
            </span>
          </label>
        ) : null}
      </div>
      <div data-testid="question-list">{questionElements}</div>
      <div>
        <button
          type="button"
          onClick={onCommit}
          className="btn btn-primary btn-wide"
        >
          回答する
        </button>
      </div>
    </form>
  );
};
