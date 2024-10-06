import React from 'react'
import { Link } from 'react-router-dom'
import { Globe, BookOpen, Heart } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold flex items-center">
          <Globe className="mr-2 text-secondary" size={36} />
          <span className="text-white">World</span>
          <span className="text-accent">Stories</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/stories" className="flex items-center hover:text-secondary transition duration-300">
                <BookOpen className="mr-1" size={24} />
                <span className="text-lg">Stories</span>
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="flex items-center hover:text-secondary transition duration-300">
                <Heart className="mr-1" size={24} />
                <span className="text-lg">Favorites</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header