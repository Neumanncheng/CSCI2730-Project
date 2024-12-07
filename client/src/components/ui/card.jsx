// components/ui/card.jsx

import React from 'react';

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return (
    <div className="bg-gray-200 px-4 py-2">
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

export const CardTitle = ({ children }) => {
  return <h3 className="text-lg font-semibold">{children}</h3>;
};