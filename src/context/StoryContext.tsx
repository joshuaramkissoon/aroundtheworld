import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Story {
  id: string
  title: string
  content: string
  isFavorite: boolean
  thumbnail_url: string // Add this line
}

interface StoryContextType {
  stories: Story[]
  toggleFavorite: (id: string) => void
  fetchStory: (id: string) => Promise<Story>
}

const StoryContext = createContext<StoryContextType | undefined>(undefined)

export const useStories = () => {
  const context = useContext(StoryContext)
  if (!context) {
    throw new Error('useStories must be used within a StoryProvider')
  }
  return context
}

interface StoryProviderProps {
  children: ReactNode
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
if (API_BASE_URL === '') {
  throw new Error('VITE_API_BASE_URL is not set')
}

export const StoryProvider: React.FC<StoryProviderProps> = ({ children }) => {
  const [stories, setStories] = useState<Story[]>([])

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/published-stories`)
      const data = await response.json()
      const storiesWithFavorites = data.map((story: Story) => ({
        ...story,
        isFavorite: false,
        thumbnail_url: story.thumbnail_url || '' // Add this line
      }))
      setStories(storiesWithFavorites)
    } catch (error) {
      console.error('Error fetching stories:', error)
    }
  }

  const fetchStory = async (id: string): Promise<Story> => {
    try {
      const response = await fetch(`${API_BASE_URL}/published-stories/${id}`)
      const data = await response.json()
      return { ...data, isFavorite: stories.find(s => s.id === id)?.isFavorite || false }
    } catch (error) {
      console.error('Error fetching story:', error)
      throw error
    }
  }

  const toggleFavorite = (id: string) => {
    setStories((prevStories) =>
      prevStories.map((story) =>
        story.id === id ? { ...story, isFavorite: !story.isFavorite } : story
      )
    )
  }

  return (
    <StoryContext.Provider value={{ stories, toggleFavorite, fetchStory }}>
      {children}
    </StoryContext.Provider>
  )
}