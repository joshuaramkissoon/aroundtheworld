import React from 'react'
import { Link } from 'react-router-dom'
import { Book, Star } from 'lucide-react'
import Logo from './Logo'

const Header: React.FC = () => {
  return (
    <header className="bg-cream-100 p-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl flex items-center">
          <Logo />
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/stories" className="flex items-center text-orange-300 hover:text-orange-500 transition duration-300">
                <Book className="mr-1" size={24} />
                <span className="text-lg">Stories</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/favorites" className="flex items-center text-orange-200 hover:text-orange-500 transition duration-300">
                <Star className="mr-1" size={24} />
                <span className="text-lg">Favorites</span>
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header