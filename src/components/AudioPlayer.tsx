import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Text, Progress, VStack } from '@chakra-ui/react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { Narration } from '../types/Narration';

interface AudioPlayerProps {
  narration: Narration;
  title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ narration, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const getFullAudioUrl = (audioUrl: string) => {
    const bucketName = 'worldadventures-assets';
    return `https://${bucketName}.s3.eu-north-1.amazonaws.com/${audioUrl}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="orange.100"
      p={4}
      boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
      zIndex={1000}
    >
      <audio
        ref={audioRef}
        src={getFullAudioUrl(narration.audio_url)}
        style={{ display: 'none' }}
      />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <IconButton
          aria-label={isPlaying ? 'Pause' : 'Play'}
          icon={isPlaying ? <FaPause /> : <FaPlay />}
          onClick={togglePlayPause}
          colorScheme="orange"
          size="lg"
          borderRadius="full"
        />
        <VStack align="start" spacing={0} ml={4} flex={1}>
          <Text fontWeight="bold" fontSize="xl">
            {title}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {narration.meta.description}
          </Text>
        </VStack>
      </Box>
      <Progress 
        value={progress} 
        colorScheme="orange" 
        size="sm" 
        mt={2}
        borderRadius="full"
      />
    </Box>
  );
};

export default AudioPlayer;
