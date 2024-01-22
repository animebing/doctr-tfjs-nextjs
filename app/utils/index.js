import cv from "@techstark/opencv-js";

import {
  browser,
  getBackend,
  loadGraphModel,
  scalar,
  squeeze,
} from '@tensorflow/tfjs';

import randomColor from "randomcolor";

import { DET_MEAN, DET_STD } from '@/app/common/constants';

export function sleep(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export function isMobile() {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  if (typeof window !== 'undefined') {
    return regex.test(navigator.userAgent);
  } else {
    return false;
  } 
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
    console.log(imageObject.width);
    console.log(imageObject.height);
    let tensor = getImageTensorForDetectionModel(imageObject, size);
    let prediction = await detectionModel?.execute(tensor);
    prediction = squeeze(prediction, 0);
    if (Array.isArray(prediction)) {
      prediction = prediction[0];
    }
    await browser.toPixels(prediction, heatmapContainer);
    resolve("detection");
  });

export const extractBoundingBoxesFromHeatmap = (size) => {
  let src = cv.imread("heatmap");
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  cv.threshold(src, src, 77, 255, cv.THRESH_BINARY);
  cv.morphologyEx(src, src, cv.MORPH_OPEN, cv.Mat.ones(2, 2, cv.CV_8U));
  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  // You can try more different parameters
  cv.findContours(
    src,
    contours,
    hierarchy,
    cv.RETR_EXTERNAL,
    cv.CHAIN_APPROX_SIMPLE
  );
  // draw contours with random Scalar
  const boundingBoxes = [];
  for (let i = 0; i < contours.size(); ++i) {
    const contourBoundingBox = cv.boundingRect(contours.get(i));
    if (contourBoundingBox.width > 2 && contourBoundingBox.height > 2) {
      boundingBoxes.unshift(transformBoundingBox(contourBoundingBox, i, size));
    }
  }
  src.delete();
  contours.delete();
  hierarchy.delete();
  return boundingBoxes;
};


export const transformBoundingBox = (
  contour,
  id,
  size,
) => {
  let offset =
    (contour.width * contour.height * 1.8) /
    (2 * (contour.width + contour.height));
  const p1 = clamp(contour.x - offset, size[1]) - 1;
  const p2 = clamp(p1 + contour.width + 2 * offset, size[1]) - 1;
  const p3 = clamp(contour.y - offset, size[0]) - 1;
  const p4 = clamp(p3 + contour.height + 2 * offset, size[0]) - 1;
  return {
    id,
    config: {
      stroke: randomColor(),
    },
    coordinates: [
      [p1 / size[1], p3 / size[0]],
      [p2 / size[1], p3 / size[0]],
      [p2 / size[1], p4 / size[0]],
      [p1 / size[1], p4 / size[0]],
    ],
  };
};


function clamp(number, size) {
  return Math.max(0, Math.min(number, size));
}
