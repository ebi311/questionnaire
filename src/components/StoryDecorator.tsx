import React, { useEffect } from 'react';

type Props = {
  Story: React.FC;
};

export const StoryDecorator: React.FC<Props> = ({ Story }) => {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);
  return (
    <>
      <div data-testid="light" data-theme="light" className="p-4">
        <Story />
      </div>
      <div data-testid="dark" data-theme="dark" className="p-4">
        <Story />
      </div>
    </>
  );
};
