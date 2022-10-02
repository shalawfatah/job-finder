import React from 'react';
import {Provider} from 'jotai';
import './src/styles/general.scss';

export const wrapPageElement = ({ element }) => {
    return <Provider>{element}</Provider>
}

export const wrapRootElement = ({ element }) => {
    return <Provider>{element}</Provider>
}