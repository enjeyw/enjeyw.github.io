import {transition} from './tracking.js';
const $=id=>document.getElementById(id);
const video=$('video');
let worker,stream,running=false,busy=false,starting=false,session=0,lastVideo=-1,captureAt=0,lastResult=0,releaseTimer,watchdog;
let state={closed:false,active:false,releaseAt:0,other:false},demo=false,manual=false,count=0,backend='';
let baseline={gazeX:0,gazeY:0,turn:0,pitch:0.3}, calibration=null, calibrationStart=0;
let frameCount=0,statsAt=0,smoothedLatency=0;
const options=()=>({threshold:+$('threshold').value,hold:+$('hold').value,mode:$('mode').value,gazeThreshold:+$('gaze').value,baseline});
function paint(){const other=manual || demo || state.other;document.body.classList.toggle('other',other);}
function reset(){state={closed:false,active:false,releaseAt:0,other:false};clearTimeout(releaseTimer);paint();}
function apply(sample){
if(calibration && performance.now()>=calibrationStart && sample.face && Math.max(sample.left,sample.right)<0.35){calibration.push(sample);$('calibration-help').textContent=`Keep looking at the centre… ${calibration.length}/25`;if(calibration.length>=25){for(const key of Object.keys(baseline))baseline[key]=calibration.reduce((sum,s)=>sum+s[key],0)/calibration.length;calibration=null;document.body.classList.remove('calibrating');$('calibration-help').textContent='Calibrated. Look away, then look back.';reset();}}
const now=performance.now();const old=state.other;state=transition(state,sample,options(),now);if(state.other&&!old){count++;$('count').textContent=count;}clearTimeout(releaseTimer);if(!state.active&&state.other)releaseTimer=setTimeout(()=>{state.other=false;paint();},Math.max(0,state.releaseAt-now));paint();$('status').textContent=!sample.face?'No face':state.closed?'Eyes closed':state.active?'Looking away':$('mode').value==='gaze'?'Looking at screen':'Eyes open';$('left').value=sample.left;$('right').value=sample.right;}
function stop(message='Camera stopped.'){if(message!=='Camera stopped.')immersive(false);session++;running=false;starting=false;busy=false;clearInterval(watchdog);worker?.terminate();worker=null;stream?.getTracks().forEach(t=>t.stop());stream=null;video.srcObject=null;$('camera-wrap').hidden=true;$('start').disabled=false;$('start').textContent='Start camera ↗';$('status').textContent='Camera off';$('message').textContent=message;$('fps').textContent='—';$('latency').textContent='—';reset();}
async function start(){if(running){stop();return;}if(starting)return;starting=true;const token=++session;$('start').disabled=true;$('status').textContent='Loading…';$('message').textContent='Loading the eye tracker and requesting camera access…';demo=false;manual=false;$('demo').textContent='Try without camera';paint();
try{
  if(!navigator.mediaDevices?.getUserMedia)throw new Error('Camera access requires HTTPS or localhost. Open this page in your browser.');
  stream=await navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:'user',width:{ideal:640},height:{ideal:480},frameRate:{ideal:60}}});
  if(token!==session){stream.getTracks().forEach(t=>t.stop());return;}
  video.srcObject=stream;await video.play();$('camera-wrap').hidden=false;
  worker=new Worker('./worker.js');
  await new Promise((resolve,reject)=>{const timeout=setTimeout(()=>reject(new Error('Tracker download timed out. Check your connection and retry.')),45000);worker.onerror=e=>{clearTimeout(timeout);reject(new Error(e.message||'Tracker could not load.'));};worker.onmessage=({data})=>{if(data.type==='ready'){clearTimeout(timeout);backend=data.backend;resolve();}else if(data.type==='error'){clearTimeout(timeout);reject(new Error(data.message));}};worker.postMessage({type:'init'});});
  if(token!==session)return;
  worker.onerror=e=>stop('Tracker stopped: '+(e.message||'worker error'));
  worker.onmessage=({data})=>{if(token!==session)return;busy=false;if(data.type==='error'){stop('Tracker stopped: '+data.message);return;}if(data.type!=='result')return;lastResult=performance.now();const elapsed=lastResult-captureAt;smoothedLatency=smoothedLatency?smoothedLatency*.8+elapsed*.2:elapsed;frameCount++;apply(data);if(lastResult-statsAt>500){$('fps').textContent=Math.round(frameCount*1000/(lastResult-statsAt));$('latency').textContent=Math.round(smoothedLatency);frameCount=0;statsAt=lastResult;}};
  running=true;starting=false;lastVideo=-1;statsAt=lastResult=performance.now();frameCount=0;smoothedLatency=0;$('start').disabled=false;$('start').textContent='Stop camera';$('status').textContent='Finding eyes…';const rate=stream.getVideoTracks()[0].getSettings().frameRate;$('message').textContent=`Live · ${backend} · camera ${rate?Math.round(rate)+' fps':'rate unknown'}. Blink naturally. Video stays on this device.`;
  stream.getVideoTracks()[0].onended=()=>stop('Camera disconnected. Start again to reconnect.');
  watchdog=setInterval(()=>{if(running&&!document.hidden&&performance.now()-lastResult>3000)stop('Camera or tracker stalled. Start again to reconnect.');},1000);
  schedule(token);
}catch(error){stop(error.name==='NotAllowedError'?'Camera permission was denied. Allow camera access in your browser, then retry.':error.message);}}
function schedule(token){if(!running||token!==session)return;if(video.requestVideoFrameCallback)video.requestVideoFrameCallback(()=>frame(token));else requestAnimationFrame(()=>frame(token));}
async function frame(token){if(!running||token!==session)return;schedule(token);if(busy||video.readyState<2||video.currentTime===lastVideo||document.hidden)return;lastVideo=video.currentTime;busy=true;captureAt=performance.now();try{const bitmap=await createImageBitmap(video);if(!running||token!==session){bitmap.close();return;}worker.postMessage({type:'frame',bitmap,timestamp:captureAt},[bitmap]);}catch(error){if(token===session)stop('Frame capture failed: '+error.message);}}
$('start').onclick=start;
$('demo').onclick=()=>{demo=!demo;$('demo').textContent=demo?'Return to observed image':'Try without camera';paint();};
for(const id of ['hold','threshold','gaze'])$(id).oninput=()=>{$(id+'-value').textContent=id==='hold'?$(id).value+' ms':Number($(id).value).toFixed(2);};
$('mode').onchange=reset;
$('calibrate').onclick=()=>{if(!running){$('calibration-help').textContent='Start the camera first, then calibrate.';return;}calibration=[];calibrationStart=performance.now()+1500;document.body.classList.add('calibrating');$('calibration-help').textContent='Look at the white dot. Keep your eyes open.';};
function immersive(force){const hide=typeof force==='boolean'?force:!document.body.classList.contains('immersed');document.body.classList.toggle('immersed',hide);if(hide&&document.activeElement instanceof HTMLElement)document.activeElement.blur();}
$('immersive').onclick=()=>immersive();
async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{$('message').textContent='Fullscreen is unavailable here. Open the page in a browser tab.';}}
$('full').onclick=()=>{immersive(true);fullscreen();};
window.addEventListener('keydown',e=>{if(e.repeat)return;if(e.key==='Escape'){immersive(false);return;}if(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(['h','p'].includes(e.key.toLowerCase())){e.preventDefault();immersive();return;}if(e.key.toLowerCase()==='f'){e.preventDefault();immersive(true);fullscreen();return;}if(e.code==='Space'&&e.target.tagName!=='BUTTON'){e.preventDefault();manual=true;paint();}});
window.addEventListener('keyup',e=>{if(e.code==='Space'){manual=false;paint();}});
window.addEventListener('blur',()=>{manual=false;paint();});
document.addEventListener('visibilitychange',()=>{reset();lastResult=performance.now();});
window.addEventListener('pagehide',()=>stop());

// Start locally in presentation mode; the browser owns the camera permission prompt.
start();
