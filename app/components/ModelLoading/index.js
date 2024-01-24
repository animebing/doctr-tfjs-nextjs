'use client';

import { ThreeDots } from 'react-loader-spinner'

export default () => {
  return (
      <div className="fixed z-10 top-0 left-0 w-full h-full bg-white/80 flex justify-center items-center">
        <div className='flex flex-col justify-center items-center'>
          <ThreeDots visible={true} color="#4fa94d" height={40} width={80} />
          <div className='text-center text-[#4fa94d] text-[20px]'>
            Loading Model
          </div>
        </div>
      </div>
  );
};