import { NextPage } from 'next';
import { QuestionnaireForm } from '~/components/pageParts/QuestionnaireForm';
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

export default Page;
