export type Questionnaire = {
  id: string;
  questions: {
    type: 'single' | 'multiple' | 'text';
    choices: {
      value: string;
      displayValue: string;
    }[];
  };
};
