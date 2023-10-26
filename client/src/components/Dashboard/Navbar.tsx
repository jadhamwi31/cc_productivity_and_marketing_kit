import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import octopus from '../../assets/octopus.webp';
import {
  RiHomeLine,
  RiAppsLine,
  RiTapeLine,
  RiSettings4Line,
  RiArtboard2Line,
} from 'react-icons/ri';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  const handleCheckboxChange = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className='fixed top-0 z-10 flex w-full text-white bg-New_Gray flex-col  border-gray-800 lg:bottom-0 lg:z-auto lg:w-56 lg:border-b-0 '>
      <div className='flex h-14 items-center px-4 py-4 lg:h-auto'>
        <NavLink
          to='/dashboard'
          className='group flex w-full items-center gap-x-2.5'
          onClick={close}
        >
          <div className='relative z-30  flex'>
            <img src={octopus} className='w-12 h-12' alt='' />
            <div className=' z-10 text-xl p-2'>CreatorsYard</div>
          </div>
        </NavLink>

        <input
          type='checkbox'
          name='hamburger'
          id='hamburger'
          className='peer invisible'
          hidden
          checked={isOpen}
          onChange={handleCheckboxChange}
        />
        <label
          htmlFor='hamburger'
          className='peer-checked:hamburger relative z-10 -mr-6 block cursor-pointer p-6 lg:hidden'
        >
          <div
            aria-hidden='true'
            className='m-auto h-0.5 w-6 rounded bg-white transition duration-300'
          ></div>
          <div
            aria-hidden='true'
            className='m-auto mt-2 h-0.5 w-6 rounded bg-white transition duration-300'
          ></div>
        </label>
      </div>
      <div
        className={clsx('overflow-y-auto lg:static lg:block', {
          'fixed inset-x-0 bottom-0 top-14 mt-px': isOpen,
          hidden: !isOpen,
        })}
      >
        <nav className='space-y-6 py-5 bg-New_Gray h-full '>
          <div>
            <NavLink
              end
              onClick={close}
              to=''
              className='flex text-xl border-l-emerald-500 border-l-4 items-center p-2 gap-3'
            >
              <RiHomeLine size={25} /> <span className='pt-2'>Home</span>
            </NavLink>

            <NavLink
              end
              onClick={close}
              to=''
              className='flex text-xl border-l-emerald-500 border-l-4 items-center p-2 gap-3'
            >
              <RiAppsLine size={25} />
              <span className='pt-2'> Discover</span>
            </NavLink>
            <NavLink
              end
              onClick={close}
              to=''
              className='flex text-xl border-l-emerald-500 border-l-4 items-center p-2 gap-3'
            >
              <RiTapeLine size={25} />
              <span className='pt-2'> Video Editing</span>
            </NavLink>
            <NavLink
              end
              onClick={close}
              to=''
              className='flex text-xl border-l-emerald-500 border-l-4 items-center p-2 gap-3'
            >
              <RiArtboard2Line size={25} />
              <span className='pt-2'> Photo Editing</span>
            </NavLink>

            <NavLink
              end
              onClick={close}
              to=''
              className='flex text-xl border-l-emerald-500 border-l-4 items-center p-2 gap-3 absolute bottom-0'
            >
              <RiSettings4Line size={25} />
              <span className='pt-2'> Setting</span>
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
}
