import * as faceapi from 'face-api.js';

let modelsLoaded = false;

// Model weights are loaded once and cached by the browser. They live in
// /public/models — see public/models/README.md for how to fetch them,
// since binary weight files aren't checked into this repo.
export async function loadFaceModels() {
  if (modelsLoaded) return;

  const MODEL_URL = '/models';
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
  ]);

  modelsLoaded = true;
}

// Runs detection on a live <video> element and returns a 128-length
// descriptor array, or null if no face was confidently detected.
export async function getFaceDescriptor(videoEl) {
  const detection = await faceapi
    .detectSingleFace(videoEl, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!detection) return null;
  return Array.from(detection.descriptor);
}
