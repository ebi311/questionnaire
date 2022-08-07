import { GetServerSideProps, NextPage } from 'next';
import { useCallback } from 'react';
import { QuestionnaireForm } from '~/components/pageParts/QuestionnaireForm';
import { QuestionnaireAnswer } from '~/models/answer';
import { Question } from '~/models/question';
import stringify from 'json-stable-stringify';
import { getQuestionnaire } from '~/data/questionnaires';

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

  return (
    <div className="mx-auto my-1 w-fit">
      <QuestionnaireForm questions={questions} onCommit={onCommit} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const { questionnaireId } = context.query;
  const questions = await getQuestionnaire(questionnaireId as string);
  return { props: { questions } };
};

export default Answer;
