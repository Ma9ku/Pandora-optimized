import React, { useState, useEffect } from 'react';

import './style.scss';
import { useTheme } from '../../../../context/themeContext';

function ActionButton({
    onClick = () => {},
    value
}) {
    const { theme } = useTheme();

    return ( 
        <button
            className={`action-button ${theme}`}
            onClick={() => onClick()}
        >{value}</button>
    );
}

export default ActionButton;