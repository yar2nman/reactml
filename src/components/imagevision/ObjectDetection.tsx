import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

// import * as mobilenet from '@tensorflow-models/mobilenet'
import * as cocossd from '@tensorflow-models/coco-ssd'
import * as tf from '@tensorflow/tfjs'

import '@tensorflow/tfjs-backend-wasm';
// import { ResultProbability } from './ResultProbability'
import { DetectedObject } from '@tensorflow-models/coco-ssd'
import { ResultProbability } from './ResultProbability'

import logo from '../../assets/logo.png'


interface Props {
    
}

export const ObjectDetection = (props: Props) => {

    const [file, setFile] = useState<any>(null)
    const [wasmReady, setWasmReady] = useState(false)
    const [result, setResult] = useState<DetectedObject[]>([])
    const classes = useStyles()
    

    

   let handleCapture = async (target: any) => {
        const fileReader = new FileReader();
       if(!target.files) return;
        fileReader.readAsDataURL(target.files[0]);
        console.log(`object`, target.files[0])
        fileReader.onload = (e) => {
            setFile(e.target?.result);
        };
        console.log(file);

        setResult([]);
        !wasmReady
        ? tf.setBackend('wasm').then(r => {
            setWasmReady(true);
            detect();
        })
        : detect();

        
    };

    let detect = async () => {
        let mimage: any = document.getElementById('mimage');
        let model = await cocossd.load();
        let result: DetectedObject[] = await model.detect(mimage);
        console.log(`result`, result);

        console.log(`result of detection`, result)

        setResult(result);

        drawRects(result);


    }

    let drawRects = (result: DetectedObject[]) => {
        const canvas: any = document.getElementById('canvas'); 
                const context = canvas?.getContext('2d'); 
                canvas.setAttribute('height', '500');
    
    
                const img = document.getElementById('mimage') as HTMLImageElement;
                img.setAttribute('style', '{object-fit: "cover"}')
                img.autofocus = true;
                context.drawImage(img, 0, 0, 500, 600); 
                
                for (let index = 0; index < result.length; index++) {
                    context.lineWidth = "3";
                    context.strokeStyle = "red";
                    context.strokeRect(result[index].bbox[0], result[index].bbox[1], result[index].bbox[2], result[index].bbox[3]);
    
                    
                }
                
            };

    return (

 
        <div className={classes.container}>
            <img src={file ||logo} width="500" height="600" alt="" id='mimage' className={classes.minmg}/>
            <br/>
            <canvas id="canvas" width="500" height="10" ></canvas>
            <br/>
            <Button
                variant="contained"
                component="label"
            >
                Select File
                <input
                    type="file"
                    accept="image/*" multiple={false}
                    hidden
                    onChange={(e) => handleCapture(e.target)}
                />
            </Button>

            <br/>

            {result.length > 0  && <ResultProbability results={result.map(r =>{ return {className: r.class, probability: r.score}})}></ResultProbability> }
        </div>
    )
}


const useStyles = makeStyles(theme =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            alignItems: 'flex-start',
            padding: 13,
                },
      menuItemIcon: {
        color: '#97c05c',
      },
      minmg: {
        // resizeMode: "contain",
        object_fit: 'cover',
      }
    }),
  )



