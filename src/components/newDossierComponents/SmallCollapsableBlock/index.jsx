import React, { useState } from 'react';
import './style.scss';
import { FaAngleDown } from 'react-icons/fa6';

function SmallCollapsableBlock({ children, icon, name, count }) {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(prev => !prev);
    };

    return (
        <div className="small-collapsable-block">
            <div className={`title ${open ? 'open' : ''}`}>
                <div 
                    className="title-text"
                    onClick={toggleOpen}
                >
                    {icon ? icon : null}
                    <span>{name} {count ? `(${count})` : ''}</span>
                </div>
                <FaAngleDown 
                    onClick={toggleOpen}
                />
            </div>
            <div className={`body ${open ? 'opened' : 'closed'}`}>
                {children}
            </div>
        </div>
    );
}

export default SmallCollapsableBlock;
