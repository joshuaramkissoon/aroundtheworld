import React from 'react';
import { AspectRatio } from '@chakra-ui/react';

interface CustomVideoComponentProps {
  children?: React.ReactNode;
  src?: string;
  [key: string]: any;
}

const CustomVideoComponent: React.FC<CustomVideoComponentProps> = ({ children, ...props }) => {
  let src = props.src;

  if (!src && children) {
    const sourceElement = React.Children.toArray(children).find(
      (child): child is React.ReactElement => React.isValidElement(child) && child.props && 'src' in child.props
    );
    if (sourceElement) {
      src = sourceElement.props.src;
    }
  }

  if (!src) {
    console.warn('CustomVideoComponent: Video source is empty or undefined.');
    return null;
  }

  return (
    <AspectRatio maxW="640px" ratio={4 / 3} margin="0rem auto 6rem" borderRadius="md">
      <video
        controls
        autoPlay
        muted
        playsInline
        loop
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
        {...props}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </AspectRatio>
  );
};

export default CustomVideoComponent;