'use client';

import Select from 'react-select';
import { TailSpin } from 'react-loader-spinner'

import { DET_CONFIG, RECO_CONFIG } from "@/app/common/constants";
import Uploader from '@/app/components/Uploader';

export default ({
  detConfig,
  setDetConfig,
  recoConfig,
  setRecoConfig,
  loadingImage,
  onUpload,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-base lg:text-lg font-medium mb-2">
        1 - Select a Model
      </div>
      <div className="flex flex-col gap-1 mb-1">
        <p className="text-sm lg:text-base">Detection model</p>
        <Select
          className='text-xs lg:text-sm'
          defaultValue={detConfig}
          onChange={setDetConfig}
          options={Object.values(DET_CONFIG)}
        />
      </div>
      <div className="flex flex-col gap-1 mb-1">
        <p className="text-sm lg:text-base">Recognition model</p>
        <Select
          className='text-xs lg:text-sm'
          defaultValue={recoConfig}
          onChange={setRecoConfig}
          options={Object.values(RECO_CONFIG)}
        />
      </div>
      <div className="text-base lg:text-lg mb-3 mt-3">
        2 - Upload an image
      </div>

      <Uploader onUpload={onUpload}>
        <div className='h-full w-full rounded border-x border-y border-gray-200 flex flex-col gap-2 justify-center items-center'>
          {loadingImage ? (
            <TailSpin
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
            />
          ) : (
            <>
              <img src="/image-placeholder.svg" alt="placeholder" className='h-[100px] rounded-lg object-contain cursor-pointer'/>
              <div className='text-xs lg:text-sm text-center'>
                Upload an image <br />
                (.jpg, .png, .webp)
              </div>
            </>
          )}  
        </div>
      </Uploader>
    </div>
  );
};
