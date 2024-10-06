import React from 'react';
import { Link } from 'react-router-dom'; // Add this import

interface StorySnippetProps {
  id: string;
  title: string;
  content: string;
  mediaUrl: string;
  mediaType: 'video' | 'image';
  country: string;
}

const StorySnippet: React.FC<StorySnippetProps> = ({ id, title, content, mediaUrl, mediaType, country }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
      <div className="w-full md:w-1/2">
        {mediaType === 'video' ? (
          <video 
            className="w-full h-auto rounded-lg shadow-lg"
            controls
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img 
            src={mediaUrl} 
            alt={title} 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        )}
      </div>
      <div className="w-full md:w-1/2 text-left">
        <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: '"Nunito", "Arial", sans-serif', color: '#3E2723' }}>
          {title}
        </h3>
        <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-orange-800 bg-primary rounded-full">
          {country}
        </div>
        <div style={{ 
          fontFamily: '"Comic Sans MS", "Chalkboard SE", "Arial", sans-serif',
          fontSize: '1.25rem',
          lineHeight: '1.8',
          color: '#5D4037'
        }}>
          <p>{content}</p>
        </div>
        <Link to={`/story/${id}`} className="inline-block mt-4 px-6 py-2 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors">
          Read more
        </Link>
      </div>
    </div>
  );
};

export default StorySnippet;