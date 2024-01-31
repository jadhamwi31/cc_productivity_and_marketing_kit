import { MdOutlineDashboard } from 'react-icons/md';
import { RiSettings4Line } from 'react-icons/ri';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';

import { IoVideocamOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import React from 'react';
import octopus from '../../assets/Small.webp';
import useAuthStore from '../../stores/auth.store';

const Navbar = () => {
  const { logout } = useAuthStore();
  const menus = [
    { name: 'Dashboard', link: '', icon: MdOutlineDashboard },
    { name: 'Accounts', link: 'socialmedia', icon: AiOutlineUser },
    { name: 'Graphic', link: 'graphic', icon: MdOutlineAddPhotoAlternate, margin: true },
    { name: 'Video', link: 'video', icon: IoVideocamOutline },
    { name: 'Setting', link: 'settings', icon: RiSettings4Line, margin: true },
  ];

  return (
    <section className='flex z-50  gap-6 dashboard-navbar'>
      <div className='fixed top-0 left-0 h-screen bg-black border-r-[1px] border-New_Gray w-16 text-gray-100'>
        <div className='mt-4 flex flex-col gap-4 relative' id='main-nav'>
          <img src={octopus} alt='' className='pl-2 pr-1' />

          {menus?.map((menu, i) => (
            <NavLink
              to={menu?.link}
              key={i}
              end
              className={` ${
                menu?.margin && 'mt-5'
              } group flex items-center  p-2 hover:border-l-2 hover:border-[#70358A] hover:pl-1.5 `}
            >
              <div className=' px-4'>{React.createElement(menu?.icon, { size: '20' })}</div>
              <h2 className='absolute  left-48 bg-white  whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit '>
                {menu?.name}
              </h2>
            </NavLink>
          ))}
        </div>

        <button
          className=' hover:text-[#70358A] absolute bottom-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2
'
          onClick={() => {
            logout();
          }}
        >
          <FiLogOut size='20' />
        </button>
      </div>
    </section>
  );
};

export default Navbar;
