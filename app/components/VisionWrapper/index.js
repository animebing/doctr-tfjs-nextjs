'use client';

import { flatten } from "underscore";
import { useEffect, useRef, useState } from 'react';

import AnnotationViewer from '@/app/components/AnnotationViewer'
import ModelLoading from '@/app/components/ModelLoading'
import SideBar from '@/app/components/SideBar'
import WordsList from '@/app/components/WordsList';
import { DET_CONFIG, RECO_CONFIG } from '@/app/common/constants';
import { useStateWithRef } from "@/app/utils/hooks";
import {
  extractBoundingBoxesFromHeatmap,
  extractWords,
  getHeatMapFromImage,
  loadDetectionModel,
  loadRecognitionModel,
  sleep,
} from '@/app/utils'


export default () => {
  const [loadingDetModel, setLoadingDetModel] = useState(false);
  const [loadingRecoModel, setLoadingRecoModel] = useState(false);
  const [detConfig, setDetConfig] = useState(DET_CONFIG.db_mobilenet_v2);
  const [recoConfig, setRecoConfig] = useState(RECO_CONFIG.crnn_vgg16_bn);
  const recognitionModel = useRef(null);
  const detectionModel = useRef(null);

  const imageObject = useRef(null);
  const imageObjectFake = useRef(null);
  const heatMapContainerObject = useRef(null);
  const canvasObjectFake = useRef(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const annotationStage = useRef();
  const [annotationData, setAnnotationData] = useState({
    image: null,
  });

  const [extractingWords, setExtractingWords] = useState(false);
  const [words, setWords, wordsRef] = useStateWithRef([]);
  const fieldRefsObject = useRef([]);

  useEffect(() => {
    setWords([]);
    setAnnotationData({ image: null });
    imageObject.current.src = "";
    if (heatMapContainerObject.current) {
      const context = heatMapContainerObject.current.getContext("2d");
      context.clearRect(
        0,
        0,
        heatMapContainerObject.current.width,
        heatMapContainerObject.current.height
      );
    }
    loadDetectionModel({setLoadingDetModel, detectionModel, detConfig});
  }, [setLoadingDetModel, detConfig]);

  useEffect(() => {
    setWords([]);
    setAnnotationData({ image: null });
    imageObject.current.src = "";
    if (heatMapContainerObject.current) {
      const context = heatMapContainerObject.current.getContext("2d");
      context.clearRect(
        0,
        0,
        heatMapContainerObject.current.width,
        heatMapContainerObject.current.height
      );
    }
    loadRecognitionModel({setLoadingRecoModel, recognitionModel, recoConfig});
  }, [setLoadingRecoModel, recoConfig]);

  const onUpload = async (uploadedFile) => {
    setWords([]);
    setLoadingImage(true);
    setExtractingWords(true);
    imageObjectFake.current.onload = async () => {
      await getHeatMapFromImage({
        heatmapContainer: heatMapContainerObject.current,
        detectionModel: detectionModel.current,
        imageObject: imageObjectFake.current,
        size: [detConfig.height, detConfig.width],
      });
      getBoundingBoxes();
      imageObjectFake.current.url = null;
      let ctx = canvasObjectFake.current.getContext('2d');
      ctx.clearRect(0, 0, canvasObjectFake.current.width, canvasObjectFake.current.height);
      setLoadingImage(false);
      toGetWords();
    };
    imageObject.current.onload = async () => {
      let shortSide = Math.min(imageObject.current.width, imageObject.current.height);
      if (shortSide > 512){
        let ratio = 512 / shortSide;
        let newWidth = Math.round(imageObject.current.width * ratio);
        let newHeight = Math.round(imageObject.current.height * ratio);
        canvasObjectFake.current.width = newWidth;
        canvasObjectFake.current.height = newHeight;
        let ctx = canvasObjectFake.current.getContext('2d');
        ctx.drawImage(imageObject.current, 0, 0, newWidth, newHeight);
        imageObjectFake.current.src = canvasObjectFake.current.toDataURL('image/jpeg', 1.0);
      } else {
        imageObjectFake.current.src = imageObject.current.src
      }
    };
    imageObject.current.src = uploadedFile?.image;
  };

  const getBoundingBoxes = () => {
    const boundingBoxes = extractBoundingBoxesFromHeatmap([
      detConfig.height,
      detConfig.width,
    ]);
    setAnnotationData({
      image: imageObject.current.src,
      shapes: boundingBoxes,
    });
  }

  const toGetWords = async () => {
    while (typeof annotationStage.current === 'undefined') {
      await sleep(1000);
    }
    getWords();
  };

  const getWords = async () => {
    const words = (await extractWords({
      recognitionModel: recognitionModel.current,
      stage: annotationStage.current,
      size: [recoConfig.height, recoConfig.width],
    }));
    console.log(words);
    setWords(flatten(words));
    setExtractingWords(false);
  };

  const setAnnotationStage = (stage) => {
    annotationStage.current = stage;
  };

  return (
    <>
      {(loadingDetModel || loadingRecoModel) && <ModelLoading /> }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <img className='hidden' ref={imageObject} />
        <canvas id="heatmap" className="h-[35vh] m-auto hidden" ref={heatMapContainerObject} />

        <img className='hidden' ref={imageObjectFake} />
        <canvas className='hidden' ref={canvasObjectFake} />

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
    </>
  );
};
