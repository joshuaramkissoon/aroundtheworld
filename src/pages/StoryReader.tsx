import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useStories } from '../context/StoryContext';
import { Box, Spinner, Center, Button, VStack, HStack } from '@chakra-ui/react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import ReadingTimePill from '../components/ReadingTimePill';
import ListeningTimePill from '../components/ListeningTimePill';
import CustomVideoComponent from '../components/CustomVideoComponent';
import CustomImageComponent from '../components/CustomImageComponent';
import AudioPlayer from '../components/AudioPlayer';
import { Narration } from '../types/Narration';
import { FaHeadphones } from 'react-icons/fa';
import { getAudioDurationEstimate } from '../utils/audioUtils';
import { API_BASE_URL } from '../context/StoryContext';

const StoryReader: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { fetchStory } = useStories();
  const [story, setStory] = useState(location.state?.story);
  const [narrations, setNarrations] = useState<Narration[]>(story?.narrations || []);
  const [isAudioPlayerVisible, setIsAudioPlayerVisible] = useState(false);
  const [minNarrationDuration, setMinNarrationDuration] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const calculateMinNarrationDuration = async (narrations: Narration[]) => {
      if (narrations.length > 0) {
        const minDuration = Math.min(
          ...(await Promise.all(
            narrations.map(async (n: Narration) => {
              return await getAudioDurationEstimate(n.audio_url);
            })
          ))
        );
        setMinNarrationDuration(minDuration);
      }
    };

    if (story) {
      calculateMinNarrationDuration(narrations);
    } else if (id) {
      const getStory = async () => {
        try {
          const fetchedStory = await fetchStory(id);
          setStory(fetchedStory);
          const response = await fetch(`${API_BASE_URL}/published-stories/${id}/narrations`);
          if (response.ok) {
            const fetchedNarrations = await response.json();
            setNarrations(fetchedNarrations);
            calculateMinNarrationDuration(fetchedNarrations);
          }
        } catch (error) {
          console.error('Error fetching story or narrations:', error);
        }
      };
      getStory();
    }
  }, [story, id, fetchStory, narrations]);

  const handleStartListening = () => {
    setIsAudioPlayerVisible(true);
  };

  if (!story) {
    return (
      <Center height="100vh">
        <Spinner thickness="2px" speed="0.65s" emptyColor="gray.100" color="orange.500" size="xl" />
      </Center>
    );
  }

  const customMarkdownStyles = {
    backgroundColor: '#FFF5E6', // Pastel light cream background
    color: '#5D4037', // Darker pastel brown for text
    fontSize: '1.25rem',
    lineHeight: '1.8',
    fontFamily: '"Comic Sans MS", "Chalkboard SE", "Arial", sans-serif',
    padding: '1rem', // Reduced from 2rem to 1rem
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
    <div className="max-w-4xl mx-auto shadow-md p-4 rounded-b-xl">
      <div className="relative w-full pb-[75%] mb-6 overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-xl">
        <img 
          src={story.thumbnail_url || 'default-thumbnail.jpg'} 
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      
      <VStack spacing={4} align="stretch" mb={6}>
        <HStack spacing={2} justify="flex-start" flexWrap="wrap">
          <ReadingTimePill text={story.content} />
          {minNarrationDuration !== null && (
            <ListeningTimePill durationInSeconds={minNarrationDuration} />
          )}
        </HStack>
        
        {narrations.length > 0 && !isAudioPlayerVisible && (
          <Button
            leftIcon={<FaHeadphones />}
            colorScheme="orange"
            onClick={handleStartListening}
            width="full"
            color="orange.800"
            fontSize={['sm', 'md']}
          >
            Listen to this story
          </Button>
        )}
      </VStack>

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

      {isAudioPlayerVisible && narrations.length > 0 && (
        <AudioPlayer narration={narrations[0]} title={story.title} />
      )}
    </div>
  );
};

export default StoryReader;
