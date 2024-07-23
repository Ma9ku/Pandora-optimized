import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

import './quadricNode.scss'

function AddressNode({ id, data }) {
  return (
    <div className='quadric-node' style={{backgroundColor: "#97C30A"}}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
      <div className="node-header">
        {data.FIO}
      </div>
      <div className="node-body">
        ИИН: {data.IIN}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ background: '#555' }}
      />
    </div>
  );
}

export default memo(AddressNode);