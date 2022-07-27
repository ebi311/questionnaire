type Choice = { value: string; displayValue: string };

export type QuestionBase = {
  /** HTML の name 属性に当たるもの */
  name: string;
  /** 質問 */
  question: string;
};

export type SingleChoice = {
  /** 回答コントロールのタイプ */
  type: 'single';
  /** 選択肢のリスト */
  choices: Choice[];
};

export type MultipleChoice = {
  /** 回答コントロールのタイプ */
  type: 'multiple';
  /** 選択肢のリスト */
  choices: Choice[];
};

export type TextForm = {
  /** 回答コントロールのタイプ */
  type: 'text';
};

export type Question = (SingleChoice | MultipleChoice | TextForm) &
  QuestionBase;
