import stringToColor from "./stringToColor";
import { MarkerType } from "reactflow";

export default function paintEdges(nodes, edges, keys) {
    const keyNode = nodes.find(node => keys.includes(node.data.IINBIN || node.data.IIN));
    
    const transformedEdges = nodes.filter(node => node.type == 'edgeNode' && (node.data.source == keyNode?.id || node.data.target == keyNode?.id))

    // console.log("Directly connected edges", transformedEdges)
    const children = nodes.filter(
        node => 
            !keys.includes((node.data.IINBIN || node.data.IIN)) && 
            (node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.target || node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.source )
            )

    const childrenIds = children.map(node => node.id)
    const edgesIds = transformedEdges.map(edge => edge.id)        
    // console.log(childrenIds.length)

    edges = edges.map((link) => {
        let color = stringToColor(keyNode ? keyNode.id.toString() : 'sdasdas')
        if ((link.source == keyNode?.id) || (edgesIds.includes(link.target)) || edgesIds.includes(link.source)) {
            return {
                ...link,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 20,
                    height: 20,
                    color: color,
                },
                style: {
                    strokeWidth: 2,
                    stroke: color,
                },
                colored: true
            }
        } else if (edgesIds.includes(link.source) && childrenIds.includes(link.target)) {
            return {
                ...link,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 20,
                    height: 20,
                    color: color,
                },
                style: {
                    strokeWidth: 2,
                    stroke: color,
                },
                colored: true
            }
        } else {
            return link
        }
    })

    children.forEach(x => {
        edges = assignBinaryTreeColors(x, nodes, edges)
    })

    return edges;
}


function assignBinaryTreeColors(node, nodes, edges) {
    // const nonColoredEdges = edges.find(x => x.colored == false && (x.target == node.id || x.source == node.id))
    // const transformedEdges = nodes.filter(x => x.type == 'edgeNode' && (x.data.source == node.id || x.data.target == node.id))

    // console.log("Directly connected edges", transformedEdges)
    // const children = nodes.filter(
    //     xx => 
    //         (xx.id == transformedEdges.find(x => (x.data.target == xx.id) || (x.data.source == xx.id))?.data.target || xx.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == xx.id))?.data.source )
    //         )

    // const childrenIds = children.map(xx => xx.id)
    // const edgesIds = transformedEdges.map(edge => edge.id)     

    
    let color = stringToColor(node.id.toString())

    edges = edges.map((link) => {

        if (link.style.stroke != 'grey') {
            return {
                ...link,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 20,
                    height: 20,
                    color: color,
                },
                style: {
                    strokeWidth: 2,
                    stroke: color,
                },
                colored: true
            }
        } else {
            return link
        }
    })


    return edges;   
}