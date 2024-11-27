import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './components/nav'
import Home from './pages/home'
import UserRoute from './routes/useRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
       <UserRoute/>

       </div>
    </>
  )
}

export default App
