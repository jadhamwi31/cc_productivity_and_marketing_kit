import React, { useState } from 'react';
import 
import { MdOutlineDashboard } from 'react-icons/md';
import { RiSettings4Line } from 'react-icons/ri';
import { TbReportAnalytics } from 'react-icons/tb';
import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';
import { FiMessageSquare, FiFolder, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const menus = [
    { name: 'dashboard', link: '/', icon: MdOutlineDashboard },
    { name: 'user', link: '/', icon: AiOutlineUser },
    { name: 'messages', link: '/', icon: FiMessageSquare },
    { name: 'analytics', link: '/', icon: TbReportAnalytics, margin: true },
    { name: 'File Manager', link: '/', icon: FiFolder },
    { name: 'Cart', link: '/', icon: FiShoppingCart },
    { name: 'Saved', link: '/', icon: AiOutlineHeart, margin: true },
    { name: 'Setting', link: '/', icon: RiSettings4Line },
  ];

  return (
    <section className='flex   gap-6'>
      <div
        className='fixed top-0 left-0 h-screen bg-New_Gray 
          w-16
      text-gray-100 px-4'
      >
        <div className='mt-4 flex flex-col gap-4 relative'>
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && 'mt-5'
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: '20' })}</div>

              <h2
                className='
                 absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit '
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
