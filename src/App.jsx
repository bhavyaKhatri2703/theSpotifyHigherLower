import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ArtistsImages from './components/ArtistsImages/ArtistsImages'

function App() {
  const [count, setCount] = useState(0)

  return (
   <ArtistsImages/>
  )
}

export default App
