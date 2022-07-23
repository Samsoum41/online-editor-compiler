import React, { useState } from 'react';
import ThemeSelector from '../ThemeSelector/ThemeSelector';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import monacoThemes from "monaco-themes/themes/themelist.json";
import './CodeEditor.css';
import CodeEditorWindow from '../CodeEditorWindow/CodeEditorWindow';
import { Button } from '@mui/material';


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

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage.value);
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
                    language={language}
                />
            </div>
            <footer className='buttons-container'>
                <Button variant="contained">
                    Run code
                </Button>
            </footer>
        </div>
    )
}
