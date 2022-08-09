import stringify from 'json-stable-stringify';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { QuestionnaireForm } from '~/components/pageParts/QuestionnaireForm';
import { getAnswer } from '~/data/answers';
import { getQuestionnaire } from '~/data/questionnaires';
import { QuestionnaireAnswer } from '~/models/answer';
import { Question } from '~/models/question';

type Props = {
  questions: Question[];
  answer: QuestionnaireAnswer;
};

const fetchAnswers = async (
  answer: QuestionnaireAnswer,
  questionnaireId: string,
  answerId: string,
) =>
  fetch(`/api/questionnaires/${questionnaireId}/answers/${answerId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: stringify(answer),
  });

const Page: NextPage<Props> = props => {
  const { questions, answer } = props;

  const {
    query: { questionnaireId, answerId },
  } = useRouter();

  const onCommit = useCallback(
    async (args: QuestionnaireAnswer) => {
      await fetchAnswers(args, questionnaireId as string, answerId as string);
    },
    [answerId, questionnaireId],
  );

  return (
    <QuestionnaireForm
      questions={questions}
      answer={answer}
      onCommit={onCommit}
    />
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const { questionnaireId, answerId } = context.query;
  const questionnaire = await getQuestionnaire(questionnaireId as string);
  const answer = await getAnswer(questionnaireId as string, answerId as string);

  return {
    props: {
      questions: questionnaire,
      answer,
    },
  };
};

export default Page;
