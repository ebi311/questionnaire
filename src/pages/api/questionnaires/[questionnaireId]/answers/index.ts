import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { postAnswer } from '~/data/answers';
import { QuestionnaireAnswer } from '~/models/answer';

const app = nc<NextApiRequest, NextApiResponse>();

app.post(async (req, res) => {
  const body = req.body as QuestionnaireAnswer;
  const id = nanoid();
  const { questionnaireId } = req.query;
  await postAnswer(questionnaireId as string, id, body);
  res.json({ id });
});

export default app;
