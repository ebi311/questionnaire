import { GetServerSideProps, NextPage } from 'next';
import { QuestionnaireForm } from '~/components/pageParts/QuestionnaireForm';
import { getQuestions } from '~/data/questions';
import { Question } from '~/models/question';

type Props = {
  questions: Question[];
};

const Answer: NextPage<Props> = props => {
  const { questions } = props;
  return (
    <QuestionnaireForm
      questions={questions}
      onCommit={() => {
        //
      }}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { questionId } = context.query;
  const questions = await getQuestions(questionId);
  console.log(questions);
  return { props: { questions } };
};

export default Answer;
