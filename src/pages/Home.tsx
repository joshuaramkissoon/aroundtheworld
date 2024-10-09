import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import aroundtheworld from '../../public/aroundtheworldnobackground.jpeg'
import Logo from '../components/Logo'
import StorySnippet from '../components/StorySnippet'
import { useEffect, useState } from 'react'
import CharacterCard from '../components/CharacterCard'
import { API_BASE_URL } from '../context/StoryContext'

interface Character {
  id: string;
  name: string;
  image_url: string | null;
  intro: string;
  meta: {
    description: string;
    age: number;
    country: string;
    favorite_activity: string;
  } | null;
}

const characterToStoryMap: Record<string, string> = {
  'acer': '2d91534d-324f-49f4-914b-88f4971de7b7',
  'maya': '72929f59-2f3b-41b6-8060-1da436adce79',
  'lani': 'f16d055a-bf97-4a97-aa6f-6addbe2f857d',
  'nia': 'f669ba07-f8e2-4a07-bcbc-931117819ec1'
};

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    const fetchCharacters = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/characters`);
        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }
        const data: Character[] = await response.json();
        // Shuffle the array and select 3 random characters
        const shuffled = data.sort(() => 0.5 - Math.random());
        setCharacters(shuffled.slice(0, 3));
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  const storySnippets = [
    {
      id: "c473218a-09dc-489f-81dc-41777592ed0d",
      title: "Izzy The Curious Scarlet Ibis",
      content: "Izzy the Ibis stretched her wings in the early morning sunlight that filtered through the mangroves of Caroni Swamp. Her feathers, a mix of soft pink and white, ruffled in the gentle breeze. Izzy wasn't like the other adult Scarlet Ibises with their bright red plumage. She was young and still growing, but that didn't stop her from dreaming big.",
      mediaUrl: "https://v2.fal.media/files/b2b03f76519a43e49621e5d898662209_output.mp4",
      mediaType: "video" as const,
      country: "Trinidad and Tobago"
    },
    {
      id: "8013f8da-6b62-4221-8502-92f84538a5f6",
      title: "Kanga's Big Adventure",
      content: "Meet Kanga, a bright-eyed young kangaroo with a small backpack and a big dream. Kanga had lived all her life in the Eastern Highlands of Australia, but she longed to explore the vast and diverse landscapes of her homeland. With a spring in her step and curiosity in her heart, Kanga set off on an adventure that would take her across the entire continent!",
      mediaUrl: "https://fal.media/files/penguin/r5VwW6nLFg3I4grpq-j-7.png",
      mediaType: "image" as const,
      country: "Australia"
    },
    {
      id: "02901d09-d958-4e48-b7b1-ea968e6d7d4f",
      title: "The Jaguar's Secret",
      content: "Before they could respond, a deep rumble echoed through the forest. \"What was that?\" Maya whispered, moving closer to Diego. From the shadows emerged a magnificent jaguar, its coat shimmering with black rosettes. \"I am Jaguar, protector of the rainforest,\" it said in a low, powerful voice.",
      mediaUrl: "https://v2.fal.media/files/d67d2b4183d74c8699b24b476124ebc6_output.mp4",
      mediaType: "video" as const,
      country: "Guatemala"
    }
  ];

  return (
    <div className="text-center min-h-screen p-4 sm:p-8">
      {/* <h1 className="text-5xl font-bold mb-6 text-primary">
        <span className="inline-block animate-fade-in-up">Welcome to</span>{' '}
        <Logo className="text-5xl inline-block animate-scale-in" />
      </h1> */}
      <img 
        src={aroundtheworld} 
        alt="Kids reading" 
        className="rounded-2xl mx-auto max-w-3xl w-full h-auto mb-12"
      />
      <h2 className="text-3xl font-bold mb-4">
        <span className="bg-gradient-to-r from-red-300 via-red-400 via-orange-400 to-orange-600 text-transparent bg-clip-text">
          Ready for a World of Wonder? ✨
        </span>
      </h2>
      <p className="text-xl mb-8" style={{ color: '#5D4037' }}>
        Join us on a magical journey around the world, where your imagination meets real-life wonders and cultures!
      </p>
      <div className="flex justify-center space-x-4 mb-12">
        <Link
          to="/stories"
          className="btn-primary flex items-center bg-gradient-to-r from-orange-200 to-orange-400 text-white"
        >
          <MapPin className="mr-2" />
          Start Your Journey
        </Link>
      </div>

      {/* Character preview section */}
      <div className="max-w-6xl mx-auto mt-12 p-4 sm:p-8 rounded-lg" style={{ backgroundColor: '#FFF5E6' }}>
        <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: '"Nunito", "Arial", sans-serif', color: '#3E2723' }}>
          Adventure awaits!
        </h2>
        <p className="text-2xl mb-6 text-left" style={{ color: '#5D4037' }}>
          Click on one of your pals to see what adventures await! 🚀
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              id={character.id}
              name={character.name}
              intro={character.intro}
              imageUrl={character.image_url || ''}
              storyId={characterToStoryMap[character.name.toLowerCase()] || ''}
            />
          ))}
        </div>
      </div>

      {/* Story preview section */}
      <div className="max-w-4xl mx-auto p-4 sm:p-8 rounded-lg" style={{ backgroundColor: '#FFF5E6' }}>
        <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: '"Nunito", "Arial", sans-serif', color: '#3E2723' }}>
          Meet our furry (and feathery) friends
        </h2>
        {storySnippets.map((snippet, index) => (
          <StorySnippet key={index} {...snippet} />
        ))}
      </div>
    </div>
  )
}

export default Home