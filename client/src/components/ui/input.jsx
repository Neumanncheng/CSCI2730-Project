// components/ui/input.jsx

import React from 'react';

export const Input = ({ id, type = 'text', value, onChange, placeholder }) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};