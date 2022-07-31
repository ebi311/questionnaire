export type Answer = {
  questionnaireId: string;
  answer: string | string[];
};

export type QuestionnaireAnswer = { name: string; answers: Answer[] };
