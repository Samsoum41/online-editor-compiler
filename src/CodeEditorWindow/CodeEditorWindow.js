import Editor from '@monaco-editor/react'
import React, { useState } from 'react'
import { DEFAULT_CODE } from '../CodeEditor/CodeEditor';

export default function CodeEditorWindow({ language, code, onCodeChange }) {
    const EDITOR_HEIGHT = '50rem';
    const EDITOR_WIDTH = '100%';
    const DARK_THEME = 'vs-dark';

    const [value, setValue] = useState(code || '');

    const handleEditorChange = (newValue) => {
        console.log(newValue)
        setValue(newValue);
        onCodeChange(newValue)
    }
    return (
    <div>
        <Editor
            height={EDITOR_HEIGHT}
            width={EDITOR_WIDTH}
            language={language || 'java'}
            theme={DARK_THEME}
            value={value}
            defaultValue={DEFAULT_CODE}
            onChange={handleEditorChange}
        />
    </div>
  )
}
