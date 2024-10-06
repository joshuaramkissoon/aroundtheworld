import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Book } from 'lucide-react';
import { useStories } from '../context/StoryContext';

const StoryList: React.FC = () => {
  const { stories } = useStories();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-lightBlue min-h-screen p-8">
      <h1 className="text-5xl font-bold mb-6 text-center text-primary font-nunito">
        Explore Exciting Stories!
      </h1>
      <div className="mb-8 relative w-full max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search stories by title..."
          className="input pl-12 text-lg w-full rounded-full border-2 border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light shadow-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-3 text-primary-light" size={24} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStories.map((story) => (
          <Link
            key={story.id}
            to={`/story/${story.id}`}
            className="card transform hover:scale-105 hover:shadow-lg transition duration-300 rounded-lg overflow-hidden bg-white shadow-md"
          >
            <div className="p-6">
              <img src={story.thumbnail} alt={story.title} className="rounded-lg w-full mb-4 h-48 object-cover" />
              <h2 className="text-2xl font-semibold mb-2 text-primary font-poppins">{story.title}</h2>
              <p className="text-text-light mb-4 flex items-center text-base font-poppins">
                <Book className="mr-2" size={20} />
                Read Story
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StoryList;
