import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe } from 'lucide-react';
import { useStories } from '../context/StoryContext';
import ReadingTimePill from '../components/ReadingTimePill';
import { Input, InputGroup, InputLeftElement, Box, Button, Flex, Text } from '@chakra-ui/react';
import { FaGlobeAmericas } from "react-icons/fa";

const StoryList: React.FC = () => {
  const { stories } = useStories();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (story.story_metadata?.country?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box className="bg-cream-100 min-h-screen p-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center text-[#5D4037] font-nunito leading-tight">
        Start exploring!
      </h1>
      <Box className="mb-8 relative w-full max-w-lg mx-auto flex items-center">
        <InputGroup size="lg" className="flex-grow mr-4">
          <InputLeftElement pointerEvents="none">
            <Search className="text-primary-light" size={20} />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Where's your next adventure?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            borderRadius="full"
            borderColor="orange.500"
            _focus={{ borderColor: 'orange.700', boxShadow: '0 0 0 1px orange.700' }}
          />
        </InputGroup>
      </Box>
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStories.map((story) => (
          <Link
            key={story.id}
            to={`/story/${story.id}`}
            state={{ story }}
            className="card transform hover:scale-105 transition duration-300 rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-orange-200 bg-[#FFF5E6] flex flex-col h-full"
          >
            <Box className="p-6 flex-grow bg-[#FFF5E6]">
              <img 
                src={story.thumbnail_url || 'default-thumbnail.jpg'} 
                alt={story.title} 
                className="rounded-lg w-full mb-4 h-48 object-cover" 
              />
              <h2 className="text-2xl font-semibold mb-2 text-primary font-poppins">{story.title}</h2>
              <Flex justifyContent="space-between" alignItems="center" mt="auto">
              {story.story_metadata && story.story_metadata.country && (
                  <Flex alignItems="center" className="text-sm text-gray-600">
                    <FaGlobeAmericas className="mr-1 text-orange-500" />
                    <Text fontWeight="semibold" color="orange.500">{story.story_metadata.country}</Text>
                  </Flex>
                )}
                <ReadingTimePill text={story.content} />
              </Flex>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default StoryList;
