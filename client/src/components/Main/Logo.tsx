import octupos from '../../assets/octopus.webp';
import eye from '../../assets/eye.png';
import React, { useEffect } from 'react';

const Logo: React.FC = () => {
  useEffect(() => {
    const anchor = document.getElementById('anchor');
    if (anchor) {
      const rekt = anchor.getBoundingClientRect();
      const anchorX = rekt.left + rekt.width / 2;
      const anchorY = rekt.top + rekt.height / 2;

      document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const angelDeg = angle(mouseX, mouseY, anchorX, anchorY);
        const eyes = document.querySelectorAll('.eye');
        eyes.forEach((eye) => {
          const element = eye as HTMLElement;
          element.style.transform = `rotate(${90 + angelDeg}deg)`;
        });
      });
    }
  }, []);

  function angle(cx: number, cy: number, ex: number, ey: number): number {
    const dx = ex - cx;
    const dy = ey - cy;
    const rad = Math.atan2(dy, dx);
    const deg = (rad * 180) / Math.PI;
    return deg;
  }

  return (
    <>
      <div className='bg-white rounded-full w-[700px] h-[700px] flex items-center justify-center '>
        <img id='anchor' src={octupos} className=' absolute' alt='' />
        <div id='eyes'>
          <img
            src={eye}
            className='eye'
            style={{ width: '50px', position: 'absolute', top: '424px', left: '528px' }}
            alt=''
          />
          <img
            src={eye}
            className='eye'
            style={{ width: '50px', position: 'absolute', top: '421px', left: '621px' }}
            alt=''
          />
        </div>
      </div>
    </>
  );
};

export default Logo;
