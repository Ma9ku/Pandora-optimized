import { useEffect, useCallback, useRef, useState } from "react";
import ReactFlow, {
    addEdge,
    updateEdge,  
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
} from 'reactflow';

import transformDataForReactFlow from "../functions/transformDataForReactFlow";

import response from "../samles/apiResponseExample";
import DownloadButton from "../functions/DownloadDiragramButton";

import CustomNode from "../samles/CustomNode";
import QuadricNode from "../components/CustomNodes/QuadricNode";
import PhotoNode from "../components/CustomNodes/PhotoNode";
import relationNode from "../components/CustomNodes/relationNode";
import SetEdgeLabelModal from "../components/EdgeLabelSetterModal/setEdgeLabelModal";


import CustomEdge from "../components/CustomEdges/CustomEdge";

import 'reactflow/dist/style.css';
import '../samles/overview.css'

import assignGridPositions from "../functions/AssignGridPositions";
import generateUniqueId from "../functions/createUniqueIdGenerator";
import paintEdges from "../functions/paintEdgesHierarchicaly";

const nodeTypes = {
    quadric: QuadricNode,
    custom: CustomNode,
    photic: PhotoNode,
    edgeNode: relationNode,
  
  };

const edgeTypes = {
    quadric: CustomEdge
}

const minimapStyle = {
    height: 120,
};
  
const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);
  

function N4JDiagram({deleteRef, setSelectionStarted, buttonRef, edgeStraight, shortOpen, keys, rnodes, redges, setGlobalNodes, setGlobalEdges}) {
    const { initialNodes, initialEdges } = transformDataForReactFlow(rnodes, redges, keys);
    // const { initialNodes, initialEdges } = transformDataForReactFlow(response);
    const edgeUpdateSuccessful = useRef(true);

    const [nodes, setNodes, onNodesChange] = useNodesState(assignGridPositions(initialNodes, keys, 0, 0, 300, 1000));
    const [edges, setEdges, onEdgesChange] = useEdgesState(paintEdges(nodes, initialEdges, keys));
    const [zoomOnScroll, setZoomOnScroll] = useState(true);

    const [selectedElements, setSelectedElements] = useState([])

    const deleteSelectedElements = () => {
        if (!selectedElements) return;
    
        const selectedNodeIds = new Set(selectedElements.nodes?.map(node => node.id));
        const selectedEdgeIds = new Set(selectedElements.edges?.map(edge => edge.id));
    
        // Filter out selected nodes and edges
        const newNodes = nodes.filter(node => !selectedNodeIds.has(node.id));
        const newEdges = edges.filter(edge => !selectedEdgeIds.has(edge.id) && !selectedNodeIds.has(edge.source) && !selectedNodeIds.has(edge.target));
    

        setNodes(newNodes);
        setEdges(newEdges);
        try {
            const newGlobalNodes = rnodes.filter(node => !selectedNodeIds.has(node.id.toString()));
            
            console.log(selectedNodeIds)
            
            setGlobalNodes(newGlobalNodes);
        } catch (e) {
            console.log(e)
        }
        try {
            const newGlobalEdges = redges.filter(edge => !selectedEdgeIds.has(edge.id.toString()));
            setGlobalEdges(newGlobalEdges);
            console.log(newGlobalEdges)

        } catch (e) {
            console.log(e)
        }
        setSelectedElements([]); // Clear selection
    };
 
    useEffect(() => {
        if (selectedElements.nodes?.length > 0) {
            setSelectionStarted(true)
        } else {
            setSelectionStarted(false)
        }
    }, [selectedElements])

    const countEdgesBetweenNodes = (source, target, edgesArray) => {
        return edgesArray.filter((e) => 
        (e.source === source && e.target === target) || (e.source === target && e.target === source)
        ).length;
    };

    useEffect(() => {
        if (edgeStraight) {
            const edgesWithTypes = edges.map((edge) => {
            return {
                ...edge,
                type: 'straight',
            };
            });
        
            setEdges(edgesWithTypes);
        } else {
            const edgesWithTypes = edges.map((edge) => {
            return {
                ...edge,
                type: 'smoothstep',
            };
            });
        
            setEdges(edgesWithTypes);

        }
    }, [edgeStraight])
    
    useEffect(() => {
        // Map through your initial edges to set the correct type
        const edgesWithTypes = initialEdges.map((edge) => {
        const count = countEdgesBetweenNodes(edge.source, edge.target, initialEdges);
    
        // If there's more than one edge between the nodes, use 'quadric', otherwise 'smoothstep'
        const edgeType = count > 1 ? 'quadric' : 'smoothstep';
    
        return {
            ...edge,
            type: edgeType,
            // You can adjust the curvature and style based on the edge type here if needed
            data: { ...edge.data, curvature: edgeType === 'quadric' ? 0.5 : 0 },
        };
        });
    
        setEdges(edgesWithTypes);
    }, []);

    useEffect(() => {
        let {initialNodes, initialEdges} = (transformDataForReactFlow(rnodes, redges, keys))
        setNodes(assignGridPositions(initialNodes, keys, 0, 0, 300, 200))
        setEdges(initialEdges)
    }, [rnodes, redges])
    
    const handleDoubleClick = (event, node) => {
        // console.log('Node double-clicked:', node)
        shortOpen(node.id)
    }

    //Delete node
    const onDeleteNode = useCallback((nodeId) => {
        setNodes((nds) => nds.filter((n) => n.id !== nodeId));
        setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
    }, [setNodes, setEdges]);
    
    //Create Node
    const createNodeAndConnect = (sourceNodeId, newLabel, newColor, EditImage, onlyPhoto) => {
        const newNodeId = generateUniqueId(); // Generate a unique ID for the new node
        if(onlyPhoto){
            const newNode = {
              id: newNodeId,
              type: "photic", // or any custom type you have
              data: { type: "created", photo: EditImage, onlyPhoto: onlyPhoto },
              position: { x: 100, y: 100 }, // Set the position as required
            };
            const newEdge = {
              id: `e${sourceNodeId}-${newNodeId}`,
              target: sourceNodeId,
              source: newNodeId,
              data: { curvature: 3 + 12 },
              type: "smoothstep", // or any other type
              // additional edge properties as needed
            };
        
            setNodes((nds) => nds.concat(newNode));
            setEdges((eds) => eds.concat(newEdge));
          }else{
            
            const newNode = {
              id: newNodeId,
              type: "quadric", // or any custom type you have
              data: { type: "created", Name: newLabel, color: newColor, photo: EditImage, onlyPhoto: onlyPhoto },
              position: { x: 100, y: 100 }, // Set the position as required
            };
            const newEdge = {
              id: `e${sourceNodeId}-${newNodeId}`,
              target: sourceNodeId,
              source: newNodeId,
              data: { curvature: 3 + 12 },
              type: "smoothstep", // or any other type
              // additional edge properties as needed
            };
            setNodes((nds) => nds.concat(newNode));
            setEdges((eds) => eds.concat(newEdge));
        }
        
    

    };
    
    //For connection modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingConnection, setPendingConnection] = useState(null);

    // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const onConnect = useCallback((params) => {
        // Open the modal and save the connection params for later use
        setIsModalOpen(true);
        setPendingConnection(params);
    }, []);
    
    const handleModalSubmit = (label) => {
        // Create the edge with the label and add it
        const newEdge = { ...pendingConnection, label,  type: 'smoothstep' };
        setEdges((eds) => addEdge(newEdge, eds));
        
        // Close the modal
        setIsModalOpen(false);
    };

    const onEdgeUpdateStart = useCallback(() => {
        edgeUpdateSuccessful.current = false;
    }, []);

    const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
        edgeUpdateSuccessful.current = true;
        setEdges((els) => updateEdge(oldEdge, newConnection, els));
    }, []);

    const onEdgeUpdateEnd = useCallback((_, edge) => {
        if (!edgeUpdateSuccessful.current) {
            setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }
        edgeUpdateSuccessful.current = true;
    }, []);

    const [selectedNodeIds, setSelectedNodeIds] = useState(new Set());

  const onNodeClick = useCallback((event, node) => {
    // Toggle selection
    if (selectedNodeIds.has(node.id)) {
      selectedNodeIds.delete(node.id);
    } else {
      selectedNodeIds.add(node.id);
    }
    setSelectedNodeIds(new Set(selectedNodeIds));
  }, [selectedNodeIds]);

  const onNodesDrag = useCallback(({ nodes: draggedNodes }) => {
    const updates = draggedNodes.map(draggedNode => {
      if (selectedNodeIds.has(draggedNode.id)) {
        // Find the original node and calculate the new position
        const originalNode = nodes.find(n => n.id === draggedNode.id);
        return {
          ...originalNode,
          position: draggedNode.position
        };
      }
      return null;
    }).filter(Boolean);
    
    setNodes(ns => ns.map(node => {
      const update = updates.find(u => u.id === node.id);
      return update || node;
    }));
  }, [nodes, selectedNodeIds, setNodes]);


    return (
        <>
            {isModalOpen && (
                <SetEdgeLabelModal
                    onSubmit={handleModalSubmit}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            <button ref={deleteRef} style={{display: 'none'}} onClick={() => deleteSelectedElements()}></button>
            <ReactFlow
                nodes={nodes.map(node => ({ 
                    ...node, 
                    data: { ...node.data, 
                        onDeleteNode, 
                        createNodeAndConnect,
                        setZoomOnScroll } 
                }))}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onEdgeUpdate={onEdgeUpdate}
                onEdgeUpdateStart={onEdgeUpdateStart}
                onEdgeUpdateEnd={onEdgeUpdateEnd}
                onConnect={onConnect}
                onSelectionChange={setSelectedElements}
                onInit={onInit}
                fitView
                attributionPosition="top-right"
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                zoomOnScroll={zoomOnScroll}
                onNodeDoubleClick={handleDoubleClick}
                minZoom={0.01}
                maxZoom={10}
                onNodeClick={onNodeClick}
                onNodesDrag={onNodesDrag}
                >
                {/* <MiniMap style={minimapStyle} zoomable pannable /> */}
                {/* <Controls /> */}
                {/* <Background color="#aaa" gap={16} /> */}
                <DownloadButton buttonRef={buttonRef}></DownloadButton>
            </ReactFlow>
        </>
    );
}

export default N4JDiagram;
