import React from 'react';
import octupos from '../assets/octopus.webp';
import eye from '../assets/eye.png';
import Logo from '../components/Main/Logo';
import Cards from '../components/Main/Cards';
import Marquee from '../components/Main/Marquee';

const Home: React.FC = () => {
  return (
    <div className='bg_grd grad '>
      <div className=' relative pl-52 pt-40'>
        <Logo />
      </div>
      <div className='flex  mt-40 justify-center'>
        <div className='w-[40%]'>
          <h1 className='text-4xl text-white pt-40'>
            Prove your social media ROI Introducing Hootsuite Advanced Analytics, the only social
            analytics tool that shows your paid, organic, and web metrics side by side. Find out
            exactly how you're driving value at every stage of the customer journey.
          </h1>
        </div>
        <img
          className='w-[40%]'
          alt=''
          src='https://images.ctfassets.net/ta4ffdi8h2om/4vSZZgNjjNeGiFttbhBGVU/52e978cae5fe8ec19ecb661a47b5e9e8/AdvancedAnalytics-ForLakeBG_2x.png'
        />
      </div>
      <h1 className='mx-10 text-8xl text-center text-white pt-40'>
        <span className='text-purple-700 font-bold '>Supercharge</span>
        <br /> your social media strategy
      </h1>
      <div className='w-[80vw] mx-auto mt-10'>
        <Marquee />
      </div>

      <div className='bg-gradient-to-t from-black from-80%   to-transparent pt-60'>
        <div className='min-h-30'></div>
        <Cards />
      </div>
      <div className='bg-black h-60 border-t-2 border-New_Gray px-20 py-10 '>
        <img src={octupos} className='w-40' />
      </div>
    </div>
  );
};

export default Home;
