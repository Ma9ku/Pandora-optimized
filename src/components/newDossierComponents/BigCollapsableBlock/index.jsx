import React, { useEffect, useState } from 'react';
import { BsArrowsCollapse } from "react-icons/bs";
import './style.scss';
import { useTheme } from '../../../context/themeContext';

function BigCollapsableBlock({ 
    children, 
    switcher = null, 
    switcherText = null, 
    icon, 
    name, 
    defaultOpen = true,
    exist = false
}) {

    const [open, setOpen] = useState(true);
    const { theme } = useTheme();

    const toggleOpen = () => {
        setOpen(prev => !prev);
    };

    return (
        <div className={`big-collapsable-block ${theme}`}>
            {
                exist 
                ? <div className="exist-indicator"></div>
                : null
            }
            <div className={`title ${open ? 'open' : 'closed'}`}>
                {icon}
                <div className="title-text">
                    {name}
                </div>
                {switcher != null && (
                    <div className={`helper-button ${theme}`} onClick={switcher}>
                        {switcherText}
                    </div>
                )}
                <BsArrowsCollapse 
                    onClick={toggleOpen}
                />
            </div>
            <div className={`body ${open ? 'opened' : 'closed'}`}>
                {children}
            </div>
        </div>
    );
}

export default BigCollapsableBlock;
