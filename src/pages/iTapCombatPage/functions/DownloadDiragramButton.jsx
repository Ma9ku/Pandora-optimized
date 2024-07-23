import React from 'react';
import { Panel, useReactFlow, getRectOfNodes, getTransformForBounds } from 'reactflow';
import { toPng } from 'html-to-image';

import exportIcon from '../images/export.svg'
import './downloadButton.scss'
function downloadImage(dataUrl) {
    const a = document.createElement('a');
  
    a.setAttribute('download', 'diagram.png');
    a.setAttribute('href', dataUrl);
    a.click();
}

const imageWidth = 4960;
const imageHeight = 3508;

function DownloadButton({buttonRef}) {
  const { getNodes } = useReactFlow();
  const onClick = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

    toPng(document.querySelector('.react-flow__viewport'), {
      backgroundColor: '#FFFFFF',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then(downloadImage);
  };

  return (
    <Panel position="right-top">
      <div ref={buttonRef} className="download-btn" onClick={onClick}>
        <img src={exportIcon} alt=''/>
        {/* <a>Скачать</a> */}
      </div>
    </Panel>
  );
}

export default DownloadButton;
