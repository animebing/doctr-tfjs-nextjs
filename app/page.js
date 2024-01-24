import { headers } from 'next/headers'

import WelcomeMessage from '@/app/components/WelcomeMessage'
import VisionWrapper from '@/app/components/VisionWrapper'
import PageFooter from '@/app/components/PageFooter'


export default () => {
  const userAgent =  headers().get('user-agent');
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobile = regex.test(userAgent);
  return (
    isMobile ? (
      <div>
        hello world mobile
      </div>
    ) : (
      <div className='flex flex-col gap-2 px-2 pt-1 lg:px-10 lg:pt-5'>
        <WelcomeMessage />
        <VisionWrapper />
        <PageFooter />
      </div>
    )
  );
};
