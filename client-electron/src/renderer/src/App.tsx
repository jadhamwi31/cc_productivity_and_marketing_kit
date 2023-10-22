import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import Video from './pages/Video/Video'
import Home from './pages/Home'

export default function App() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route path="/" element={<Video />} />
            <Route path="/video" element={<Video />} />
          </>
        )
      )}
    />
  )
}
