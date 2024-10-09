import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <span className={`font-bold ${className}`}>
      <span className="bg-gradient-to-r from-red-300 via-red-400 via orange-400 to-orange-600 text-transparent bg-clip-text">
        World Adventures
      </span>
    </span>
  );
};

export default Logo;