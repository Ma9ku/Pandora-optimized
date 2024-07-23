import React, { useState } from 'react';
import { BsArrowsCollapse } from "react-icons/bs";
import './style.scss';

function BigCollapsableBlock({ children, icon, name }) {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(prev => !prev);
    };

    return (
        <div className="big-collapsable-block">
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
