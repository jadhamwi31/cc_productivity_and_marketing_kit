import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Video from './pages/Video/Video';
import Home from './pages/Home';
import Main from './layout/Main';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Dashboard from './layout/Dashboard';
import DashboardMain from './pages/Dashboard/DashboardMain';
import GraphicEditor from './pages/Dashboard/GraphicEditor';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from './stores/auth.store';

export default function App() {
  const { username } = useAuthStore();

  return (
    <>
      <ToastContainer
        position='bottom-right'
        newestOnTop
        hideProgressBar
        rtl={false}
        autoClose={2000}
        draggable={false}
        theme='colored'
      />
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <>
              <Route path='/' element={<Main />}>
                <Route index element={<Home />} />
                <Route
                  path='login'
                  element={!username ? <Login /> : <Navigate to='/dashboard' />}
                />
                <Route
                  path='signup'
                  element={!username ? <Signup /> : <Navigate to='/dashboard' />}
                />
              </Route>

              <Route
                path='/dashboard'
                element={username ? <Dashboard /> : <Navigate to='/login' />}
              >
                <Route index element={<DashboardMain />} />
                <Route path='graphic' element={<GraphicEditor />} />
                <Route path='video' element={<Video />} />
              </Route>
            </>,
          ),
        )}
      />
    </>
  );
}
