import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <span className={`font-bold ${className}`}>
      <span className="bg-gradient-to-r from-blue-200 via-orange-200 to-purple-200 text-transparent bg-clip-text">
        World Adventures
      </span>
    </span>
  );
};

export default Logo;