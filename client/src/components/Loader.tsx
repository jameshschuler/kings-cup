import React from 'react';

interface LoaderProps {
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <div className="loader">
      <p>{text || 'Loading...'}</p>
    </div>
  );
};

export default Loader;
