"use client";

import { useEffect, useRef, useState } from 'react';

import SideBar from '@/app/components/SideBar'
import AnnotationViewer from '@/app/components/AnnotationViewer'
import WordsList from '@/app/components/WordsList';
import { DET_CONFIG, RECO_CONFIG } from '@/app/common/constants';
import { loadDetectionModel, loadRecognitionModel } from '@/app/utils'


export default ({
  setDetLoading,
  setRecoLoading,
}) => {
  const [detConfig, setDetConfig] = useState(DET_CONFIG.db_mobilenet_v2);
  const [recoConfig, setRecoConfig] = useState(RECO_CONFIG.crnn_vgg16_bn);
  const recognitionModel = useRef(null);
  const detectionModel = useRef(null);

  useEffect(() => {
    loadDetectionModel({setDetLoading, detectionModel, detConfig});
  }, [setDetLoading, detConfig]);

  useEffect(() => {
    loadRecognitionModel({setRecoLoading, recognitionModel, recoConfig});
  }, [setRecoLoading, recoConfig]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="p-2 rounded-sm border-2 col-span-1 lg:col-span-3 lg:p-8 lg:rounded-lg">
        <SideBar
          detConfig={detConfig}
          setDetConfig={setDetConfig}
          recoConfig={recoConfig}
          setRecoConfig={setRecoConfig}
        />
      </div>
      <div className="p-2 rounded-sm border-2 col-span-1 lg:col-span-5 lg:p-8 lg:rounded-lg">
        <AnnotationViewer />
      </div>
      <div className="p-2 rounded-sm border-2 col-span-1 lg:col-span-4 lg:p-8 lg:rounded-lg">
        <WordsList />
      </div>
  </div>
  );
};
