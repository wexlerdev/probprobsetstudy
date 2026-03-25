import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Problem1 from './pages/Problem1'
import Problem2 from './pages/Problem2'
import Problem3 from './pages/Problem3'
import Problem4 from './pages/Problem4'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/problem-1" element={<Problem1 />} />
      <Route path="/problem-2" element={<Problem2 />} />
      <Route path="/problem-3" element={<Problem3 />} />
      <Route path="/problem-4" element={<Problem4 />} />
    </Routes>
  )
}
