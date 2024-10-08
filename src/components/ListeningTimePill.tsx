import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { FaHeadphones } from 'react-icons/fa';

interface ListeningTimePillProps {
  durationInSeconds: number;
}

const ListeningTimePill: React.FC<ListeningTimePillProps> = ({ durationInSeconds }) => {
  const minutes = Math.ceil(durationInSeconds / 60);

  return (
    <Box
      display="flex"
      alignItems="center"
      bg="teal.100"
      color="teal.800"
      px={2}
      py={1}
      borderRadius="full"
      fontSize={['xs', 'sm', 'md']}
      whiteSpace="nowrap"
    >
      <FaHeadphones style={{ marginRight: '0.5em' }} />
      <Text>{minutes} min listen</Text>
    </Box>
  );
}

export default ListeningTimePill;
