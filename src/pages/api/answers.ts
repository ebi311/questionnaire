import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { postAnswer } from '~/data/answers';
import { QuestionnaireAnswer } from '~/models/answer';

const app = nc<NextApiRequest, NextApiResponse>();

app.post(async (req, res) => {
  const body = req.body as QuestionnaireAnswer;
  const id = nanoid();
  await postAnswer(id, body);
  res.json({ id });
});

export default app;
