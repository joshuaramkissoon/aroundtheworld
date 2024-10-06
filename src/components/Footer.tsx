import React from 'react'
import { Heart } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-cream-100 text-orange-600 p-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-lg flex items-center justify-center">
          Made with <Heart className="mx-1 text-orange-500" size={20} color="orange"/>
        </p>
        <p className="text-sm mt-2">Explore, learn, and have fun!</p>
      </div>
    </footer>
  )
}

export default Footer