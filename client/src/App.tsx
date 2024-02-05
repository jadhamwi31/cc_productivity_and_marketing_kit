import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from './stores/auth.store';

import DahsboardCahnnelLayout from './layout/DahsboardCahnnelLayout';
import EmptyLayout from './layout/EmptyLayout';
import Main from './layout/Main';
import Settings from './pages/Dashboard/Settings';
import SocialMedia from './pages/Dashboard/SocialMedia';
import ReportPage from './pages/Dashboard/Youtube/ReportPage';
import VideoDetails from './pages/Dashboard/Youtube/VideoDetails';
import VideosPage from './pages/Dashboard/Youtube/VideosPage';
import Home from './pages/Home';
import { cleanupCall } from './utils/utils';

import Dashboard from './layout/Dashboard';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import DashboardMain from './pages/Dashboard/DashboardMain';
import GraphicEditor from './pages/Dashboard/GraphicEditor';
import Video from './pages/Video/Video';

export default function App() {
  const { user } = useAuthStore();
  useEffect(() => {
    window.addEventListener('beforeunload', cleanupCall);
  }, []);
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
                <Route path='login' element={!user ? <Login /> : <Navigate to='/dashboard' />} />
                <Route path='signup' element={!user ? <Signup /> : <Navigate to='/dashboard' />} />
              </Route>

              <Route path='/dashboard' element={user ? <Dashboard /> : <Login />}>
                <Route index={false} element={<DahsboardCahnnelLayout />}>
                  <Route index element={<DashboardMain />} />
                  <Route path='report/:id' element={<ReportPage />} />
                </Route>

                <Route path='graphic' element={<GraphicEditor />} />
                <Route path='socialmedia' element={<EmptyLayout />}>
                  <Route index element={<SocialMedia />} />
                  <Route path=':id' element={<VideosPage />} />
                </Route>

                <Route path='video' element={<Video />} />

                <Route path='settings' element={<Settings />} />
                <Route path='VideoDetails/:id' element={<VideoDetails />} />
              </Route>
            </>,
          ),
        )}
      />
    </>
  );
}
