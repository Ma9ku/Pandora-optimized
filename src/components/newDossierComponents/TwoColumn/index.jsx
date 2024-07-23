import React, { useState, useEffect } from 'react';

import './style.scss'; 

function TwoColumn({
    children
}) {
    return ( 
        <div className="two-column">
            {children}
        </div>
    );
}

export default TwoColumn;