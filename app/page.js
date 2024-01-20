'use client';

import { useState } from 'react';

import ModelLoading from '@/app/components/ModelLoading'
import WelcomeMessage from '@/app/components/WelcomeMessage'
import VisionWrapper from '@/app/components/VisionWrapper'
import PageFooter from '@/app/components/PageFooter'


export default () => {
  const [loadingDetModel, setLoadingDetModel] = useState(true);
  const [loadingRecoModel, setLoadingRecoModel] = useState(true);

  return (
    <>  
      {(loadingDetModel || loadingRecoModel) && <ModelLoading />}
      <div className='flex flex-col gap-2 px-2 pt-1 lg:px-10 lg:pt-5'>
        <WelcomeMessage />
        <VisionWrapper
          setLoadingDetModel={setLoadingDetModel} 
          setLoadingRecoModel={setLoadingRecoModel} 
        />
        <PageFooter />
      </div>
    </>
  );
};
