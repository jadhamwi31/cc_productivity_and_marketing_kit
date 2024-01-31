import { Link } from 'react-router-dom';
import building from '../../assets/artworks/building.svg';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { axios } from '../../lib/axios';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password != confirmPassword) {
      toast.error('Passowrds not Matching');
    } else {
      try {
        await axios.post('/auth/signup', {
          username: userName,
          password: password,
          firstname: firstName,
          lastname: lastName,
          email,
        });
        setEmail('');
        setUserName('');
        setFirstName('');
        setLastName('');
        setConfirmPassword('');
        setPassword('');
        toast.success('New Account has been Created!');
      } catch (error: any) {
        if (Array.isArray(error?.response?.data?.errors)) {
          error.response.data.errors.forEach((err) => toast.error(err.message));
        }
      }
    }
  };

  return (
    <div className='lg:flex lg:justify-between w-screen h-screen grad '>
      <div
        className='absolute h-screen w-screen bg-black/60 backdrop-blur-md lg:w-[30vw] z-20
                  lg:bg-transparent lg:flex p-20 items-center justify-center
                  lg:static'
      >
        <form className='flex-col' onSubmit={handleSubmit}>
          <p className='text-gray-400 text-l mb-20 '>
            <span className='text-white font-bold'> Welcome to CreatorsYard!</span> Exciting
            adventures await as you join our vibrant community. Let's get started and create
            something amazing together!
          </p>
          <label htmlFor='' className='text-gray-200 text-md  '>
            Username
          </label>
          <input
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type='text'
            className='bg-[#262626] appearance-none mb-4  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-[#262626] focus:border-2 border-2  border-[#262626] focus:border-purple-500'
          />
          <div className='flex'>
            <div className='flex flex-col mr-2  w-full'>
              <label htmlFor='' className='text-gray-200 text-md  '>
                First Name
              </label>
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type='text'
                className='bg-[#262626] appearance-none mb-4  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-[#262626] focus:border-2 border-2  border-[#262626] focus:border-purple-500'
              />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor='' className='text-gray-200 text-md  '>
                Last Name
              </label>
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type='text'
                className='bg-[#262626] appearance-none mb-4  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-[#262626] focus:border-2 border-2  border-[#262626] focus:border-purple-500'
              />
            </div>
          </div>

          <label htmlFor='' className='text-gray-200 text-md  '>
            Email
          </label>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#262626] appearance-none mb-4  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-[#262626] focus:border-2 border-2  border-[#262626] focus:border-purple-500'
          />
          <label htmlFor='' className='text-gray-200 text-md '>
            Password
          </label>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            className='bg-[#262626] appearance-none mb-4  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-[#262626] focus:border-2 border-2  border-[#262626] focus:border-purple-500'
          />
          <label htmlFor='' className='text-gray-200 text-md '>
            Confirm Password
          </label>
          <input
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
            className='bg-[#262626] appearance-none mb-4  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-[#262626] focus:border-2 border-2  border-[#262626] focus:border-purple-500'
          />
          <button className='bg-purple-900 text-[#A149FA] mb-4  hover:text-white py-2 rounded  w-full text-md'>
            Sign up
          </button>

          <Link to='/login'>
            <p className='text-gray-500   ml-auto w-full text-right hover:underline hover:text-white'>
              Already have an account
            </p>
          </Link>
        </form>
      </div>
      <div className='relative'>
        <div
          className='lg:absolute w-screen lg:w-[70vw] h-screen bg-cover lg:z-10'
          style={{
            backgroundImage: `url(${building})`,
          }}
        ></div>

        <div
          className='lg:block hidden w-screen lg:w-[70vw] h-screen bg-cover blur-xl'
          style={{
            backgroundImage: `url(${building})`,
          }}
        ></div>
      </div>
    </div>
  );
}
