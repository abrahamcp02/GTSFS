import React from 'react';

const ContentSection = ({ title, children }) => {
  return (
    <div style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default ContentSection;
