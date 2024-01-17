'use client';
import Select from 'react-select';
import { DET_CONFIG, RECO_CONFIG } from "@app/common/constants";

export default ({
  detConfig,
  setDetConfig,
  recoConfig,
  setRecoConfig,
}) => {
  return (
    <div className="p-8 rounded-lg border-2 flex flex-col gap-2">
      <div className="text-[18px] font-medium mb-5">
        1 - Select a Model
      </div>
      <div className="flex flex-col gap-[5px]">
        <p className="text-[14px]">Detection model</p>
        <Select
          defaultValue={detConfig}
          onChange={setDetConfig}
          options={Object.values(DET_CONFIG)}
        />
      </div>
      <div className="flex flex-col gap-[5px]">
        <p className="text-[14px]">Recognition model</p>
        <Select
          defaultValue={recoConfig}
          onChange={setRecoConfig}
          options={Object.values(RECO_CONFIG)}
        />
      </div>
      <div className="text-[18px] font-medium mb-5 mt-[10px]">
      2 - Upload an image
      </div>
      

    </div>
  );
};
