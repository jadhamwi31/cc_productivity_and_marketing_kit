import { Outlet } from 'react-router-dom';
import Navbar from '../components/Dashboard/Navbar';
import Header from '../components/Dashboard/Header';

export default function Dashboard() {
  return (
    <div className='flex'>
      <Navbar />
      <div className='ml-16 overflow-y-scroll text-white text-xl p-5'>
        <Outlet />
      </div>
    </div>
  );
}
