'use client';
import Select from 'react-select';
import { DET_CONFIG, RECO_CONFIG } from "@/app/common/constants";

export default ({
  detConfig,
  setDetConfig,
  recoConfig,
  setRecoConfig,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm lg:text-lg font-medium mb-2">
        1 - Select a Model
      </div>
      <div className="flex flex-col gap-[5px] mb-1">
        <p className="lg:text-base">Detection model</p>
        <Select
          className='lg:text-sm'
          defaultValue={detConfig}
          onChange={setDetConfig}
          options={Object.values(DET_CONFIG)}
        />
      </div>
      <div className="flex flex-col gap-[5px] mb-1">
        <p className="text-[10px] lg:text-base">Recognition model</p>
        <Select
          className='lg:text-sm'
          defaultValue={recoConfig}
          onChange={setRecoConfig}
          options={Object.values(RECO_CONFIG)}
        />
      </div>
      <div className="text-sm lg:text-lg mb-3 mt-[10px]">
        2 - Upload an image
      </div>
      <div className='h-56 rounded-[4px] border-[1px] border-[#E6E9EC] flex flex-col gap-[10px] justify-center items-center'>
        <img src="/image-placeholder.svg" alt="placeholder" className='h-[100px] rounded-lg object-contain cursor-pointer'/>
        <div className='text-[14px] text-center'>
        Upload an image <br />
        (.jpg, .png, .webp)
        </div>
      </div>

      

    </div>
  );
};
