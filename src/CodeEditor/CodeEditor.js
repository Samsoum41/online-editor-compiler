import React, { useState } from 'react';
import ThemeSelector from '../ThemeSelector/ThemeSelector';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import monacoThemes from "monaco-themes/themes/themelist.json";
import './CodeEditor.css';
import CodeEditorWindow from '../CodeEditorWindow/CodeEditorWindow';
import { Button } from '@mui/material';
import axios from 'axios';
import ShowOutputDetails from '../ShowOutputDetails/ShowOutputDetails';


export const DEFAULT_CODE = '// comment';

export default function CodeEditor() { 
    const [DEFAULT_THEME_ID, DEFAULT_THEME_LABEL] = [0, monacoThemes.active4d];
    const DEFAULT_THEME = {
        label: DEFAULT_THEME_LABEL,
        value: DEFAULT_THEME_ID,
        key: DEFAULT_THEME_ID
    };
    const DEFAULT_LANGUAGE = 'java';
    const [language, setLanguage] = useState(DEFAULT_LANGUAGE)
    const [code, setCode] = useState(DEFAULT_CODE)
    const [isProcessing, setIsProcessing] = useState(false);
    const [outputDetails, setOutputDetails] = useState(null);
    const [customInput, setCustomInput] = useState(null);


    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    };

    const handleCompile = () => {;
        setIsProcessing(true);
        const formData = {
          language_id: language.id,
          source_code: btoa(code),
          stdin: btoa("sa"),
        };
        const postOptions = {
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: {base64_encoded: 'true', fields: '*'},
            headers: {
              'content-type': 'application/json',
              'Content-Type': 'application/json',
              'X-RapidAPI-Key': '85fb488432mshd0c688f10332affp134adbjsn3f3c09d90548',
              'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            },
            data: formData,
        };
        console.log(postOptions);
    
        axios.request(postOptions).then((response) => {
            console.log("res.data", response.data);
            const token = response.data.token;
            checkStatus(token);
        }).catch((err) => {
            let error = err.response ? err.response.data : err;
            setIsProcessing(false);
            console.log(error);
        });
    };

    const checkStatus = async (token) => {
        const getOptions = {
          method: "GET",
          url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
          params: { base64_encoded: "true", fields: "*" },
          headers: {
            "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          },
        };
        try {
          let response = await axios.request(getOptions);
          let statusId = response.data.status?.id;
    
          // Processed - we have a result
          if (statusId === 1 || statusId === 2) {
            // still processing
            setTimeout(() => {
              checkStatus(token)
            }, 1500)
            return
          } else {
            setIsProcessing(false)
            setOutputDetails(response.data)
            // showSuccessToast(`Compiled Successfully!`)
            console.log('response.data', response.data)
            return
          }
        } catch (err) {
          console.log("err", err);
          setIsProcessing(false);
        //   showErrorToast();
        }
      };

    return (
        <div className='container'>
            <header className='selectors-container'>
                <LanguageSelector
                    language={language}
                    handleLanguageChange={handleLanguageChange}
                />
            </header>
            <div className='editor-container'>
                <CodeEditorWindow
                    code={code}
                    onCodeChange={setCode}
                    language={language?.value}
                />
            </div>
            <footer className='footer-container'>
                <div className='buttons-container'>
                    <Button
                        variant='contained'
                        color={isProcessing ? 'warning' : 'primary' }
                        // className={isProcessing ? 'run-button-processing' : 'run-button' }
                        onClick={handleCompile}
                    >
                        {isProcessing ? 'Processing...' : 'Run code' }
                    </Button>
                </div>
                {outputDetails &&
                    <div className='output-container'>
                        <ShowOutputDetails
                            outputDetails={outputDetails}
                        />
                    </div>
                }
            </footer>
        </div>
    )
}
