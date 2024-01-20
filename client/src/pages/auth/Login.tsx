import { Link } from 'react-router-dom';

import yard from '../../assets/artworks/yard.svg';

import useAuthStore from '../../stores/auth.store';
import React,{ useRef } from 'react';

export default function Login() {
  const { login, error, loading } = useAuthStore();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const usernameValue = usernameRef.current?.value || '';
    const passwordValue = passwordRef.current?.value || '';

    await login(usernameValue, passwordValue);
  };

  return (
    <div className=' lg:flex lg:justify-between w-screen  h-screen grad '>
      <div
        className='absolute h-screen w-screen bg-black/60 backdrop-blur-md lg:w-[30vw] z-20
                  lg:bg-transparent lg:flex p-20 items-center justify-center
                  lg:static'
      >
        <form className='flex-col ' onSubmit={handleSubmit}>
          <p className='text-gray-400 text-l mb-20 '>
            <span className='text-white font-bold'>Welcome Back !</span> We're thrilled to see you
            again. Your journey continues here. Please enter your credentials to access your account
            and explore all the amazing features awaiting you
          </p>
          <label htmlFor='' className='text-gray-200 text-md '>
            Username
          </label>
          <input
            required
            type='text'
            ref={usernameRef}
            className='bg-[#262626] appearance-none mb-4  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-[#262626] focus:border-2 border-2  border-[#262626] focus:border-purple-500'
          />
          <label htmlFor='' className='text-gray-200 text-md '>
            Password
          </label>
          <input
            required
            type='password'
            ref={passwordRef}
            className='bg-[#262626] appearance-none mb-4  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-[#262626] focus:border-2 border-2  border-[#262626] focus:border-purple-500'
          />
          <button
            className='bg-purple-900 text-[#A149FA] mb-4  hover:text-white py-2 rounded  w-full text-md disabled:cursor-not-allowed'
            disabled={loading}
          >
            {loading ? 'loading' : 'Log in '}
          </button>
          <Link to='/signup'>
            <p className='text-gray-500   ml-auto w-full text-right hover:underline hover:text-white'>
              Don't have an account
            </p>
          </Link>
          {error ? <p className='text-red-500 text-center mt-3 absolute'>{error}</p> : ''}
        </form>
      </div>

      <div className='relative'>
        <div
          className='lg:absolute w-screen lg:w-[70vw] h-screen bg-cover lg:z-10'
          style={{
            backgroundImage: `url(${yard})`,
          }}
        ></div>

        <div
          className='lg:block hidden w-screen lg:w-[70vw] h-screen bg-cover blur-xl'
          style={{
            backgroundImage: `url(${yard})`,
          }}
        ></div>
      </div>
    </div>
  );
}
