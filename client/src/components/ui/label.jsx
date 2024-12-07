import React from 'react';

export const Label = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="font-medium">
      {children}
    </label>
  );
};