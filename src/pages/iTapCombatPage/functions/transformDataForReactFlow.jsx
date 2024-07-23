import { MarkerType } from "reactflow";
import stringToColor from "./stringToColor";
import paintEdges from "./paintEdgesHierarchicaly";
import { allRelations, allVisibleRelations } from "../../../data/relationsData";

const transformDataForReactFlow = (nodes, edges, keys) => {
  let idCounter = 10000; // Start an ID counter for new edge-nodes to avoid ID conflicts
  // Transform nodes
  const transformedNodes = nodes.map((node) => {
    let nodeType = 'person';
    if (node.properties.FIO) {
      nodeType = 'person';
    } else if (node.properties.Type === 'ЮЛ' || node.properties.FullNameIP) {
      nodeType = 'company';
    } else if (node.properties.PKA) {
      nodeType = 'address';
    }

    return {
      id: node.id.toString(),
      type: 'quadric',
      data: {...node.properties, type: nodeType, photo: node.photoDbf?.photo},
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
  });

  // Initialize arrays to store the new edge-nodes and connecting edges
  const edgeNodes = [];
  const connectingEdges = [];

  // Transform edges into edge-nodes and connecting edges
  edges.forEach((edge) => {
    let target = nodes.find(x => x.id == edge.to.toString())
    let source = nodes.find(x => x.id == edge.from.toString())
    if (target && source) {
      const edgeNodeId = `edge-node-${idCounter++}`; // Unique ID for the edge-node
      let color = stringToColor(edge.to.toString())
      // Create an edge-node for each edge
      edgeNodes.push({
        id: edgeNodeId,
        type: 'edgeNode', // This can be a custom node type designed to look like an edge
        data: { ...edge.properties, label: allVisibleRelations.find(x => x.value == edge.type).label, type: 'edge', source: edge.from, target: edge.to},
        position: { x: Math.random() * 400, y: Math.random() * 400 },
      });
  
      // Create connecting edges: source to edge-node
      connectingEdges.push({
        id: `e-${edge.from}-${edgeNodeId}`,
        source: edge.from.toString(),
        target: edgeNodeId,
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: 'grey',
        },
        style: {
            strokeWidth: 2,
            stroke: 'grey',
        } 
      });
  
      // Create connecting edges: edge-node to target
      connectingEdges.push({
        id: `e-${edgeNodeId}-${edge.to}`,
        source: edgeNodeId,
        target: edge.to.toString(),
        type: 'smoothstep',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: 'grey',
        },
        style: {
            strokeWidth: 2,
            stroke: 'grey',
        } 
      });
    }
  });
  // Combine original nodes with edge-nodes
  const combinedNodes = [...transformedNodes, ...edgeNodes];
  // Use the new connecting edges instead of the original edges
  const combinedEdges = [...connectingEdges];

  // console.log(responseData.keys)
  // console.log(paintEdges(combinedNodes, combinedEdges, responseData.keys))
  // // const ed = paintEdges(combinedNodes, combinedEdges, keys)
  // console.log("asdasd",responseData.keys)

  //COLORING
  // const keyNode = combinedNodes.find(node => keys.includes(node.data.IINBIN || node.data.IIN));
    
  // const transformedEdges = combinedNodes.filter(node => node.type == 'edgeNode' && (node.data.source == keyNode.id || node.data.target == keyNode.id))

  // // console.log("Directly connected edges", transformedEdges)
  // const children = combinedNodes.filter(
  //     node => 
  //         (node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.target || node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.source )
  //         )

  // const childrenIds = children.map(node => node.id.toString())
  // const edgesIds = transformedEdges.map(edge => edge.id.toString())        

  // let comEdges = combinedEdges.map((link) => {
  //     let color = stringToColor(keyNode.id.toString())
  //     console.log(link.target)
     
  //     return {
  //         ...link,
  //         markerEnd: {
  //             type: MarkerType.ArrowClosed,
  //             width: 20,
  //             height: 20,
  //             color: color,
  //         },
  //         style: {
  //             strokeWidth: 2,
  //             stroke: color,
  //         } 
  //     }
  // })
  const comEE = paintEdges(combinedNodes, combinedEdges, keys)
  return { initialNodes: combinedNodes, initialEdges: comEE };
};

export default transformDataForReactFlow;
