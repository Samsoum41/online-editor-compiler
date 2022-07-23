import React from 'react';
import monacoThemes from "monaco-themes/themes/themelist";
import Select from 'react-select';

export default function ThemeSelector({ theme, handleThemeChange }) {
    return (
        <Select
            options={Object.entries(monacoThemes).map(([ themeName, themeId ]) => ({
                label: themeName,
                value: themeId,
                key: themeId
            }))}
            value={theme}
            onChange={handleThemeChange}
        />
    )
}
