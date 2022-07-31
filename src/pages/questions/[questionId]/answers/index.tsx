import { NextPage } from 'next';
import { QuestionnaireForm } from '~/components/pageParts/QuestionnaireForm';
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

export default Answer;
