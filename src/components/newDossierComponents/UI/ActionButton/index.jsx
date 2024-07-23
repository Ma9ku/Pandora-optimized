import React, { useState, useEffect } from 'react';

import './style.scss';

function ActionButton({
    onClick,
    value
}) {
    return ( 
        <button
            className='action-button'
            onClick={() => onClick}
        >{value}</button>
    );
}

export default ActionButton;