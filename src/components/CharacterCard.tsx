import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import videos for predefined characters
import mayaVideo from '../../assets/maya_egypt_animated.mp4';
import acerVideo from '../../assets/acer_animated.mp4';
import laniVideo from '../../assets/lani_animated.mp4';
import niaVideo from '../../assets/nia_animated.mp4';

interface CharacterCardProps {
  id: string;
  name: string;
  intro: string;
  imageUrl: string;
  storyId: string;
}

const characterVideos: Record<string, string> = {
  maya: mayaVideo,
  acer: acerVideo,
  lani: laniVideo,
  nia: niaVideo,
};

const CharacterCard: React.FC<CharacterCardProps> = ({ id, name, intro, imageUrl, storyId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const characterName = name.toLowerCase();
  const hasVideo = characterName in characterVideos;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && hasVideo) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && hasVideo) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/story/${storyId}`} className="block h-full">
        <div className="bg-[#FFF5E6] rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-orange-200 flex flex-col h-full">
          <div className="p-6 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-orange-500 shadow-lg">
              {hasVideo ? (
                <video 
                  ref={videoRef}
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover"
                  style={{ display: isHovered ? 'block' : 'none' }}
                >
                  <source src={characterVideos[characterName]} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : null}
              <img 
                src={imageUrl || 'https://via.placeholder.com/128'} 
                alt={name} 
                className="w-full h-full object-cover"
                style={{ display: !isHovered || !hasVideo ? 'block' : 'none' }}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-primary font-poppins text-center">{name}</h3>
            <p className="text-gray-600 text-md text-center mb-4 font-semibold">{intro}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CharacterCard;