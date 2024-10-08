import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { FaBook } from 'react-icons/fa';

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 150; // Adjusted for younger readers
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

interface ReadingTimePillProps {
  text: string;
}

const ReadingTimePill: React.FC<ReadingTimePillProps> = ({ text }) => {
  const readingTime = calculateReadingTime(text);

  return (
    <Box
      display="flex"
      alignItems="center"
      bg="purple.100"
      color="purple.800"
      px={2}
      py={1}
      borderRadius="full"
      fontSize={['xs', 'sm', 'md']}
      whiteSpace="nowrap"
    >
      <FaBook style={{ marginRight: '0.5em' }} />
      <Text>{readingTime} min read</Text>
    </Box>
  );
}

export default ReadingTimePill;
