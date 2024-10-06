import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, BookOpen } from 'lucide-react'
import { useStories } from '../context/StoryContext'

const Favorites: React.FC = () => {
  const { stories } = useStories()
  const favoriteStories = stories.filter((story) => story.isFavorite)

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Your Favorite Stories</h1>
      {favoriteStories.length === 0 ? (
        <div className="text-center">
          <p className="text-2xl text-text-light mb-4">You haven't added any stories to your favorites yet.</p>
          <Link to="/stories" className="btn-primary">
            <BookOpen className="mr-2" />
            Explore Stories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteStories.map((story) => (
            <Link
              key={story.id}
              to={`/story/${story.id}`}
              className="card"
            >
              <img src={story.coverImage} alt={story.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-primary">{story.title}</h2>
                <p className="text-text-light mb-2">{story.country}</p>
                <p className="text-text mb-4">{story.description.substring(0, 100)}...</p>
                <div className="flex items-center text-accent">
                  <Heart className="mr-2" size={20} />
                  <span>Favorite</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites