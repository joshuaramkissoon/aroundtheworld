import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useStories } from '../context/StoryContext';
import ReadingTimePill from '../components/ReadingTimePill';
import LoadingModal from '../components/LoadingModal';
import { Input, InputGroup, InputLeftElement, Box, Button, Flex, Text } from '@chakra-ui/react';
import { FaGlobeAmericas, FaRandom } from "react-icons/fa";
import { motion, useAnimation, useMotionValue, PanInfo } from 'framer-motion';

// Add this new component for the country pill
const CountryPill: React.FC<{ country: string; isSelected: boolean; onClick: () => void }> = ({ country, isSelected, onClick }) => (
  <motion.div
    className={`inline-flex items-center px-4 py-2 rounded-full font-semibold text-sm mr-3 mb-2 cursor-pointer whitespace-nowrap ${
      isSelected ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-800'
    }`}
    style={{ maxWidth: '200px' }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <Text isTruncated>{country}</Text>
  </motion.div>
);

const StoryList: React.FC = () => {
  const { stories } = useStories();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStory, setLoadingStory] = useState<any>(null);

  // Remove the fetchStories effect since it's already handled in the context

  // Extract unique countries and sort them alphabetically
  const uniqueCountries = useMemo(() => {
    const countries = stories
      .map(story => story.story_metadata?.country)
      .filter((country): country is string => !!country);
    return Array.from(new Set(countries)).sort((a, b) => a.localeCompare(b));
  }, [stories]);

  const filteredStories = stories.filter((story) =>
    (story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (story.story_metadata?.country?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)) &&
    (selectedCountries.length === 0 || selectedCountries.includes(story.story_metadata?.country ?? ''))
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const animateCarousel = () => {
      controls.start({
        x: [0, -uniqueCountries.length * 150],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: uniqueCountries.length * 10,
            ease: "linear",
          },
        },
      });
    };
    animateCarousel();
  }, [controls, uniqueCountries]);

  const handleCountryClick = (country: string) => {
    setSelectedCountries(prev =>
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const containerWidth = container.offsetWidth;
    const contentWidth = content.scrollWidth;
    const padding = 100; // Add padding to prevent the last pill from touching the edge

    let newX = x.get() + info.offset.x;
    const maxDrag = Math.max(0, contentWidth - containerWidth + padding);
    newX = Math.max(-maxDrag, Math.min(0, newX));

    controls.start({ x: newX, transition: { type: 'spring', stiffness: 300, damping: 30 } });
  };

  const handleSurpriseMe = () => {
    if (filteredStories.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredStories.length);
      const randomStory = filteredStories[randomIndex];
      setLoadingStory(randomStory);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate(`/story/${randomStory.id}`, { state: { story: randomStory } });
      }, 2000);
    }
  };

  return (
    <Box className="bg-cream-100 min-h-screen p-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center text-[#5D4037] font-nunito leading-tight">
        Start exploring!
      </h1>

      {/* Country carousel */}
      <Box className="mb-8 relative overflow-hidden" ref={containerRef} style={{ height: '60px' }}>
        <motion.div
          ref={contentRef}
          className="flex absolute"
          style={{ x, width: `${uniqueCountries.length * 150}px` }}
          drag="x"
          dragConstraints={containerRef}
          onDragEnd={handleDragEnd}
        >
          {uniqueCountries.map((country, index) => (
            <CountryPill
              key={`${country}-${index}`}
              country={country}
              isSelected={selectedCountries.includes(country)}
              onClick={() => handleCountryClick(country)}
            />
          ))}
        </motion.div>
        <Box
          className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream-100 to-transparent pointer-events-none"
          style={{ zIndex: 10 }}
        />
        <Box
          className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream-100 to-transparent pointer-events-none"
          style={{ zIndex: 10 }}
        />
      </Box>

      {/* Search input and Surprise me button */}
      <Box className="mb-8 relative w-full max-w-lg mx-auto flex flex-col items-center">
        <InputGroup size="lg" className="w-full mb-4">
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
        <Button
          leftIcon={<FaRandom />}
          onClick={handleSurpriseMe}
          colorScheme="orange"
          variant="solid"
          size="lg"
          width="full"
          borderRadius="full"
          className="transition duration-300 ease-in-out transform hover:scale-105"
        >
          Surprise me!
        </Button>
      </Box>

      {/* Story grid */}
      {stories.length > 0 ? (
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <Link
              key={story.id}
              to={`/story/${story.id}`}
              state={{ story }}
              className="card transform hover:scale-105 transition duration-300 rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-orange-200 bg-[#FFF5E6] flex flex-col h-full"
            >
              <Box className="p-6 flex-grow bg-[#FFF5E6]">
                <Box className="relative w-full pb-[75%] mb-4">
                  <img 
                    src={story.thumbnail_url || 'default-thumbnail.jpg'} 
                    alt={story.title} 
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" 
                  />
                </Box>
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
      ) : (
        <Box className="text-center mt-8">
          <Text fontSize="xl">Loading stories...</Text>
        </Box>
      )}

      {/* Loading Modal */}
      <LoadingModal
        isOpen={isLoading}
        onClose={() => setIsLoading(false)}
        thumbnailUrl={loadingStory?.thumbnail_url}
        title={loadingStory?.title}
        country={loadingStory?.story_metadata?.country}
      />
    </Box>
  );
};

export default StoryList;