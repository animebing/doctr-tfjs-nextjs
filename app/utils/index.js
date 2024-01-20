'use client';

import {
  browser,
  loadGraphModel,
  scalar,
  squeeze,
} from '@tensorflow/tfjs'

import { DET_MEAN, DET_STD } from '@/app/common/constants';

export function sleep(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


export const loadDetectionModel = async ({
  setLoadingDetModel,
  detectionModel,
  detConfig,
}) => {
  setLoadingDetModel(true);
  try {
    detectionModel.current = await loadGraphModel(detConfig.path);
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingDetModel(false);
  }
};

export const loadRecognitionModel = async ({
  setLoadingRecoModel,
  recognitionModel,
  recoConfig,
}) => {
  setLoadingRecoModel(true);
  try {
    recognitionModel.current = await loadGraphModel(recoConfig.path);
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingRecoModel(false);
  }
};


export const getImageTensorForDetectionModel = (
  imageObject,
  size,
) => {
  let tensor = browser
    .fromPixels(imageObject)
    .resizeNearestNeighbor(size)
    .toFloat();
  let mean = scalar(255 * DET_MEAN);
  let std = scalar(255 * DET_STD);
  return tensor.sub(mean).div(std).expandDims();
};


export const getHeatMapFromImage = async ({
  heatmapContainer,
  detectionModel,
  imageObject,
  size,
}) =>
  new Promise(async (resolve) => {
    heatmapContainer.width = imageObject.width;
    heatmapContainer.height = imageObject.height;
    let tensor = getImageTensorForDetectionModel(imageObject, size);
    let prediction = await detectionModel?.execute(tensor);
    prediction = squeeze(prediction, 0);
    if (Array.isArray(prediction)) {
      prediction = prediction[0];
    }
    await browser.toPixels(prediction, heatmapContainer);
    resolve("detection");
  });
