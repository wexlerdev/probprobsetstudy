import { Routes, Route } from 'react-router-dom'
import { DifficultyProvider } from './components/DifficultyContext'
import Nav from './components/Nav'
import Home from './pages/Home'
import Problem1 from './pages/unit_four/Problem1'
import Problem2 from './pages/unit_four/Problem2'
import Problem3 from './pages/unit_four/Problem3'
import Problem4 from './pages/unit_four/Problem4'
import U5Problem1 from './pages/unit_five/Problem1'
import U5Problem2 from './pages/unit_five/Problem2'
import U5Problem3 from './pages/unit_five/Problem3'
import U5Problem4 from './pages/unit_five/Problem4'
import U6Problem1 from './pages/unit_six/Problem1'
import U6Problem2 from './pages/unit_six/Problem2'
import U6Problem3 from './pages/unit_six/Problem3'

export default function App() {
  return (
    <DifficultyProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Unit 4: PS4 Proof Walkthroughs */}
        <Route path="/unit-4/problem-1" element={<Problem1 />} />
        <Route path="/unit-4/problem-2" element={<Problem2 />} />
        <Route path="/unit-4/problem-3" element={<Problem3 />} />
        <Route path="/unit-4/problem-4" element={<Problem4 />} />
        {/* Unit 5: PS5 Proof Walkthroughs */}
        <Route path="/unit-5/problem-1" element={<U5Problem1 />} />
        <Route path="/unit-5/problem-2" element={<U5Problem2 />} />
        <Route path="/unit-5/problem-3" element={<U5Problem3 />} />
        <Route path="/unit-5/problem-4" element={<U5Problem4 />} />
        {/* Unit 6: PS6 Proof Walkthroughs */}
        <Route path="/unit-6/problem-1" element={<U6Problem1 />} />
        <Route path="/unit-6/problem-2" element={<U6Problem2 />} />
        <Route path="/unit-6/problem-3" element={<U6Problem3 />} />
      </Routes>
    </DifficultyProvider>
  )
}
