import React from 'react'
import { Heart } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-100 text-blue-800 p-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-lg flex items-center justify-center">
          Made with <Heart className="mx-1 text-pink-500" size={20} /> by WorldAdventures
        </p>
        <p className="text-sm mt-2">Explore, Learn, and Have Fun!</p>
      </div>
    </footer>
  )
}

export default Footer