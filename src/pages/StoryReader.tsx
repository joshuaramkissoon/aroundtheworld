import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Heart } from 'lucide-react'
import { useStories } from '../context/StoryContext'

const StoryReader: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { toggleFavorite, fetchStory } = useStories()
  const [story, setStory] = useState<any>(null)

  useEffect(() => {
    if (id) {
      fetchStory(id).then(setStory)
    }
  }, [id, fetchStory])

  if (!story) {
    return <div className="text-center text-2xl text-text-light">Loading story...</div>
  }

  const renderers = {
    img: ({ src, alt }: { src: string; alt: string }) => (
      <img src={src} alt={alt} className="rounded-lg my-4 max-w-full h-auto" />
    ),
    video: ({ src }: { src: string }) => (
      <video src={src} controls className="rounded-lg my-4 max-w-full h-auto" />
    ),
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
      <h1 className="text-4xl font-bold mb-4 text-primary">{story.title}</h1>
      <button
        onClick={() => toggleFavorite(story.id)}
        className={`flex items-center ${
          story.isFavorite ? 'text-accent' : 'text-text-light'
        } hover:text-accent transition duration-300 text-lg mb-6`}
      >
        <Heart className="mr-2" size={24} />
        {story.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <div className="prose max-w-none text-lg leading-relaxed">
        <ReactMarkdown components={renderers}>{story.content}</ReactMarkdown>
      </div>
    </div>
  )
}

export default StoryReader