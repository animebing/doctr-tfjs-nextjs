'use client';

import {loadGraphModel} from '@tensorflow/tfjs'

export const loadDetectionModel = async ({
  setDetLoading,
  detectionModel,
  detConfig,
}) => {
  // setDetLoading(true);
  try {
    console.log(detConfig.path);
    console.log('begin');
    // detectionModel.current = await loadGraphModel(detConfig.path);
    console.log('end');
  } catch (error) {
    console.log(error);
  }
  // setDetLoading(false);
};

export const loadRecognitionModel = async ({
  setRecoLoading,
  recognitionModel,
  recoConfig,
}) => {
  // setRecoLoading(true);
  try {
    console.log(recoConfig.path);
    console.log('begin');
    // recognitionModel.current = await loadGraphModel(recoConfig.path);
    console.log('end');
  } catch (error) {
    console.log(error);
  }
  // setRecoLoading(false);
};
