import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import aroundtheworld from '../../public/aroundtheworldnobackground.jpeg'
import Logo from '../components/Logo'
import StorySnippet from '../components/StorySnippet'

const Home: React.FC = () => {
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
      <h1 className="text-5xl font-bold mb-6 text-primary">
        <span className="inline-block animate-fade-in-up">Welcome to</span>{' '}
        <Logo className="text-5xl inline-block animate-scale-in" />
      </h1>
      <img 
        src={aroundtheworld} 
        alt="Kids reading" 
        className="rounded-2xl mx-auto max-w-3xl w-full h-auto mb-12"
      />
      <p className="text-2xl mb-8" style={{ color: '#5D4037' }}>
        Join amazing animal pals on exciting journeys and discover the wonders of wildlife from all corners of the globe!
      </p>
      <div className="flex justify-center space-x-4 mb-12">
        <Link
          to="/stories"
          className="btn-primary flex items-center text-orange-800"
        >
          <MapPin className="mr-2 text-orange-800" />
          Start Your Journey
        </Link>
      </div>

      {/* Story preview section */}
      <div className="max-w-4xl mx-auto p-4 sm:p-8 rounded-lg" style={{ backgroundColor: '#FFF5E6' }}>
        <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: '"Nunito", "Arial", sans-serif', color: '#3E2723' }}>
          Meet Your Pals!
        </h2>
        {storySnippets.map((snippet, index) => (
          <StorySnippet key={index} {...snippet} />
        ))}
      </div>
    </div>
  )
}

export default Home