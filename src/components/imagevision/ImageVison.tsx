import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import * as mobilenet from '@tensorflow-models/mobilenet'

import { ResultProbability } from './ResultProbability'

interface Props {
    
}

export const ImageVison = (props: Props) => {

    const [file, setFile] = useState<any>(null)
    const [result, setResult] = useState<{'className': string, 'probability': number}[]>([])
    const classes = useStyles()

   let handleCapture = async (target: any) => {
        const fileReader = new FileReader();
       if(!target.files) return;
        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            setFile(e.target?.result)
        };

        setResult([]);
         classify();

        
    };

    let classify = async () => {
        let mimage: any = document.getElementById('mimage');
        let model = await mobilenet.load();
        let result: {'className': string, 'probability': number}[] = await model.classify(mimage);

        setResult(result);



    }

    return (
        <div className={classes.container}>
            {<img src={file || ''} width="300" height="400" alt="Select file" id='mimage' />}
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

            {result.length > 0  && <ResultProbability results={result}></ResultProbability> }
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
    }),
  )