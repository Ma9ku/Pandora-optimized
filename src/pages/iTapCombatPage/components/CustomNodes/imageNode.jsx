import React, { memo, useState, useCallback, useEffect } from 'react';
import defaultImageIcon from '../../../../assets/ImageIcon.jpeg';
import './imageNode.scss';

function ImageNode({ initialImageSrc, onClose }) {
    const [scale, setScale] = useState(1); 
    const [visible, setVisible] = useState(true);
    const [position, setPosition] = useState({ x: 1200, y: 100 }); 
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [imageSrc, setImageSrc] = useState(initialImageSrc || defaultImageIcon);

    const handleClose = () => {
        setVisible(false);
        if (onClose) {
            onClose(); 
        }
    };

    const handleWheel = (e) => {
        e.preventDefault(); 


        const scaleFactor = e.deltaY > 0 ? 0.95 : 1.05;


        setScale(prevScale => Math.max(0.1, prevScale * scaleFactor));


        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const dx = mouseX * (1 - scaleFactor);
        const dy = mouseY * (1 - scaleFactor);
        setPosition(prevPosition => ({
            x: prevPosition.x - dx,
            y: prevPosition.y - dy
        }));
    };

    const handleMouseDown = (e) => {
        setDragging(true);
        setStartPosition({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });

        document.body.style.userSelect = 'none';
    };

    const handleMouseMove = (e) => {
        if (dragging) {
            setPosition({
                x: e.clientX - startPosition.x,
                y: e.clientY - startPosition.y
            });
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
        document.body.style.userSelect = '';
    };

    const handleMouseLeave = () => {
        setDragging(false);
        document.body.style.userSelect = ''; 
    };

    useEffect(() => {
 
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {

            const initialWidth = 1200;
            const initialHeight = 1200; 
            const widthScale = initialWidth / img.width;
            const heightScale = initialHeight / img.height;
            const newScale = Math.min(widthScale, heightScale, 1); 
            setScale(newScale);
        };
    }, [imageSrc]);

    if (!visible) {
        return null;
    }

    return (
        <div
            className={`image-node-overlay ${dragging ? 'dragging' : ''}`}
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                transform: `scale(${scale})`,
                transition: dragging ? 'none' : 'transform 0.2s ease',
                zIndex: 1000,
            }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            <div className="image-node-close" onClick={handleClose}>×</div>
            <div className="image-container">
                <img src={imageSrc} alt="logo" className="image-node-img" />
            </div>
        </div>
    );
}

export default memo(ImageNode);
