import React from 'react';
import Select from 'react-select';
import { languageOptions } from '../constants/languagesOptions';

export const LANGUAGES_CHOICE = 'Select programming language';

export default function LanguageSelector({ handleLanguageChange }) {
    const customStyles = {
        option: (provided) => ({
            ...provided,
            textAlign: 'left'
        }),
        control: (provided) => ({
            ...provided,
            width: 200
        }) 
    }
    return (
        <Select
            placeholder={LANGUAGES_CHOICE}
            options={languageOptions}
            styles={customStyles}
            onChange={(selectedOption) => handleLanguageChange(selectedOption)}
        />
    );
}
