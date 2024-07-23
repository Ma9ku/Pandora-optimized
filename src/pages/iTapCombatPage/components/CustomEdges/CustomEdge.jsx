import React, {useCallback} from 'react';
import { useStore, getBezierPath,getMarkerEnd, EdgeText, MarkerType, Position } from 'reactflow';
import { getEdgeParams } from './utils';
// Assuming getSpecialPath is defined here or imported

const getEdgeOffset = (source, target, edges, defaultOffset = 25) => {
  const samePairEdges = edges.filter(
    (e) => (e.source === source && e.target === target) || (e.source === target && e.target === source)
  );

  return samePairEdges.map((_, index) => {
    const direction = index % 2 === 0 ? 1 : -1;
    const magnitude = Math.ceil(index / 2) * defaultOffset;
    return direction * magnitude;
  });
};

const getSpecialPath = ({ sourceX, sourceY, targetX, targetY }, offset) => {
    // Calculate the midpoint for the control point
    const midX = (sourceX + targetX) / 2;
    const midY = (sourceY + targetY) / 2;

    // Adjust the control point's y-coordinate by the offset
    const controlX = midX;
    const controlY = midY + offset;

    // Generate the SVG path command for a quadratic bezier curve
    const path = `M${sourceX},${sourceY} Q${controlX},${controlY} ${targetX},${targetY}`;

    return path;
};

// const CustomEdge = ({ id, source, label, target, sourceX, sourceY, targetX, targetY, style, data, arrowHeadType }) => {
//   const edges = useStore((store) => store.edges);
//   const offsets = getEdgeOffset(source, target, edges);
//   const edgeIndex = edges.findIndex((e) => e.id === id);
//   const offset = offsets[edgeIndex] || 0;

//   const path = getSpecialPath({ 
//     sourceX, 
//     sourceY, 
//     targetX, 
//     targetY }, offset);
// //   const markerEnd = getMarkerEnd(arrowHeadType, MarkerType.ArrowClosed);
  

// //   return (
// //     <>
// //       <path id={id} style={style} className="react-flow__edge-path" d={path} markerEnd={markerEnd} />
// //       {/* Assuming you want to include a label or other elements */}
// //       <EdgeText
// //         x={(sourceX + targetX) / 2}
// //         y={(sourceY + targetY) / 2 + offset}
// //         label={label}
// //         labelStyle={data.labelStyle}
// //         labelShowBg={data.labelShowBg}
// //         labelBgStyle={data.labelBgStyle}
// //         labelBgPadding={data.labelBgPadding}
// //         labelBgBorderRadius={data.labelBgBorderRadius}
// //       />
// //     </>
// //   );
//     const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
//     const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

//     if (!sourceNode || !targetNode) {
//     return null;
//     }

//     const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

//     const [edgePath] = getBezierPath({
//         sourceX: sx,
//         sourceY: sy,
//         sourcePosition: sourcePos,
//         targetPosition: targetPos,
//         targetX: tx,
//         targetY: ty,
//     });

//     return (
//         <>
//         <path
//             id={id}
//             className="react-flow__edge-path"
//             d={edgePath}
//             markerEnd={MarkerType.ArrowClosed}
//             style={style}
//             />
//         <EdgeText
//             x={(sourceX + targetX) / 2}
//             y={(sourceY + targetY) / 2 + offset}
//             label={label}
//             labelStyle={data.labelStyle}
//             labelShowBg={data.labelShowBg}
//             labelBgStyle={data.labelBgStyle}
//             labelBgPadding={data.labelBgPadding}
//             labelBgBorderRadius={data.labelBgBorderRadius}
//         />
//         </>
//     );
// };
const CustomEdge = ({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
  arrowHeadType,
  markerEndId,
}) => {
  const edgeCenterX = (sourceX + targetX) / 2;
  const edgeCenterY = (sourceY + targetY) / 2;

  // Here you can include any edge property you want to display
  const edgeProperties = data.label; // Example property

  return (
    <>
      <path
        id={id}
        d={getBezierPath({ sourceX, sourceY, targetX, targetY })}
        className="react-flow__edge-path"
        markerEnd={getMarkerEnd(arrowHeadType, markerEndId)}
      />
      <foreignObject width="100" height="50" x={edgeCenterX - 50} y={edgeCenterY - 25} className="edge-properties-container">
        <div xmlns="http://www.w3.org/1999/xhtml" className="edge-properties">
          {edgeProperties}
          {/* Include more properties as needed */}
        </div>
      </foreignObject>
    </>
  );
};

export default CustomEdge;
