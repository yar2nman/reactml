import React, {useState} from 'react';
import './style.css';

import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

import * as cocoSsd from '@tensorflow-models/coco-ssd';


export default function TfImageTutorial()
{
  let model: any = null;
  const video: any =   React.createRef();
  const liveView: any = React.createRef();
  const demosSection: any = React.createRef();
  const enableWebcamButton: any =  React.createRef();

  const constraints = {
    video: true
  };

  const [Classname, setClassname] = useState<string>('invisible');
  const [ButtonClassName, setButtonClassName] = useState<string>('removed');
//   const [vidSource, setvidSource] = useState<any>(null);



function enableCam(_event: any) {
  if (!model) {
    return;
  }
  // console.log('enable cam')
  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    video.current.srcObject = stream;
    // console.log(stream);
    video.current.addEventListener('loadeddata', predictWebcam);
  });
}
function disableCam(_event: any) {

    window.location.reload();

    // navigator.mediaDevices.getUserMedia(constraints).then(r => r.getVideoTracks().forEach(r => r.stop()));
  
    // video.current.removeEventListener('loadeddata', predictWebcam);
    // for (let i = 0; i < children.length; i++) {
    //     liveView.current.removeChild(children[i]);
    //   }
    // children.splice(0);
    // // console.log('disable cam')
    // video.current.srcObject = null;
    // children.splice(0);
    
  
}

  // console.log('Start Loading');

  cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  // Show demo section now model is ready to use.
  setClassname('');
  setButtonClassName('')
  // console.log('model loaded');
});

// console.log('after model loading');

var children: any[] = [];

function predictWebcam() {
  // Now let's start classifying a frame in the stream.
  if (video.current.readyState !== 4) return;
  model.detect(video.current).then(function (predictions: any) {
    // Remove any highlighting we did previous frame.
    for (let i = 0; i < children.length; i++) {
      liveView.current.removeChild(children[i]);
    }
    children.splice(0);
    
    // Now lets loop through predictions and draw them to the live view if
    // they have a high confidence score.
    for (let n = 0; n < predictions.length; n++) {
      // If we are over 66% sure we are sure we classified it right, draw it!
      if (predictions[n].score > 0.30) {
        const p = document.createElement('p');
        p.innerText = predictions[n].class  + ' - with ' 
            + Math.round(parseFloat(predictions[n].score) * 100) 
            + '% confidence.';
        
        p.setAttribute('style',
                `margin-left: ${predictions[n].bbox[0]}px;
                 margin-top: ${(predictions[n].bbox[1] - 10)}px;
                 width: ${(predictions[n].bbox[2] - 10)}px;
                 top: 0;
                 left: 0;
                 `)
        // p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
        //     + (predictions[n].bbox[1] - 10) + 'px; width: ' 
        //     + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';

        const highlighter = document.createElement('div');
        highlighter.setAttribute('class', 'highlighter');

        highlighter.setAttribute('style', `
            left: ${predictions[n].bbox[0]}px;
            top: ${predictions[n].bbox[1]}px;
            width: ${predictions[n].bbox[2]}px;
            height: ${predictions[n].bbox[3]}px;
        `)

        liveView.current.appendChild(highlighter);
        liveView.current.appendChild(p);
        children.push(highlighter);
        children.push(p);
      }
    }
    
    // Call this function again to keep predicting when the browser is ready.
    window.requestAnimationFrame(predictWebcam);
  });
}


return (
  <>
  <h1>Multiple object detection using pre trained model in TensorFlow.js</h1>

    <p>Wait for the model to load before clicking the button to enable the webcam - at which point it will become visible to use.</p>
    
    <section id="demos" className={Classname} ref={demosSection}>

      <p>Hold some objects up close to your webcam to get a real-time classification! When ready click "enable webcam" below and accept access to the webcam when the browser asks (check the top left of your window)</p>
      
      <div id="liveView" className="camView" ref={liveView}>
        <button id="webcamButton" ref={enableWebcamButton} onClick={enableCam} className={ButtonClassName}>Enable Webcam</button>
        <button id="webcamDisable" onClick={disableCam} className={ButtonClassName}>Disable Webcam</button>
        <video id="webcam" autoPlay width="640" height="480" ref={video} >

        </video>
      </div>
    </section>
    </>
);
}
