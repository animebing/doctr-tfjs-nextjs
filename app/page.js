"use client";

import { useState } from 'react';

import ModelLoading from '@/app/components/ModelLoading'
import WelcomeMessage from '@/app/components/WelcomeMessage'
import VisionWrapper from '@/app/components/VisionWrapper'
import PageFooter from '@/app/components/PageFooter'


export default () => {
  const [detLoading, setDetLoading] = useState(true);
  const [recoLoading, setRecoLoading] = useState(true);

  return (
    <>  
      {(detLoading || recoLoading) && <ModelLoading />}
      <div className='flex flex-col gap-1 px-1 pt-1 lg:gap-2 lg:px-[42px] lg:pt-[21px]'>
        <WelcomeMessage />
        <VisionWrapper
          setDetLoading={setDetLoading} 
          setRecoLoading={setRecoLoading} 
        />
        <PageFooter />
      </div>
    </>
  );
};
