import { GetServerSideProps, NextPage } from 'next';
import { QuestionnaireForm } from '~/components/pageParts/QuestionnaireForm';
import { getAnswer } from '~/data/answers';
import { getQuestionnaire } from '~/data/questionnaires';
import { QuestionnaireAnswer } from '~/models/answer';
import { Question } from '~/models/question';

type Props = {
  questions: Question[];
  answer: QuestionnaireAnswer;
};

const Page: NextPage<Props> = props => {
  const { questions, answer } = props;
  return (
    <QuestionnaireForm
      questions={questions}
      answer={answer}
      onCommit={() => {
        //
      }}
    />
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const { questionnaireId, answerId } = context.query;
  const questionnaire = await getQuestionnaire(questionnaireId as string);
  const answer = await getAnswer(answerId as string);

  return {
    props: {
      questions: questionnaire,
      answer,
    },
  };
};

export default Page;
