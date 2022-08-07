export type Answer = {
  questionId: string;
  answer: string | string[];
};

export type QuestionnaireAnswer = { name: string; answers: Answer[] };
