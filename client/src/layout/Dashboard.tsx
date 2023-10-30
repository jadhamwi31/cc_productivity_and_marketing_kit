import { Outlet } from 'react-router-dom';
import Navbar from '../components/Dashboard/Navbar';
import Header from '../components/Dashboard/Header';

export default function Dashboard() {
  return (
    <div className='flex'>
      <Navbar />
      <div className='ml-16 overflow-hidden w-[calc(100vw-4rem)] text-white'>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
