"use client";

import { useEffect, useRef, useState } from 'react';
import {loadGraphModel} from '@tensorflow/tfjs'

import SideBar from '@/app/components/SideBar'
import AnnotationViewer from '@/app/components/AnnotationViewer'
import WordsList from '@/app/components/WordsList';
import { DET_CONFIG, RECO_CONFIG } from '@/app/common/constants';
import { loadDetectionModel, loadRecognitionModel } from '@/app/utils'

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export default ({
  setDetLoading,
  setRecoLoading,
}) => {
  const [detConfig, setDetConfig] = useState(DET_CONFIG.db_mobilenet_v2);
  const [recoConfig, setRecoConfig] = useState(RECO_CONFIG.crnn_vgg16_bn);
  const recognitionModel = useRef(null);
  const detectionModel = useRef(null);

  // useEffect(() => {
  //   loadDetectionModel({ setDetLoading, detectionModel, detConfig });
  // }), [detConfig];

  useEffect(() => {
    const loadDetectionModel = async () => {
      setDetLoading(true);
      try {
        console.log(detConfig.path);
        console.log('begin');
        detectionModel.current = await loadGraphModel(detConfig.path);
        await delay(5000);
        console.log('end');
      } catch (error) {
        console.log(error);
      }
      setDetLoading(false);
    }
    loadDetectionModel();
  }, [detConfig]);

  useEffect(() => {
    const loadRecognitionModel = async () => {
      setRecoLoading(true);
      try {
        console.log(detConfig.path);
        console.log('begin');
        recognitionModel.current = await loadGraphModel(recoConfig.path);
        console.log('end');
      } catch (error) {
        console.log(error);
      }
      setRecoLoading(false);
    }
    loadRecognitionModel(false);
  }, [recoConfig]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="p-8 rounded-lg border-2 col-span-1 lg:col-span-3">
        <SideBar
          detConfig={detConfig}
          setDetConfig={setDetConfig}
          recoConfig={recoConfig}
          setRecoConfig={setRecoConfig}
        />
      </div>
      <div className="p-8 rounded-lg border-2 col-span-1 lg:col-span-5">
        <AnnotationViewer />
      </div>
      <div className="p-8 rounded-lg border-2 col-span-1 lg:col-span-4">
        <WordsList />
      </div>
  </div>
  );
};
