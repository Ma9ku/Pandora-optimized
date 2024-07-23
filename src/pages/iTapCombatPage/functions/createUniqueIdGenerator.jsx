const generateUniqueId = () => {
    return 'node_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
};


export default generateUniqueId