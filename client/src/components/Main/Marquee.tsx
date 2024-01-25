import React from 'react';
import Slider from 'react-infinite-logo-slider';

import youtube from '../../assets/marquee/youtube.svg';
import tiktok from '../../assets/marquee/tiktok.svg';
import twitter from '../../assets/marquee/twitter.svg';
import instagram from '../../assets/marquee/instagram.svg';
import rededit from '../../assets/marquee/rededit.svg';
import facebook from '../../assets/marquee/facebook.svg';
import video from '../../assets/marquee/video.svg';
import image from '../../assets/marquee/image.svg';
import bars from '../../assets/marquee/bars.svg';

const images = [youtube, tiktok, twitter, instagram, rededit, facebook, video, image, bars];

// Function to shuffle the array
const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

export default function Marquee() {
  const shuffledImages = shuffleArray([...images]);

  return (
    <div className='opacity-5'>
      <Slider duration={10} width='90px' blurBorders={true} blurBoderColor={'#000'}>
        {shuffledImages.map((image, index) => (
          <Slider.Slide key={index}>
            <img src={image} alt='' width={40} />
          </Slider.Slide>
        ))}
      </Slider>
      <Slider duration={10} width='100px' blurBorders={true} blurBoderColor={'#000'}>
        {shuffledImages.map((image, index) => (
          <Slider.Slide key={index}>
            <img src={image} alt='' width={40} />
          </Slider.Slide>
        ))}
      </Slider>
      <Slider duration={10} width='90px' blurBorders={true} blurBoderColor={'#000'}>
        {shuffledImages.map((image, index) => (
          <Slider.Slide key={index}>
            <img src={image} alt='' width={40} />
          </Slider.Slide>
        ))}
      </Slider>
    </div>
  );
}
