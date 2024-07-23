import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import LeftBar from "./leftBar/LeftBar";
import ImageNode from "../../../src/pages/iTapCombatPage/components/CustomNodes/imageNode";

import ApprovementModalWindow from "../../components/itapComponents copy/ApprovementModal/ApprovementModalWindow";
import { allRelations, relationsZags } from "./../../data/relationsData";
import "./itappage.scss";
import "./loader.scss";
import N4JDiagram from "./Graph/Diragram";
import GraphNetnew from "../Graphs/Graphs";
import searchResultsOfLieSearch from "../Graphs/localnetworks/primer1";
import odualSSS from "./data/offlineSearch";
import addimgIcon from "./images/addimgIcon.svg";
import graphIcon from "./images/graphIcon.svg";
import tableIcon from "./images/graphTableIcon.svg";
import exportIcon from "./images/export.svg";
import binIcon from "./images/bin.svg";

import DownloadButton from "./functions/DownloadDiragramButton";
import { toPng } from "html-to-image";
import edgeTypeOne from "./images/edge.svg";
import edgeTypeTwo from "./images/edge2.svg";
import listOfItap from "../../data/listOfItapResults";

import defaultURL from "../../data/baseURL";

const baseURL = "/main";
const zagsURL = "/zags";

function ITapPage() {
  const [imageSrc, setImageSrc] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(true);

  const handleClickImg = () => {
    document.getElementById("imageInput").click();
  };

  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        setShowUploadButton(false); // Скрыть кнопку загрузки после загрузки изображения
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleCloseImage = () => {
    setImageSrc(null);
    setShowUploadButton(true); // Показать кнопку загрузки при закрытии изображения
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const object = queryParams.get("object");
  const object2 = queryParams.get("object2");
  const type = queryParams.get("type");

  const buttonRef = useRef(null);
  const itapRef = useRef(null);
  const deleteRef = useRef(null);

  const userSession = JSON.parse(localStorage.getItem("user"));

  //For selection controller
  const [selectionStarted, setSelectionStarted] = useState(false);

  const [lbOpened, setLbOpened] = useState(true);
  const [graphType, setGraphType] = useState("graph");

  const [jsonLocalSearchStatus, setJsonLocalSearchStatus] = useState(false);
  const [edgeStraight, setEdgeStraight] = useState(false);

  const [physicsEnable, setPhysicsEnable] = useState(true);
  const [layoutOptions, setLayoutOptions] = useState({
    hierarchical: {
      enabled: false,
      levelSeparation: 150,
      nodeSpacing: 200,
      treeSpacing: 200,
      blockShifting: true,
      edgeMinimization: true,
      parentCentralization: true,
      direction: "UD", // UD, DU, LR, RL
      sortMethod: "hubsize", // hubsize, directed
      shakeTowards: "leaves", // roots, leaves
    },
    randomSeed: 1123,
    improvedLayout: true,
  });

  const [diagramAllowed, setDiragramAllowed] = useState(true);

  const [errorDisplay, setErrorDisplay] = useState(false);
  const [keyNodes, setKeyNodes] = useState([]);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const [approvementObject, setApprovementObject] = useState({});
  const [approbementFormModal, setApprovementFormModal] = useState(false);

  const [dbVariant, setDbVariant] = useState("regular");

  const [loading, setLoading] = useState(false);

  const [param, setParam] = useState({});
  const [endP, setEndP] = useState("");
  const [optin, setOptin] = useState({});

  const [initialObject, setInitialObject] = useState(object ? object : "");
  const [initialObject2, setInitialObject2] = useState(object2 ? object2 : "");
  const [initialType, setInitialType] = useState(type ? type : "");

  const handleDownload = () => {
    // Include all relevant state in the data object
    const data = {
      nodes,
      edges,
      diagramAllowed,
      dbVariant,
      param,
      keyNodes,
    };
    const jsonString = JSON.stringify(data, null, 2); // Beautify the JSON string
    const blob = new Blob([jsonString], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = href;
    downloadLink.download = "diagram_data.json"; // Name of the file to be downloaded
    document.body.appendChild(downloadLink); // Append to the body to ensure it can be clicked
    downloadLink.click(); // Programmatically click the link to trigger the download

    document.body.removeChild(downloadLink); // Clean up by removing the link
    URL.revokeObjectURL(href); // Release the created object URL
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default behavior (Prevent file from being opened)
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    setNodes([]);
    setEdges([]);
    if (files.length) {
      const file = files[0];
      if (file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          try {
            const json = JSON.parse(content);
            // Assuming json contains { nodes, edges, param }
            setNodes(json.nodes || []);
            setEdges(json.edges || []);
            setParam(json.param || {});
            setKeyNodes(json.keyNodes || []);
            // Update other states as needed
          } catch (error) {
            console.error("Error parsing JSON file", error);
            // Handle error (e.g., show notification to the user)
          }
        };
        reader.readAsText(file);
      } else {
        // Handle wrong file type (e.g., show notification to the user)
      }
    }
  };

  const handleClick = () => {
    if (graphType == "table") {
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    } else {
      if (itapRef.current) {
        itapRef.current.click();
      }
    }
  };

  const handleNodesDelete = () => {
    if (deleteRef.current) {
      deleteRef.current.click();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorDisplay(false);
    }, 5000);
  }, [errorDisplay == true]);

  const approveBeforeSubmit = (params, endPoint, newRequest, keys, options) => {
    setKeyNodes(keys ? keys : []);
    if (
      !userSession.roles.includes("ADMIN") &&
      !userSession.roles.includes("VIP")
    ) {
      setParam(params);
      setEndP(endPoint);
      setOptin(options);
      // Submit(params, endPoint, options)
      setApprovementFormModal(true);
    } else {
      Submit(params, endPoint, options);
    }
  };

  useEffect(() => {}, [nodes, edges]);

  const Submit = async (params, endPoint, options, approves) => {
    setApprovementFormModal(false);
    setLoading(true);
    setNodes([]);
    setEdges([]);

    axios.defaults.headers.common["Authorization"] =
      "Bearer " + userSession.accessToken;

    if (approves) {
      params["approvement_type"] = approves.approvementObject
        ? approves.approvementObject.approvement_type
        : "";
      params["orderNum"] = approves.approvementObject
        ? approves.approvementObject.orderNum
        : "";
      params["orderDate"] = approves.approvementObject
        ? approves.approvementObject.orderDate
        : "";
      params["articleName"] = approves.approvementObject
        ? approves.approvementObject.articleName
        : "";
      params["caseNum"] = approves.approvementObject
        ? approves.approvementObject.caseNum
        : "";
      params["checkingName"] = approves.approvementObject
        ? approves.approvementObject.checkingName
        : "";
      params["otherReasons"] = approves.approvementObject
        ? approves.approvementObject.other
        : "";
      params["organName"] = approves.approvementObject
        ? approves.approvementObject.organName
        : "";
      params["rukName"] = approves.approvementObject
        ? approves.approvementObject.rukName
        : "";
      params["sphereName"] = approves.approvementObject
        ? approves.approvementObject.sphereName
        : "";
      params["tematikName"] = approves.approvementObject
        ? approves.approvementObject.tematikName
        : "";
    } else {
      params["approvement_type"] = "";
      params["orderNum"] = "";
      params["orderDate"] = "";
      params["articleName"] = "";
      params["caseNum"] = "";
      params["checkingName"] = "";
      params["otherReasons"] = "";
      params["organName"] = "";
      params["rukName"] = "";
      params["sphereName"] = "";
      params["tematikName"] = "";
    }

    let axiosURL = baseURL;
    if (dbVariant == "zags") {
      axiosURL = zagsURL;
    }
    let allowedDiagrams = [
      "/fltree",
      "/shortestpaths",
      "/flulpath",
      "/ultree",
      "/ululpath",
    ];
    if (allowedDiagrams.includes(endPoint)) {
      setDiragramAllowed(true);
    } else {
      setDiragramAllowed(false);
    }

    console.log(defaultURL + axiosURL + endPoint);

    if (options?.iin1?.length == 6 || options?.iin1?.length == 13) {
      setLoading(true);
      let res = [];
      if (options.iin1.length == 6) {
        setJsonLocalSearchStatus(true);
        res = searchResultsOfLieSearch.find(
          (item) => item.option == options.mode && item.object == options.iin1
        );
        // }
      } else {
        res = odualSSS.find(
          (item) => item.option == options.mode && item.iin1 == options.iin1
        );
      }

      if (!res) {
        if (params.mode != "con5") {
          res = listOfItap.find(
            (item) =>
              item.iin.substring(0, 6) === options.iin1 &&
              item.type === options.mode
          );
        } else {
          res = listOfItap.find(
            (item) =>
              item.iin.substring(0, 6) == options.iin1 &&
              item.iin2.substring(0, 6) == options.iin2 &&
              item.type == options.mode
          );
        }
      }

      // console.log(res)
      if (res) {
        let _nodes = res.nodes;
        const _edges = res.edges;

        setNodes(_nodes);
        setEdges(_edges);

        setLoading(false);
      } else {
        setLoading(false);

        setErrorDisplay(true);
      }
    } else {
      setJsonLocalSearchStatus(false);
      axios
        .get(defaultURL + axiosURL + endPoint, { params: params })
        .then(async (res) => {
          let _nodes = [];
          let _edges = res.data.edges;
          console.log(res.data.edges);
          // console.log(res)
          function removeDuplicatesById(arr) {
            const uniqueIds = new Set();
            const resArr = [];

            for (const item of arr) {
              if (!uniqueIds.has(item.properties.id)) {
                uniqueIds.add(item.properties.id);
                resArr.push(item);
              }
            }

            return resArr;
          }

          _edges = await removeDuplicatesById(_edges);

          setNodes(res.data.nodes);
          setEdges(_edges);
        })
        .catch((r) => {
          console.log(r);
          setLoading(false);
          setErrorDisplay(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const shortOpen = async (id) => {
    setLoading(true);
    setNodes([]);
    setEdges([]);
    setLoading(true);

    let _url = defaultURL + baseURL;
    let showRels = allRelations.map((x) => {
      return x.value;
    });

    if (dbVariant == "zags") {
      _url = defaultURL + zagsURL;
      showRels = relationsZags.map((x) => {
        return x.value;
      });
    }

    if (jsonLocalSearchStatus) {
      let tempNodes = nodes;
      let tempEdges = edges;

      let reult = searchResultsOfLieSearch.find((x) => x.object == id);

      reult.edges.map((item) => {
        let duplFlag = false;
        tempEdges.map((node) => {
          if (node.id === item.id) duplFlag = true;
        });
        if (!duplFlag) {
          tempEdges.push(item);
        }
      });

      reult.nodes.map((item) => {
        let duplFlag = false;
        tempNodes.map((node) => {
          if (node.id === item.id) duplFlag = true;
        });
        if (!duplFlag) {
          tempNodes.push(item);
        }
      });

      // let newNodes = mergeWithoutDuplicates(tempNodes, _nodes)
      // let newEdges = mergeWithoutDuplicates(tempEdges, _edges)

      setNodes(tempNodes);
      setEdges(tempEdges);

      setTimeout(() => setLoading(false), 1000);
    } else {
      axios
        .get(`${_url}/shortopen`, {
          params: { id: id, relations: showRels.join(","), limit: 20 },
        })
        .then(async (res) => {
          let _nodes = nodes;
          let _edges = edges;

          let tempNodes = res.data.nodes;
          let tempEdges = res.data.edges;
          // console.log(tempEdges)

          tempNodes.map((x) => {
            let b = nodes.find((y) => y.id == x.id);

            if (b) {
            } else {
              _nodes.push(x);
            }
          });
          tempEdges.map((x) => {
            // let q = edges.find(y => y.id == x.id)
            // if (q) {

            // } else {
            _edges.push(x);
            // }
          });

          setEdges(_edges);
          setNodes(_nodes);

          setLoading(false);
        });
    }
  };

  const handleLayout = (layout) => {
    setLayoutOptions((prev) => ({
      ...prev,
      hierarchical: layout,
    }));

    setPhysicsEnable(!layout.enabled);
  };

  return (
    <>
      {approbementFormModal && (
        <ApprovementModalWindow
          params={param}
          endPoint={endP}
          optin={optin}
          send={Submit}
          setModal={setApprovementFormModal}
          setApprovementObj={setApprovementObject}
        />
      )}
      <div className="itap-tool-wraper">
        <div
          className="warning-block"
          style={{ top: !errorDisplay ? "-200px" : "10px" }}
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M7.493 0.015 C 7.442 0.021,7.268 0.039,7.107 0.055 C 5.234 0.242,3.347 1.208,2.071 2.634 C 0.660 4.211,-0.057 6.168,0.009 8.253 C 0.124 11.854,2.599 14.903,6.110 15.771 C 8.169 16.280,10.433 15.917,12.227 14.791 C 14.017 13.666,15.270 11.933,15.771 9.887 C 15.943 9.186,15.983 8.829,15.983 8.000 C 15.983 7.171,15.943 6.814,15.771 6.113 C 14.979 2.878,12.315 0.498,9.000 0.064 C 8.716 0.027,7.683 -0.006,7.493 0.015 M8.853 1.563 C 9.967 1.707,11.010 2.136,11.944 2.834 C 12.273 3.080,12.920 3.727,13.166 4.056 C 13.727 4.807,14.142 5.690,14.330 6.535 C 14.544 7.500,14.544 8.500,14.330 9.465 C 13.916 11.326,12.605 12.978,10.867 13.828 C 10.239 14.135,9.591 14.336,8.880 14.444 C 8.456 14.509,7.544 14.509,7.120 14.444 C 5.172 14.148,3.528 13.085,2.493 11.451 C 2.279 11.114,1.999 10.526,1.859 10.119 C 1.618 9.422,1.514 8.781,1.514 8.000 C 1.514 6.961,1.715 6.075,2.160 5.160 C 2.500 4.462,2.846 3.980,3.413 3.413 C 3.980 2.846,4.462 2.500,5.160 2.160 C 6.313 1.599,7.567 1.397,8.853 1.563 M7.706 4.290 C 7.482 4.363,7.355 4.491,7.293 4.705 C 7.257 4.827,7.253 5.106,7.259 6.816 C 7.267 8.786,7.267 8.787,7.325 8.896 C 7.398 9.033,7.538 9.157,7.671 9.204 C 7.803 9.250,8.197 9.250,8.329 9.204 C 8.462 9.157,8.602 9.033,8.675 8.896 C 8.733 8.787,8.733 8.786,8.741 6.816 C 8.749 4.664,8.749 4.662,8.596 4.481 C 8.472 4.333,8.339 4.284,8.040 4.276 C 7.893 4.272,7.743 4.278,7.706 4.290 M7.786 10.530 C 7.597 10.592,7.410 10.753,7.319 10.932 C 7.249 11.072,7.237 11.325,7.294 11.495 C 7.388 11.780,7.697 12.000,8.000 12.000 C 8.303 12.000,8.612 11.780,8.706 11.495 C 8.763 11.325,8.751 11.072,8.681 10.932 C 8.616 10.804,8.460 10.646,8.333 10.580 C 8.217 10.520,7.904 10.491,7.786 10.530 "
                stroke="none"
                fill-rule="evenodd"
                fill="#ffffff"
              ></path>
            </g>
          </svg>
          <a>Ошибка</a>
        </div>
        <div className="left-bar-container-button">
          <div
            className={
              lbOpened ? "left-bar-container" : "left-bar-container closed"
            }
          >
            <LeftBar
              initObject={initialObject}
              initObject2={initialObject2}
              initType={initialType}
              handleDownload={handleDownload}
              handleLayout={handleLayout}
              graphType={graphType}
              dbVariant={dbVariant}
              setDbVariant={setDbVariant}
              Submit={approveBeforeSubmit}
            />
          </div>
          <div
            className="open-lb-button"
            onClick={() => {
              setLbOpened(!lbOpened);
            }}
          >
            <svg
              className={lbOpened ? "default-svg closed wide" : "hidden-svg"}
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="24"
              viewBox="0 0 9 24"
              fill="none"
            >
              <path
                d="M7 2L2.5 12L7 22"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <svg
              className={!lbOpened ? "default-svg closed wide" : "hidden-svg"}
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="24"
              viewBox="0 0 9 24"
              fill="none"
            >
              <path
                d="M2 22L6.5 12L2 2"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div
            className={
              lbOpened ? "graph-view-state" : "graph-view-state closed"
            }
          >
            <div
              className={`table-view ${graphType == "graph" ? "active" : ""}`}
              onClick={() => setGraphType("graph")}
            >
              <img src={graphIcon} alt="G" />
            </div>
            {diagramAllowed && (
              <div
                className={`graph-view ${graphType == "table" ? "active" : ""}`}
                onClick={() => setGraphType("table")}
              >
                <img src={tableIcon} alt="T" />
              </div>
            )}
            {nodes.length > 0 && (
              <div className="add-img" onClick={handleClickImg}>
                <img src={addimgIcon} alt="T" />
                <input
                  type="file"
                  id="imageInput"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </div>
            )}
          </div>
          <div
            className={
              lbOpened ? "table-view-state" : "table-view-state closed"
            }
          >
            <div
              className={`edge-state ${edgeStraight ? "" : "active"}`}
              onClick={() => setEdgeStraight(!edgeStraight)}
            >
              <img src={edgeTypeOne} alt="G" />
            </div>
          </div>
          <div
            style={{ display: nodes.length > 0 ? "block" : "none" }}
            className={lbOpened ? "download-state" : "download-state closed"}
          >
            <div className={"edge-state"} onClick={() => handleClick()}>
              <img src={exportIcon} alt="G" />
            </div>
          </div>
          <div
            style={{ display: selectionStarted ? "block" : "none" }}
            className={lbOpened ? "delete-state" : "delete-state closed"}
          >
            <div className={"edge-state"} onClick={() => handleNodesDelete()}>
              <img src={binIcon} alt="G" />
            </div>
          </div>
        </div>
        <div
          className="graph-container"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {loading ? (
            <span class="loader"></span>
          ) : nodes.length > 0 ? (
            <>
              {graphType == "graph" && (
                <GraphNetnew
                  itapRef={itapRef}
                  physicsEnable={physicsEnable}
                  setPhysicsEnable={setPhysicsEnable}
                  layoutOptions={layoutOptions}
                  setLayoutOptions={setLayoutOptions}
                  keys={keyNodes}
                  rnodes={nodes}
                  redges={edges}
                  setGlobalNodes={setNodes}
                  setGlobalEdges={setEdges}
                />
              )}
              {diagramAllowed && (
                <>
                  {imageSrc && (
                    <ImageNode
                      initialImageSrc={imageSrc}
                      onClose={handleCloseImage}
                    />
                  )}
                  <N4JDiagram
                    deleteRef={deleteRef}
                    setSelectionStarted={setSelectionStarted}
                    buttonRef={buttonRef}
                    edgeStraight={edgeStraight}
                    keys={keyNodes}
                    shortOpen={shortOpen}
                    rnodes={nodes}
                    redges={edges}
                    setGlobalNodes={setNodes}
                    setGlobalEdges={setEdges}
                  />
                </>
              )}
            </>
          ) : (
            <a className="no-results">Нет результатов</a>
          )}
        </div>
      </div>
    </>
  );
}

export default ITapPage;
