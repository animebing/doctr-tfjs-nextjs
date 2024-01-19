'use client';

import {loadGraphModel} from '@tensorflow/tfjs'

function sleep(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


export const loadDetectionModel = async ({
  setDetLoading,
  detectionModel,
  detConfig,
}) => {
  setDetLoading(true);
  try {
    detectionModel.current = await loadGraphModel(detConfig.path);
  } catch (error) {
    console.log(error);
  } finally {
    setDetLoading(false);
  }
};

export const loadRecognitionModel = async ({
  setRecoLoading,
  recognitionModel,
  recoConfig,
}) => {
  setRecoLoading(true);
  try {
    recognitionModel.current = await loadGraphModel(recoConfig.path);
  } catch (error) {
    console.log(error);
  } finally {
    setRecoLoading(false);
  }
};
