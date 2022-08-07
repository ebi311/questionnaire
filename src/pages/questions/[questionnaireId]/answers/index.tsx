import { NextPage } from 'next';
import { useCallback } from 'react';
import { QuestionnaireForm } from '~/components/pageParts/QuestionnaireForm';
import { QuestionnaireAnswer } from '~/models/answer';
import { Question } from '~/models/question';
import stringify from 'json-stable-stringify';

const fetchAnswers = async (answer: QuestionnaireAnswer) =>
  fetch(`/api/questionnaires/q001/answers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: stringify(answer),
  });

type Props = {
  questions: Question[];
};

const Answer: NextPage<Props> = props => {
  const { questions } = props;

  const onCommit = useCallback(async (args: QuestionnaireAnswer) => {
    await fetchAnswers(args);
  }, []);

  return <QuestionnaireForm questions={questions} onCommit={onCommit} />;
};

export default Answer;
