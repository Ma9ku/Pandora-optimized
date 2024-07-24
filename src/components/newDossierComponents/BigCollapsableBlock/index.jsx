import React, { useEffect, useState } from 'react';
import { BsArrowsCollapse } from "react-icons/bs";
import './style.scss';
import { useTheme } from '../../../context/themeContext';

function BigCollapsableBlock({ children, icon, name, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);
    const { theme } = useTheme();

    const toggleOpen = () => {
        setOpen(prev => !prev);
    };

    return (
        <div className={`big-collapsable-block ${theme}`}>
            <div className={`title ${open ? 'open' : 'closed'}`}>
                {icon}
                <div className="title-text">
                    {name}
                </div>
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
