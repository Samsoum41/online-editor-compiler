import Editor from '@monaco-editor/react'
import React from 'react'

export default function CodeEditorWindow({ language, onChange, code, theme }) {
    const EDITOR_HEIGHT = '20rem';
    const EDITOR_WIDTH = '20rem';
    const DEFAULD_CODE = '// comment';
    const [value, setValue] = useState(code || '');

    const handleEditorChange = (newValue) => {
        setValue(newValue);
    }
    return (
    <div>
        <Editor
            height={EDITOR_HEIGHT}
            width={EDITOR_WIDTH}
            language={language || 'java'}
            theme={theme}
            defaultValue={DEFAULD_CODE}
            onChange={handleEditorChange}
        />
    </div>
  )
}
