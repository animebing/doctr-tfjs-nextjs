"use client";

import WelcomeMessage from '@/app/components/WelcomeMessage'
import VisionWrapper from '@/app/components/VisionWrapper'
import PageFooter from '@/app/components/PageFooter'


export default () => {
  return (
    <div className='px-[42px] pt-[21px]'>
      <WelcomeMessage />
      <VisionWrapper />
      <PageFooter />
    </div>
  );
};
