import React, { PropsWithChildren, useEffect } from 'react';

export const StoryDecorator: React.FC<PropsWithChildren> = props => {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);
  return (
    <>
      <div data-testid="light" data-theme="light" className="p-4">
        {props.children}
      </div>
      <div data-testid="dark" data-theme="dark" className="p-4">
        {props.children}
      </div>
    </>
  );
};
