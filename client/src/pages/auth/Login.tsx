import { Link } from 'react-router-dom';
import building from '../../assets/artworks/building.svg';
import yard from '../../assets/artworks/yard.svg';
import mountain from '../../assets/artworks/mountain.svg';
import useAuthStore from '../../stores/auth.store';
import { useRef } from 'react';

export default function Login() {
  const { login, error } = useAuthStore();

  const images = [building, yard, mountain];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const usernameValue = usernameRef.current?.value || '';
    const passwordValue = passwordRef.current?.value || '';
    console.log(usernameValue, passwordValue);

    await login(usernameValue, passwordValue);
  };

  return (
    <div className=' lg:flex lg:justify-between w-screen  h-screen '>
      <div
        className='absolute h-screen w-screen bg-black/60 backdrop-blur-md lg:w-[30vw] z-20
                  lg:bg-transparent lg:flex p-20 items-center justify-center
                  lg:static'
      >
        <form className='flex-col ' onSubmit={handleSubmit}>
          <label htmlFor='' className='text-gray-200 text-md '>
            Email
          </label>

          <input
            type='text'
            ref={usernameRef}
            className='bg-[#262626] appearance-none mb-4  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
          />

          <label htmlFor='' className='text-gray-200 text-md '>
            Password
          </label>
          <input
            type='password'
            ref={passwordRef}
            className='bg-[#262626] appearance-none mb-4  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
          />

          <button className='bg-purple-900 text-[#A149FA] mb-4  hover:text-white py-2 rounded  w-full text-md'>
            Log in
          </button>

          <Link to='/signup'>
            <p className='text-gray-500   ml-auto w-full text-right hover:underline hover:text-white'>
              Don't have an account
            </p>
          </Link>
          {error ? <pre className='text-red-500 text-center mt-3 absolute'>{error}</pre> : ''}
        </form>
      </div>

      <div className='relative'>
        <div
          className='lg:absolute w-screen lg:w-[70vw] h-screen bg-cover lg:z-10'
          style={{
            backgroundImage: `url(${randomImage})`,
          }}
        ></div>

        <div
          className='lg:block hidden w-screen lg:w-[70vw] h-screen bg-cover blur-xl'
          style={{
            backgroundImage: `url(${randomImage})`,
          }}
        ></div>
      </div>
    </div>
  );
}
