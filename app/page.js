"use client";

import WelcomeMessage from './components/WelcomeMessage'
import VisionWrapper from './components/VisionWrapper'
import PageFooter from './components/PageFooter'


export default () => {
  return (
    <div className='px-[42px] pt-[10px] mt-[0.5px]'>
      <WelcomeMessage />
      <VisionWrapper />
      <PageFooter />
    </div>
  );
};
