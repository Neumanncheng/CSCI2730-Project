import React, { useState } from 'react';

export const Tabs = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className="tabs">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            active: child.props.value === activeTab,
            onClick: () => setActiveTab(child.props.value),
          });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList = ({ children, className }) => {
  return <div className={`flex space-x-4 ${className}`}>{children}</div>;
};

export const TabsTrigger = ({ value, onClick, active, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${active ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children, active }) => {
  return active ? <div className="tab-content">{children}</div> : null;
};