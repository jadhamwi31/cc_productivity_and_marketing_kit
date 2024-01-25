import { useEffect } from 'react';
import Card from './Card';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { BsSoundwave } from 'react-icons/bs';
import { IoVideocamOutline, IoAnalytics } from 'react-icons/io5';

export default function CategoryCards() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    const cardsElement = document.getElementById('cards');
    if (cardsElement) {
      cardsElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (cardsElement) {
        cardsElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      id='cards'
      className='text-white flex flex-wrap gap-4 w-full place-content-center mx-auto p-10  animate-fade-right animate-once animate-ease-in-out'
    >
      <Card>
        <IoAnalytics className='text-gray-400 mx-auto' size='200' />
        <h1 className='text-5xl mx-auto text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
          All Numbers
        </h1>
        <p className='mx-auto text-center mt-10'>
          Socialmedia analytics are in your hands
          <br />
        </p>
      </Card>
      <Card>
        <IoVideocamOutline className='text-gray-400 mx-auto' size='200' />
        <h1 className='text-5xl mx-auto text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-yellow-200'>
          Video Editor
        </h1>
        <p className='mx-auto text-center mt-10'>
          Simplest Operation ,Easier and Faster
          <br /> Artworks Here..
        </p>
      </Card>
      <Card>
        <HiOutlinePhoto className='text-gray-400 mx-auto' size='200' />
        <h1 className='text-5xl mx-auto text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500'>
          Graphic Editor
        </h1>
        <p className='mx-auto text-center mt-10'>easy to create designs and to share them</p>
      </Card>
    </div>
  );
}
