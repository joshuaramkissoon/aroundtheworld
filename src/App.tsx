import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import StoryList from './pages/StoryList'
import StoryReader from './pages/StoryReader'
import Favorites from './pages/Favorites'
import { StoryProvider } from './context/StoryContext'

function App() {
  return (
    <StoryProvider>
      <Router>
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stories" element={<StoryList />} />
              <Route path="/story/:id" element={<StoryReader />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </StoryProvider>
  )
}

export default App