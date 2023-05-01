import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import SpotifyLogin from './pages/SpotifyLogin'
import UserLogin from './pages/UserLogin'
import UserHomepage from './pages/UserHomepage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SpotifyLogin />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/homepage" element={<UserHomepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
