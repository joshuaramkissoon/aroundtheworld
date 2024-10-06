import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Sparkles } from 'lucide-react'

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-6 text-primary">Welcome to WorldStories!</h1>
      <p className="text-2xl mb-8 text-text-light">Explore amazing stories about nature and animals from different countries!</p>
      <div className="flex justify-center space-x-4">
        <Link
          to="/stories"
          className="btn-primary flex items-center"
        >
          <MapPin className="mr-2" />
          Start Your Journey
        </Link>
        <Link
          to="/favorites"
          className="btn-secondary flex items-center"
        >
          <Sparkles className="mr-2" />
          Your Favorites
        </Link>
      </div>
      <img src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Kids reading" className="mt-12 rounded-2xl shadow-xl mx-auto max-w-3xl" />
    </div>
  )
}

export default Home