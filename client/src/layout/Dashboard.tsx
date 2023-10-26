import { Outlet } from 'react-router-dom';
import Navbar from '../components/Dashboard/Navbar';
import Header from '../components/Dashboard/Header';

export default function Dashboard() {
  return (
    <div className='bg-black h-screen overflow-y-scroll bg_grid pb-36'>
      <Navbar />
      <div className=' lg:pl-60 '>
        <div className='mx-auto max-w-8xl space-y-8 px-2 pt-20 lg:pt-10  text-white'>
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
