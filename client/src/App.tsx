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

import Main from './layout/Main';
import Home from './pages/Home';
import Loading from './pages/Loading';
import SocialMedia from './pages/Dashboard/SocialMedia';
import VideosPage from './pages/Dashboard/Youtube/VideosPage';
import ReportPage from './pages/Dashboard/Youtube/ReportPage';
import EmptyLayout from './layout/EmptyLayout';
import DahsboardCahnnelLayout from './layout/DahsboardCahnnelLayout';
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
                    <Suspense fallback={<Loading />}>
                      <Login />
                    </Suspense>
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
              </Route>
            </>,
          ),
        )}
      />
    </>
  );
}
