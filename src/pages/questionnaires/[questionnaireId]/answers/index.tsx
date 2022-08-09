import { GetServerSideProps, NextPage } from 'next';
import { useCallback } from 'react';
import { QuestionnaireForm } from '~/components/pageParts/QuestionnaireForm';
import { QuestionnaireAnswer } from '~/models/answer';
import { Question } from '~/models/question';
import stringify from 'json-stable-stringify';
import { getQuestionnaire } from '~/data/questionnaires';
import { useRouter } from 'next/router';

const fetchAnswers = async (
  answer: QuestionnaireAnswer,
  questionnaireId: string,
) =>
  fetch(`/api/questionnaires/${questionnaireId}/answers/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: stringify(answer),
  });

type Props = {
  questions: Question[];
};

const Page: NextPage<Props> = props => {
  const { questions } = props;

  const { query } = useRouter();

  const onCommit = useCallback(
    async (args: QuestionnaireAnswer) => {
      await fetchAnswers(args, query.questionnaireId as string);
    },
    [query.questionnaireId],
  );

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

export default Page;
