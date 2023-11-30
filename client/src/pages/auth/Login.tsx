import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className=' lg:flex lg:justify-between w-screen  h-screen '>
      <div
        className='absolute h-screen w-screen bg-black/90 lg:w-[30vw]
                  lg:bg-transparent lg:flex p-20 items-center justify-center
                  lg:static'
      >
        <form className='flex-col '>
          <label htmlFor='' className='text-gray-200 text-lg '>
            Email
          </label>
          <br />
          <input
            type='text'
            className='bg-[#262626] appearance-none  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
          />
          <br />
          <br />
          <label htmlFor='' className='text-gray-200 text-lg '>
            Password
          </label>
          <input
            type='password'
            className='bg-[#262626] appearance-none  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
          />
          <br />
          <br />
          <button className='bg-purple-900 text-[#A149FA]  hover:text-white py-2 rounded  w-full text-lg'>
            Log in
          </button>
          <br />
          <br />
          <Link to='/signup'>
            <p className='text-gray-500   ml-auto w-full text-right hover:underline hover:text-white'>
              Don't have acount
            </p>
          </Link>
        </form>
      </div>
      <div className='w-screen lg:w-[80vw] h-screen bg-cover login-artwork bg-black '></div>
    </div>
  );
}
