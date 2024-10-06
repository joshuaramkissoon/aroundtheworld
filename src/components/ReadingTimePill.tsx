import React from 'react';
import { Box, Text, HStack } from '@chakra-ui/react';
import { FaBookOpen } from 'react-icons/fa';

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
      borderWidth="2px"
      borderColor="purple.300"
      borderRadius="full"
      px={3}
      py={1}
      bg="purple.100"
      display="inline-flex"
      alignItems="center"
    >
      <HStack spacing={2}>
        <FaBookOpen color="#6B46C1" />
        <Text fontSize="sm" fontWeight="bold" color="purple.700">
          {readingTime <= 1 ? "Quick read!" : `${readingTime} min read`}
        </Text>
      </HStack>
    </Box>
  );
}

export default ReadingTimePill;