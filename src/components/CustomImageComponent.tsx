import React from 'react';

interface CustomImageComponentProps {
  src: string;
  alt: string;
}

const CustomImageComponent: React.FC<CustomImageComponentProps> = ({ src, alt }) => (
  <img src={src} alt={alt} className="rounded-lg my-4 max-w-full h-auto" />
);

export default CustomImageComponent;