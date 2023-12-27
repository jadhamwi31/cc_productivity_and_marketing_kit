import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from './stores/auth.store';

import Home from './pages/Home';
import Main from './layout/Main';
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
                  user ? (
                    <Suspense fallback={<Loading />}>
                      <Dashboard />
                    </Suspense>
                  ) : (
                    <Navigate to='/login' />
                  )
                }
              >
                <Route index element={<DashboardMain />} />
                <Route
                  path='graphic'
                  element={
                    <Suspense fallback={<Loading />}>
                      <GraphicEditor />
                    </Suspense>
                  }
                />
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
