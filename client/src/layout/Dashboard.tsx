import { Outlet } from 'react-router-dom';
import Navbar from '../components/Dashboard/Navbar';

export default function Dashboard() {
  return (
    <div className='bg-black h-screen overflow-y-scroll bg_grid pb-36'>
      <Navbar />
      <div className='p-2 lg:pl-72 '>
        <div className='mx-auto max-w-8xl space-y-8 px-2 pt-20 lg:px-0 lg:py-8 text-white'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
