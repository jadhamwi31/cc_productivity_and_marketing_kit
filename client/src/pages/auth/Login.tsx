import { Link } from 'react-router-dom';
import building from '../../assets/artworks/building.svg';
import yard from '../../assets/artworks/yard.svg';
import mountain from '../../assets/artworks/mountain.svg';
export default function Login() {
  const images = [building, yard, mountain];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  console.log(randomImage);
  return (
    <div className=' lg:flex lg:justify-between w-screen  h-screen '>
      <div
        className='absolute h-screen w-screen bg-black/60 backdrop-blur-md lg:w-[30vw] z-20
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
