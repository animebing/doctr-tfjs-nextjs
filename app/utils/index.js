import { chunk } from 'underscore';
import cv from "@techstark/opencv-js";
import randomColor from "randomcolor";
import * as tf from '@tensorflow/tfjs';

import {
  DET_MEAN,
  DET_STD,
  REC_MEAN,
  REC_STD,
  VOCAB,
 } from '@/app/common/constants';

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
  try 
  {
    detectionModel.current = await tf.loadGraphModel(detConfig.path);
    // tf.env().set('WEBGPU_ENGINE_COMPILE_ONLY', true);
    // let warmupResult = detectionModel.current.execute(tf.zeros([1, detConfig.height, detConfig.width, 3]));
    // tf.env().set('WEBGPU_ENGINE_COMPILE_ONLY', false);
    // await tf.backend().checkCompileCompletionAsync();
    // tf.dispose(warmupResult);
    let warmupResult = await detectionModel.current.execute(tf.zeros([1, detConfig.height, detConfig.width, 3]));
    tf.dispose(warmupResult);
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
    recognitionModel.current = await tf.loadGraphModel(recoConfig.path);
    let warmupResult = await recognitionModel.current.executeAsync(tf.zeros([16, recoConfig.height, recoConfig.width, 3]));
    tf.dispose(warmupResult);
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
  let tensor = tf.browser
    .fromPixels(imageObject)
    .resizeNearestNeighbor(size)
    .toFloat();
  let mean = tf.scalar(255 * DET_MEAN);
  let std = tf.scalar(255 * DET_STD);
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
    prediction = tf.squeeze(prediction, 0);
    if (Array.isArray(prediction)) {
      prediction = prediction[0];
    }
    await tf.browser.toPixels(prediction, heatmapContainer);
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

export const extractWords = async ({
  recognitionModel,
  stage,
  size,
}) => {
  const crops = (await getCrops({ stage }));
  const chunks = chunk(crops, 16);
  return Promise.all(
    chunks.map(
      (chunk) =>
        new Promise(async (resolve) => {
          const words = await extractWordsFromCrop({
            recognitionModel,
            crops: chunk.map((elem) => elem.crop),
            size,
          });
          const collection = words?.map((word, index) => ({
            ...chunk[index],
            words: word ? [word] : [],
          }));
          resolve(collection);
        })
    )
  );
};

export const getCrops = ({ stage }) => {
  const layer = stage.findOne("#shapes-layer");
  const polygons = layer.find(".shape");
  return Promise.all(
    polygons.map((polygon) => {
      const clientRect = polygon.getClientRect();
      return new Promise((resolve) => {
        stage.toImage({
          ...clientRect,
          quality: 5,
          pixelRatio: 10,
          callback: (value) => {
            resolve({
              id: polygon.id(),
              crop: value,
              color: polygon.getAttr("stroke"),
            });
          },
        });
      });
    })
  );
};

export const extractWordsFromCrop = async ({
  recognitionModel,
  crops,
  size,
}) => {
  let tensor = getImageTensorForRecognitionModel(crops, size);
  let predictions = await recognitionModel.executeAsync(tensor);

  let probabilities = tf.softmax(predictions, -1);
  let bestPath = tf.unstack(tf.argMax(probabilities, -1), 0);
  let blank = 126;
  var words = [];
  for (const sequence of bestPath) {
    let collapsed = "";
    let added = false;
    const values = sequence.dataSync();
    const arr = Array.from(values);
    for (const k of arr) {
      if (k === blank) {
        added = false;
      } else if (k !== blank && added === false) {
        collapsed += VOCAB[k];
        added = true;
      }
    }
    words.push(collapsed);
  }
  return words;
};

export const getImageTensorForRecognitionModel = (
  crops,
  size,
) => {
  const list = crops.map((imageObject) => {
    let h = imageObject.height;
    let w = imageObject.width;
    let resize_target;
    let padding_target;
    let aspect_ratio = size[1] / size[0];
    if (aspect_ratio * h > w) {
      resize_target = [size[0], Math.round((size[0] * w) / h)];
      padding_target = [
        [0, 0],
        [0, size[1] - Math.round((size[0] * w) / h)],
        [0, 0],
      ];
    } else {
      resize_target = [Math.round((size[1] * h) / w), size[1]];
      padding_target = [
        [0, size[0] - Math.round((size[1] * h) / w)],
        [0, 0],
        [0, 0],
      ];
    }
    return tf.browser
      .fromPixels(imageObject)
      .resizeNearestNeighbor(resize_target)
      .pad(padding_target, 0)
      .toFloat()
      .expandDims();
  });
  const tensor = tf.concat(list);
  let mean = tf.scalar(255 * REC_MEAN);
  let std = tf.scalar(255 * REC_STD);
  return tensor.sub(mean).div(std);
};
