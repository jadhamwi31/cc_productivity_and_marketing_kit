import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Video from './pages/Video/Video';
import Home from './pages/Home';
import Main from './layout/Main';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';

export default function App() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route path='/' element={<Main />}>
              <Route index element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
            </Route>
            <Route path='/video' element={<Video />} />
          </>,
        ),
      )}
    />
  );
}
