import React from 'react';
import Select from 'react-select';
import { languageOptions } from '../constants/languagesOptions';

export const LANGUAGES_CHOICE = 'Select programming language';

export default function LanguageSelector({ handleLanguageChange }) {
    return (
        <Select
            placeholder={LANGUAGES_CHOICE}
            options={languageOptions}
            onChange={(selectedOption) => handleLanguageChange(selectedOption)}
        />
    );
}
