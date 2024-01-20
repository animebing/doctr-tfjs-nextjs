'use client';

import { useEffect, useRef, useState } from 'react';

import AnnotationViewer from '@/app/components/AnnotationViewer'
import SideBar from '@/app/components/SideBar'
import WordsList from '@/app/components/WordsList';
import { DET_CONFIG, RECO_CONFIG } from '@/app/common/constants';
import {
  getHeatMapFromImage,
  loadDetectionModel,
  loadRecognitionModel,
  sleep,
} from '@/app/utils'


export default ({
  setLoadingDetModel,
  setLoadingRecoModel,
}) => {
  const [detConfig, setDetConfig] = useState(DET_CONFIG.db_mobilenet_v2);
  const [recoConfig, setRecoConfig] = useState(RECO_CONFIG.crnn_vgg16_bn);
  const recognitionModel = useRef(null);
  const detectionModel = useRef(null);

  const imageObject = useRef(null);
  const heatMapContainerObject = useRef(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const annotationStage = useRef();
  const [annotationData, setAnnotationData] = useState({
    image: null,
  });

  useEffect(() => {
    loadDetectionModel({setLoadingDetModel, detectionModel, detConfig});
  }, [setLoadingDetModel, detConfig]);

  useEffect(() => {
    loadRecognitionModel({setLoadingRecoModel, recognitionModel, recoConfig});
  }, [setLoadingRecoModel, recoConfig]);

  const onUpload = (newFile) => {
    loadImage(newFile);
    setAnnotationData({ image: newFile.image });
  };

  const loadImage = async (uploadedFile) => {
    setLoadingImage(true);
    imageObject.current.onload = async () => {
      await getHeatMapFromImage({
        heatmapContainer: heatMapContainerObject.current,
        detectionModel: detectionModel.current,
        imageObject: imageObject.current,
        size: [detConfig.height, detConfig.width],
      });
      // getBoundingBoxes();
      setLoadingImage(false);
    };
    imageObject.current.src = uploadedFile?.image;
  };
  const setAnnotationStage = (stage) => {
    annotationStage.current = stage;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <img className='hidden' ref={imageObject} />
      <canvas className="h-[35vh] m-auto hidden" ref={heatMapContainerObject} />

      <div className="p-2 rounded border-2 col-span-1 lg:col-span-3 lg:p-8 lg:rounded-lg">
        <SideBar
          detConfig={detConfig}
          setDetConfig={setDetConfig}
          recoConfig={recoConfig}
          setRecoConfig={setRecoConfig}
          loadingImage={loadingImage}
          onUpload={onUpload}
        />
      </div>
      <div className="p-2 rounded border-2 col-span-1 lg:col-span-5 lg:p-8 lg:rounded-lg">
        <AnnotationViewer 
          loadingImage={loadingImage}
          annotationData={annotationData}
          setAnnotationStage={setAnnotationStage}
        />
      </div>
      <div className="p-2 rounded border-2 col-span-1 lg:col-span-4 lg:p-8 lg:rounded-lg">
        <WordsList />
      </div>
  </div>
  );
};
