import React from 'react';
import octupos from '../assets/octopus.webp';
import eye from '../assets/eye.png';
import Logo from '../components/Main/Logo';
import Cards from '../components/Main/Cards';

const Home: React.FC = () => {
  return (
    <>
      <div className='bg_grd relative pl-52 pt-40'>
        <Logo />
      </div>
      <div className=' '>
        <Cards />
       
      </div>
    </>
  );
};

export default Home;
