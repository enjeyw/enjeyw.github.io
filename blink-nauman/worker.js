let landmarker;
self.onmessage = async ({data}) => {
  if (data.type === 'init') {
    try {
      const {FaceLandmarker, FilesetResolver} = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/vision_bundle.mjs');
      const files = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm');
      const options = {baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',delegate:'GPU'},runningMode:'VIDEO',numFaces:1,outputFaceBlendshapes:true};
      let backend = 'GPU';
      try { landmarker = await FaceLandmarker.createFromOptions(files, options); }
      catch { options.baseOptions.delegate = 'CPU'; backend = 'CPU'; landmarker = await FaceLandmarker.createFromOptions(files, options); }
      self.postMessage({type:'ready',backend});
    } catch(error) { self.postMessage({type:'error',message:error.message}); }
    return;
  }
  if (data.type !== 'frame') return;
  try {
    const result = landmarker.detectForVideo(data.bitmap, data.timestamp);
    const face = result.faceLandmarks[0];
    const scores = Object.fromEntries((result.faceBlendshapes[0]?.categories || []).map(c=>[c.categoryName,c.score]));
    let turn = 0, pitch = 0;
    if(face) { const a=face[33],b=face[263],n=face[1]; pitch=(n.y-(a.y+b.y)/2)/Math.max(.01,Math.abs(a.x-b.x)); turn=(n.x-(a.x+b.x)/2)/Math.max(.01,Math.abs(a.x-b.x)); }
    self.postMessage({type:'result',face:!!face,left:scores.eyeBlinkLeft || 0,right:scores.eyeBlinkRight || 0,turn,pitch,gazeX:((scores.eyeLookOutRight||0)+(scores.eyeLookInLeft||0)-(scores.eyeLookInRight||0)-(scores.eyeLookOutLeft||0))/2,gazeY:((scores.eyeLookUpLeft||0)+(scores.eyeLookUpRight||0)-(scores.eyeLookDownLeft||0)-(scores.eyeLookDownRight||0))/2});
  } catch(error) { self.postMessage({type:'error',message:error.message}); }
  finally { data.bitmap.close(); }
};
