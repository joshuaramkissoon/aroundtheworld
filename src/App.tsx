import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import StoryList from './pages/StoryList'
import StoryReader from './pages/StoryReader'
import { StoryProvider } from './context/StoryContext'
import { ChakraProvider } from '@chakra-ui/react'

const App: React.FC = () => {
  return (
    <ChakraProvider>
    <StoryProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-cream-100">
          <Header />
          <main className="flex-grow" py-8>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stories" element={<StoryList />} />
              <Route path="/story/:id" element={<StoryReader />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </StoryProvider>
    </ChakraProvider>
  )
}

export default App