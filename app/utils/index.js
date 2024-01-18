import {loadGraphModel} from '@tensorflow/tfjs'

export const loadDetectionModel = async ({
  detectionModel,
  detConfig,
}) => {
  try {
    console.log(detConfig.path);
    console.log('begin');
    detectionModel.current = await loadGraphModel(detConfig.path);
    console.log('end');
  } catch (error) {
    console.log(error);
  }
};

export const loadRecognitionModel = async ({
  recognitionModel,
  recoConfig,
}) => {
  try {
    console.log(recoConfig.path);
    console.log('begin');
    recognitionModel.current = await loadGraphModel(recoConfig.path);
    console.log('end');
  } catch (error) {
    console.log(error);
  }
};
