import React, { lazy, Suspense } from 'react';
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
import Loading from './pages/Loading';
const Signup = lazy(() => import('./pages/auth/Signup'));
const Video = lazy(() => import('./pages/Video/Video'));
const Login = lazy(() => import('./pages/auth/Login'));
const Dashboard = lazy(() => import('./layout/Dashboard'));
const GraphicEditor = lazy(() => import('./pages/Dashboard/GraphicEditor'));
const DashboardMain = lazy(() => import('./pages/Dashboard/DashboardMain'));

export default function App() {
  const { user } = useAuthStore();

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
                  element={
                    !user ? (
                      <Suspense fallback={<Loading />}>
                        <Login />
                      </Suspense>
                    ) : (
                      <Navigate to='/dashboard' />
                    )
                  }
                />
                <Route
                  path='signup'
                  element={
                    !user ? (
                      <Suspense fallback={<Loading />}>
                        <Signup />
                      </Suspense>
                    ) : (
                      <Navigate to='/dashboard' />
                    )
                  }
                />
              </Route>

              <Route
                path='/dashboard'
                element={
                  <Suspense fallback={<Loading />}>
                    <Dashboard />
                  </Suspense>
                }
              >
                <Route index={false} element={<DahsboardCahnnelLayout />}>
                  <Route index element={<DashboardMain />} />
                  <Route path='report/:id' element={<ReportPage />} />
                </Route>

                <Route
                  path='graphic'
                  element={
                    <Suspense fallback={<Loading />}>
                      <GraphicEditor />
                    </Suspense>
                  }
                />
                <Route path='socialmedia' element={<EmptyLayout />}>
                  <Route index element={<SocialMedia />} />
                  <Route path=':id' element={<VideosPage />} />
                </Route>

                <Route
                  path='video'
                  element={
                    <Suspense fallback={<Loading />}>
                      <Video />
                    </Suspense>
                  }
                />

                <Route
                  path='settings'
                  element={
                    <Suspense fallback={<Loading />}>
                      <Settings />
                    </Suspense>
                  }
                />
                <Route
                  path='VideoDetails/:id'
                  element={
                    <Suspense fallback={<Loading />}>
                      <VideoDetails />
                    </Suspense>
                  }
                />
              </Route>
            </>,
          ),
        )}
      />
    </>
  );
}
