import { headers } from 'next/headers'

import MobileWelcomeMessage from '@/app/components/MobileWelcomeMessage';
import PageHeader from '@/app/components/PageHeader';
import VisionWrapper from '@/app/components/VisionWrapper';
import WelcomeMessage from '@/app/components/WelcomeMessage'


export default () => {
  const userAgent =  headers().get('user-agent');
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobile = regex.test(userAgent);
  return (
    isMobile ? (
      <MobileWelcomeMessage />
    ) : (
      <div className='flex flex-col'>
        <PageHeader />
        <div className='flex flex-col gap-2 px-4 pt-2 md:px-10 md:pt-5'>
          <WelcomeMessage />
          <VisionWrapper />
        </div>
      </div>
    )
  );
};
