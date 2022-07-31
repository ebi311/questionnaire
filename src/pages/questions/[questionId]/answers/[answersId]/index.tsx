import { NextPage } from 'next';
import { QuestionnaireForm } from '~/components/pageParts/QuestionnaireForm';
import { Question } from '~/models/question';

type Props = {
  questions: Question[];
};

const Answer: NextPage<Props> = props => {
  const { questions } = props;
  return (
    <>

        <div>
            <div>好きな果物は？</div>
            <ul>
                <li><input type="checkbox" id="checkbox" /></li>
                <li><input type="checkbox" id="checkbox" /></li>
                <li><input type="checkbox" id="checkbox" /></li>
            </ul>
        </div>
        <div>
            <div>苦手な野菜は？</div>
            <ul>
                <li><input type="radio" id="checkbox" /></li>
                <li><input type="radio" id="checkbox" /></li>
                <li><input type="radio" id="checkbox" /></li>
            </ul>
        </div>
      {/* <QuestionnaireForm
        questions={questions}
        onCommit={() => {
          /** */
        }}
      /> */}
    </>
  );
};

export default Answer;
