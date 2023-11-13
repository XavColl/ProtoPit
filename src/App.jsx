import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Game from './pages/Game'
import { userLoader } from './loaders'

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/ProtoPit/" element={<Home />} />,
    <Route path="/ProtoPit/dashboard" loader={userLoader} element={<Dashboard />} />,
    <Route path="/ProtoPit/game" loader={userLoader} element={<Game />} />,
  </Route>
))

function App() {

  return <RouterProvider router={router}  />
}

export default App
