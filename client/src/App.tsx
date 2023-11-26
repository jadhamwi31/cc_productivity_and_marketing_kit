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
import Dashboard from './layout/Dashboard';
import DashboardMain from './pages/Dashboard/DashboardMain';
import GraphicEditor from './pages/Dashboard/GraphicEditor';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <ToastContainer
        position='bottom-right'
        newestOnTop
        hideProgressBar
        rtl={false}
        autoClose={2000}
        draggable={false}
        theme='coloredss'
      />
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <>
              <Route path='/' element={<Main />}>
                <Route index element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<Signup />} />
              </Route>

              <Route path='/dashboard' element={<Dashboard />}>
                <Route index element={<DashboardMain />} />
                <Route path='graphic' element={<GraphicEditor />} />
              </Route>
              <Route path='/video' element={<Video />} />
            </>,
          ),
        )}
      />{' '}
    </>
  );
}
