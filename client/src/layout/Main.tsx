import { Outlet } from 'react-router-dom';
import Navbar from '../components/Main/Navbar';

export default function Main() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
