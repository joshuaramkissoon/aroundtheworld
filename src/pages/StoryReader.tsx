import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useStories } from '../context/StoryContext';
import { AspectRatio, Box, Spinner, Center } from '@chakra-ui/react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import ReadingTimePill from '../components/ReadingTimePill';

interface CustomVideoComponentProps {
  children?: React.ReactNode;
  src?: string;
  [key: string]: any;
}

const CustomVideoComponent: React.FC<CustomVideoComponentProps> = ({ children, ...props }) => {
  let src = props.src;
  console.log(props);
  console.log(src);

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
    <AspectRatio maxW="640px" ratio={4 / 3} margin="1rem auto 3rem" borderRadius="md">
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

interface CustomImageComponentProps {
  src: string;
  alt: string;
}

const CustomImageComponent: React.FC<CustomImageComponentProps> = ({ src, alt }) => (
  <img src={src} alt={alt} className="rounded-lg my-4 max-w-full h-auto" />
);

const StoryReader: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { toggleFavorite, fetchStory } = useStories();
  const [story, setStory] = useState(location.state?.story);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    if (!story && id) {
      const getStory = async () => {
        try {
          const fetchedStory = await fetchStory(id);
          setStory(fetchedStory);
        } catch (error) {
          console.error('Error fetching story:', error);
          // Handle error (e.g., show error message to user)
        }
      };
      getStory();
    }
  }, [story, id, fetchStory]);

  if (!story) {
    return (
      <Center height="100vh">
        <Spinner
          thickness="2px"
          speed="0.65s"
          emptyColor="gray.100"
          color="orange.500"
          size="xl"
        />
      </Center>
    );
  }

  const customMarkdownStyles = {
    backgroundColor: '#FFF5E6', // Pastel light cream background
    color: '#5D4037', // Darker pastel brown for text
    fontSize: '1.25rem',
    lineHeight: '1.8',
    fontFamily: '"Comic Sans MS", "Chalkboard SE", "Arial", sans-serif',
    padding: '2rem',
    borderRadius: '8px',
    '& h1, & h2, & h3, & h4, & h5, & h6': {
      fontFamily: '"Nunito", "Arial", sans-serif',
      color: '#3E2723', // Darker shade for headings
      marginTop: '1.5em',
      marginBottom: '0.5em',
    },
    '& p': {
      marginBottom: '1.2em',
    },
    '& a': {
      color: '#D84315', // Darker pastel orange for links
      textDecoration: 'underline',
    },
    '& ul, & ol': {
      paddingLeft: '2em',
      marginBottom: '1.2em',
    },
    '& li': {
      marginBottom: '0.5em',
    },
    '& blockquote': {
      borderLeft: '4px solid #795548', // Darker pastel brown for blockquote border
      paddingLeft: '1em',
      fontStyle: 'italic',
      color: '#4E342E', // Slightly darker than main text for contrast
    },
    '& code': {
      backgroundColor: '#FFECB3', // Light pastel yellow for code background
      color: '#4E342E', // Darker pastel brown for code text
      padding: '0.2em 0.4em',
      borderRadius: '3px',
      fontSize: '0.9em',
    },
  };

  return (
    <div className="max-w-4xl mx-auto shadow-md p-8 rounded-b-xl">
      <div className="relative w-full pb-[75%] mb-6 overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-xl">
        <img 
          src={story.thumbnail_url || 'default-thumbnail.jpg'} 
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        {/* <button
          onClick={() => toggleFavorite(story.id)}
          className={`flex items-center ${
            story.isFavorite ? 'text-accent' : 'text-text-light'
          } hover:text-accent transition duration-300 text-lg`}
        >
          <Heart className="mr-2" size={24} />
          {story.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button> */}
        <ReadingTimePill text={story.content} />
      </Box>
      <div className="prose max-w-none">
        <MarkdownPreview
          source={story.content}
          style={{ backgroundColor: 'transparent', ...customMarkdownStyles }}
          components={{
            img: CustomImageComponent as any,
            video: CustomVideoComponent as any,
          }}
        />
      </div>
    </div>
  );
};

export default StoryReader;