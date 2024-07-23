import React, { memo, useCallback, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import "./PhotoNode.scss";
import DeleteIcon from "../../images/DeleteIcon.svg";

const PhotoNode = ({ id, data }) => {
  const [EditImage, setEditImage] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(true);
  
  const [onlyPhoto, setOnlyPhoto] = useState(false);
  const { setNodes } = useReactFlow();

  const handleImageUploadInEdit = useCallback((event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = (e.target?.result).replace(/^data:image\/[a-z]+;base64,/, "");
        setEditImage(base64String);
        setOnlyPhoto(true);
        setShowUploadButton(false);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleCloseImage = () => {
    setEditImage(null);
    setShowUploadButton(true);
  };

  const handleDeleteNode = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  return (
    <div className="photo-node relative">
      <Handle
        type="source"
        position={Position.Top}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      {data.photo && data.onlyPhoto ? (
        <div className="node-header-with-onlyPhoto relative">
          <img src={`data:image/jpeg;base64,${data.photo}`} alt="" />
          <div className="dot"></div> {/* Added dot div */}
          <button
            className={EditImage ? "large-button" : "small-button"}
            onClick={handleDeleteNode}
          >
            <img src={DeleteIcon} alt="Delete" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default memo(PhotoNode);
