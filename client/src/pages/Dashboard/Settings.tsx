import React, { useState } from 'react';
import { toast } from 'react-toastify';
export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('All Fields are Required ');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New Passwords must match');
      return;
    }
    setLoading(true);
    const response = await fetch('/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    });

    setLoading(false);
    const data = await response.json();
    if (response.ok) {
      toast.success(data?.message);
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div className='px-8 min-h-screen'>
      <h1 className='text-4xl my-10 mb-14 font-bold'>Change Password</h1>

      <form onSubmit={handleSubmit} className='flex flex-col  h-full w-[50vw] mx-auto  p-5 '>
        <label htmlFor='old'>Old Password</label>
        <input
          value={oldPassword}
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
          required
          type='password'
          id='old'
          className='bg-[#262626] appearance-none mb-4  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-[#262626] focus:border-2 border-2  border-[#262626] focus:border-purple-500'
        />
        <label htmlFor='new'>New Password</label>
        <input
          required
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          type='password'
          id='new'
          className='bg-[#262626] appearance-none mb-4  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-[#262626] focus:border-2 border-2  border-[#262626] focus:border-purple-500'
        />
        <label htmlFor='c_new'>Confirm Password</label>
        <input
          required
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          type='password'
          id='c_new'
          className='bg-[#262626] appearance-none mb-4  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-[#262626] focus:border-2 border-2  border-[#262626] focus:border-purple-500'
        />
        <button
          type='submit'
          className='bg-purple-900 text-[#A149FA] mb-4 text-center hover:text-white py-2 rounded  w-full text-md disabled:cursor-not-allowed'
          disabled={loading}
        >
          {loading ? 'Loading' : 'Change'}
        </button>
      </form>
    </div>
  );
}
