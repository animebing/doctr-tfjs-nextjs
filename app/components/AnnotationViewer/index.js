'use client'

import dynamic from 'next/dynamic'
const AnnotationViewerBase = dynamic(() =>
  import('react-mindee-js').then((mod) => mod.AnnotationViewer),
  // { ssr: false }, // still okay without this
);
import { TailSpin } from 'react-loader-spinner';


export default ({
  loadingImage,
  annotationData,
  setAnnotationStage,
  onShapeMouseEnter,
  onShapeMouseLeave,
  onShapeClick,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-base lg:text-lg font-medium mb-3">
        3 - Visualize word predictions
      </div>
      {loadingImage ? (
        <div className="h-[435px] rounded border-x border-y border-gray-200 flex justify-center items-center">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
          />
        </div>
      ) : !annotationData.image ? (
        <div className="h-[435px] rounded border-x border-y border-gray-200 flex justify-center items-center">
          <div className="text-xs lg:text-sm">
            No image uploaded yet
          </div>
        </div>
      ) : (
        <div className='flex justify-center'>
          <AnnotationViewerBase
            data={annotationData}
            getStage={setAnnotationStage}
            onShapeMouseEnter={onShapeMouseEnter}
            onShapeMouseLeave={onShapeMouseLeave}
            onShapeClick={onShapeClick}
            style={{ height: "435px", width: "95%", background: "white" }}
          />
        </div>
      )}
    </div>
  );
};
