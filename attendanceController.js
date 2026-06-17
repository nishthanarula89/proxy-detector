# Face-api.js model weights

This folder needs the pretrained model weight files from face-api.js before
the app can detect or recognize faces in the browser. They're binary files
so they aren't checked into this repo.

Download them with one of the following:

## Option A — clone from the official weights repo
```bash
git clone https://github.com/justadudewhohacks/face-api.js.git tmp-face-api
cp tmp-face-api/weights/tiny_face_detector_model* ./
cp tmp-face-api/weights/face_landmark_68_model* ./
cp tmp-face-api/weights/face_recognition_model* ./
rm -rf tmp-face-api
```

## Option B — download individually with curl
Grab these files from the same repo's `weights/` folder and place them
directly in this `public/models/` directory:
- tiny_face_detector_model-weights_manifest.json
- tiny_face_detector_model-shard1
- face_landmark_68_model-weights_manifest.json
- face_landmark_68_model-shard1
- face_recognition_model-weights_manifest.json
- face_recognition_model-shard1
- face_recognition_model-shard2

Once copied, this folder should sit flat with all those files directly
inside `public/models/` (no subfolders). The app loads them from `/models`
at runtime.
