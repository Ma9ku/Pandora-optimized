export default function assignGridPositions(nodes, keys, startX, startY, gapX, gapY) {
    const keyNode = nodes.find(node => keys.includes(node.data.IINBIN || node.data.IIN));
    // console.log(keyNode)
    if (keyNode) {

        const transformedEdges = nodes.filter(node => node.type == 'edgeNode' && (node.data.source == keyNode.id || node.data.target == keyNode.id))
        // console.log("Directly connected edges", transformedEdges)
        const companies = nodes.filter(
            node => 
                !keys.includes((node.data.IINBIN || node.data.IIN)) && 
                (node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.target || node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.source ) &&
                node.data.type == 'company'
                )
        const persons = nodes.filter(
            node => 
                !keys.includes(node.data.IINBIN || node.data.IIN) && 
                (node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.target || node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.source ) &&
                node.data.type == 'person'
                )
        const addresses = nodes.filter(
            node => 
                !keys.includes(node.data.IINBIN || node.data.IIN) && 
                (node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.target || node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.source ) &&
                node.data.type == 'address'
                )
    
        // const resNodes = nodes.filter(
        //     node => !keys.includes(node.data.IINBIN || node.data.IIN) && 
        //         (node.id != transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.target || node.id != transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.source )
        //         )
    
    
        // console.log("Result", addresses)
    
        // Assuming 'quadric' nodes are directly related and others need special handling
        const directlyRelatedNodes = nodes.filter(node => !keys.includes(node.data.IINBIN || node.data.IIN) && node.type === 'quadric');
        const otherNodes = nodes.filter(node => !keys.includes(node.data.IINBIN || node.data.IIN) && node.type !== 'quadric');
    
        // Position the key node
        if (keyNode) {
            // console.log("keynode", keyNode)
            keyNode.position = { x: startX, y: startY - 70};
            keyNode.located = true
            keyNode.data.key = true
        }
    
        let currentX = startX - (companies.length * (gapX + 100)) 
        companies.forEach(node => {
            if (keys.includes(node.data.IINBIN || node.data.IIN)) {
                node.data.key = true
            }
            node.position = { x: currentX, y: startY + (gapY * 2) };
            if (node.located == false) {

            }
            node.located = true
            assignBinaryTree(nodes, node, gapX, gapY)
    
            // assignBinaryTree(nodes, node, gapX, gapY)
            let itsEdges = transformedEdges.filter(x => (x.data.target == node.id) || (x.data.source == node.id))
            if (itsEdges.length > 1) {
                let widthOfEdgeLine = currentX + 150 - ((itsEdges.length * 200) + ((itsEdges.length - 1) * 50))/2 
                itsEdges.forEach(edge => {
                    edge.position = { x: widthOfEdgeLine, y: startY + gapY }
                    edge.located = true
                    widthOfEdgeLine += 250
                })
            } else {
                itsEdges.forEach(edge => {
                    edge.position = { x: currentX + 50, y: startY + gapY }
                    edge.located = true
                })
            }
            currentX += gapX + 100; // Move down for the next node
        });
        currentX += 400
        persons.forEach(node => {
            node.position = { x: currentX, y: startY + gapY * 2 }; 
            // console.log(keys)
            node.located = true
            assignBinaryTree(nodes, node, gapX, gapY)
            let itsEdges = transformedEdges.filter(x => (x.data.target == node.id) || (x.data.source == node.id))
            if (itsEdges.length > 1) {
                let widthOfEdgeLine = currentX + 150 - ((itsEdges.length * 200) + ((itsEdges.length - 1) * 50))/2 
                itsEdges.forEach(edge => {
                    edge.position = { x: widthOfEdgeLine, y: startY + gapY }
                    edge.located = true
                    widthOfEdgeLine += 250
                })
            } else {
                itsEdges.forEach(edge => {
                    edge.position = { x: currentX + 50, y: startY + gapY }
                    edge.located = true
                })
            }
            currentX += gapX + 100; // Move down for the next node
        });
        let addressX = keyNode.position.x + 150 - ((addresses.length * gapX) + (addresses.length - 1)*100)/2
        // let addressX = (startX + 150) - (addresses.length * 300)/4
        addresses.forEach(node => {
            node.position = { x: addressX, y: startY - gapY * 2 };
            node.located = true
            assignBinaryTree(nodes, node, gapX, gapY)
    
            // assignBinaryTree(nodes, node, gapX, gapY)
            let itsEdges = transformedEdges.filter(x => (x.data.target == node.id) || (x.data.source == node.id))
            if (itsEdges.length > 1) {
                let widthOfEdgeLine = addressX + 100 - ((itsEdges.length * 200) + ((itsEdges.length - 1) * 50))/2 
                itsEdges.forEach(edge => {
                    edge.position = { x: widthOfEdgeLine, y: startY - gapY }
                    edge.located = true
    
                    widthOfEdgeLine += 250
                })
            } else {
                itsEdges.forEach(edge => {
                    edge.position = { x: addressX + 50, y: startY - gapY }
                    edge.located = true
                })
            }
            addressX += gapX + 100; // Move down for the next node
        });

        nodes.forEach(node => {
            if (keys.includes(node.data.IINBIN || node.data.IIN)) {
                node.data.key = true
            }
        })
        return nodes;
    } else {
        return nodes;

    }

}


function assignBinaryTree(nodes, keyNode, gapX, gapY) {
    
    const transformedEdges = nodes.filter(node => node.type == 'edgeNode' && (node.data.source == keyNode.id || node.data.target == keyNode.id))
    // console.log("Directly connected edges", transformedEdges)
    if (transformedEdges.length > 0) {
        const companies = nodes.filter(
            node => 
                node.id != keyNode.id && 
                (node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.target || node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.source ) &&
                node.data.type == 'company'
                )
        const persons = nodes.filter(
            node => 
                node.id != keyNode.id && 
                (node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.target || node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.source ) &&
                node.data.type == 'person'
                )
        const addresses = nodes.filter(
            node => 
                node.id != keyNode.id && 
                (node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.target || node.id == transformedEdges.find(x => (x.data.target == node.id) || (x.data.source == node.id))?.data.source ) &&
                node.data.type == 'address'
                )
    
        // console.log("Result", addresses)
    
        // Position the key node
        let startX = keyNode.position.x
        let startY = keyNode.position.y + 50
        

        let currentX = startX - (companies.length * (gapX + 100)) 
        if (companies.length > 0) {
            companies.forEach(node => {
                if (node.located) {
                    // let itsEdges = transformedEdges.filter(x => (x.data.target == node.id) || (x.data.source == node.id))
                    // if (itsEdges.length > 1) {
                    //     itsEdges.forEach(edge => {
                    //         edge.position = { x: (node.position.x - keyNode.position.x)/2, y: startY + gapY }
                    //     })
                    // } 
                } else {
                    node.position = { x: currentX, y: startY + gapY * 2 }; // Double the gapX for the right column
                    node.located = true
                    assignBinaryTree(nodes, node, gapX, gapY)
                    let itsEdges = transformedEdges.filter(x => (x.data.target == node.id) || (x.data.source == node.id))
                    if (itsEdges.length > 1) {
                        let widthOfEdgeLine = currentX + 150 - ((itsEdges.length * 200) + ((itsEdges.length - 1) * 50))/2 
                        // console.log(itsEdges)
                        itsEdges.forEach(edge => {
                            edge.position = { x: widthOfEdgeLine, y: startY + (gapY + 100) }
                            widthOfEdgeLine += 250
                        })
                    } else {
                        itsEdges.forEach(edge => {
                            edge.position = { x: currentX + 50, y: startY + gapY + 100 }
                        })
                    }
                    currentX += gapX + 100; // Move down for the next node
                }
            });
        }
        if (persons.length > 0) {
            currentX = keyNode.position.x + 200
            persons.forEach(node => {
                if (node.located) {
                    // let itsEdges = transformedEdges.filter(x => (x.data.target == node.id) || (x.data.source == node.id))
                    // if (itsEdges.length > 1) {
                    //     itsEdges.forEach(edge => {
                    //         edge.position = { x: keyNode.position.x - (node.position.x - keyNode.position.x)/2, y: startY + gapY }
                    //     })
                    // } 
                } else {
                    node.position = { x: currentX, y: startY + gapY * 2 }; // Double the gapX for the right column
                    node.located = true
                    assignBinaryTree(nodes, node, gapX, gapY)
                    let itsEdges = transformedEdges.filter(x => (x.data.target == node.id) || (x.data.source == node.id))
                    if (itsEdges.length > 1) {
                        let widthOfEdgeLine = currentX + 150 - ((itsEdges.length * 200) + ((itsEdges.length - 1) * 50))/2 
                        // console.log(itsEdges)
                        itsEdges.forEach(edge => {
                            edge.position = { x: widthOfEdgeLine, y: startY + gapY + 100 }
                            widthOfEdgeLine += 250
                        })
                    } else {
                        itsEdges.forEach(edge => {
                            edge.position = { x: currentX + 50, y: startY + gapY + 100 }
                        })
                    }
                    currentX += gapX + 100; // Move down for the next node
                }
            });
        }
        if (addresses.length > 0) {
            let addressX = keyNode.position.x + 150 - ((addresses.length * gapX) + (addresses.length - 1)*100)/2
            addresses.forEach(node => {
                if (node.located) {
                    // let itsEdges = transformedEdges.filter(x => (x.data.target == node.id) || (x.data.source == node.id))
                    // if (itsEdges.length > 1) {
                    //     itsEdges.forEach(edge => {
                    //         edge.position = { x: keyNode.position.x - (node.position.x - keyNode.position.x)/2, y: startY + gapY }
                    //     })
                    // } 
                } else {
                    node.position = { x: addressX, y: startY - gapY * 2 }; // Double the gapX for the right column
                    node.located = true
                    assignBinaryTree(nodes, node, gapX, gapY)

                    let itsEdges = transformedEdges.filter(x => (x.data.target == node.id) || (x.data.source == node.id))
                    if (itsEdges.length > 1) {
                        let widthOfEdgeLine = addressX + 100 - ((itsEdges.length * 200) + ((itsEdges.length - 1) * 50))/2 
                        // console.log(itsEdges)
                        itsEdges.forEach(edge => {
                            edge.position = { x: widthOfEdgeLine, y: startY - gapY + 100 }
                            widthOfEdgeLine += 250
                        })
                    } else {
                        itsEdges.forEach(edge => {
                            edge.position = { x: addressX + 50, y: startY - gapY + 100 }
                        })
                    }
                    addressX += gapX + 100; // Move down for the next node
                }
            });
        }
    } else {
        // console.log(keyNode)
    }

    return nodes;   
}