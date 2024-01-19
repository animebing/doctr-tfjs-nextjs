"use client";

import { useState } from 'react';

import ModelLoading from '@/app/components/ModelLoading'
import WelcomeMessage from '@/app/components/WelcomeMessage'
import VisionWrapper from '@/app/components/VisionWrapper'
import PageFooter from '@/app/components/PageFooter'


export default () => {
  const [detLoading, setDetLoading] = useState(false);
  const [recoLoading, setRecoLoading] = useState(false);

  return (
    <>
      {(detLoading || recoLoading) && <ModelLoading />}
      <div className='flex flex-col gap-2 px-[42px] pt-[21px]'>
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
