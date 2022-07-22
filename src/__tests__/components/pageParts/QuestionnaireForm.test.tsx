/**
 * @jest-environment jsdom
 */
import React from 'react';
import { QuestionnaireForm } from '~/components/pageParts/QuestionnaireForm';
import { render as _render } from '@testing-library/react';
import '@testing-library/jest-dom';

const render = () => _render(<QuestionnaireForm></QuestionnaireForm>);

test('input name', () => {
  const target = render();
  const nameInput = target.getByLabelText('respondent');
  expect(nameInput).toBeInTheDocument();
});
