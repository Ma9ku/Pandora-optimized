import axios from 'axios';
import html2canvas from 'html2canvas';
import queryString from 'query-string';
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Graph from "react-vis-network-graph";
import RightBar from "../../components/itapComponents copy/RightBar/RightBar";

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from '@mui/material/IconButton';

import './../../Loader.css';
import './Graphs.css';
import searchResultsOfLieSearch from "./localnetworks/primer1";

import { allRelations, relationsLevel1 } from "../../data/relationsData";

// import userIconWhite from "./../../user-icon-white.png";
// import userIconBlack from "./../../user-icon-black.png";
// import buildingIcon from "./../../eclipse-1.png";
// import userIconRed from "./../../user-icon-red.png";

// import useFetch from "../../hooks/useFetch.js";

// icons
import defaultURL from "../../data/baseURL";
import glkPersonIcon from '../../icons/GLK.jpeg';
import addressIcon from '../../icons/address.png';
import carIcon from '../../icons/car.png';
import companyIcon from '../../icons/company.png';
import judgeCompanyIcon from '../../icons/judge_company.png';
import judgePersonIcon from '../../icons/judge_person.jpg';
import keyCompanyIcon from '../../icons/key_company.png';
import keyJudgePersonIcon from '../../icons/key_judge_person.jpg';
import keyPersonIcon from '../../icons/key_person.png';
import ntrIcon from '../../icons/ntrIcon.jpg';
import personIcon from '../../icons/person.png';
import personjaiIcon from '../../icons/personjai.png';
import ripPersonIcon from '../../icons/rip_person.png';

const baseURL = defaultURL+"/main"
const zagsURL = defaultURL+"/zags"

var graJSON = {nodes: [], edges: [], typeOfSearch: "", params: {}, iin: false}
var Network;
var SelectedNode = {}
var SelectedEdge = {}

var onSelectNode = false;

const GraphNetnew = ({itapRef, physicsEnable, setPhysicsEnable, layoutOptions, setLayoutOptions,keys, rnodes, redges, setGlobalNodes, setGlobalEdges, iin1, iin2}) => {
    const location = useLocation()
    const {object, type, object2} = queryString.parse(location.search)
    const [updateGraph, setUpdateGraph] = useState(true)

    const [urlState, setURLState] = useState(baseURL)

    const [nodes, setNodes] = useState([])
    const [edges, setEdges] = useState([])

    const [showModal, setShowModal] = useState(false);

    const [searchedNodes, setSearchedNodes] = useState([])

    const [counter, setCounter] = useState(0)
    const [sliderPage, setSliderPage] = useState(0)

    const [isLoading, setIsLoading] = useState(false)
    const [showActionBtn, setShowActionBtn] = useState(false)
    const [showNodeInfo, setShowNodeInfo] = useState(false)
    const [showEdgeInfo, setShowEdgeInfo] = useState(false)
    const [showSudInfo, setShowSudInfo] = useState(false)
    const [showNodeImage, setShowImage] = useState(false)

    const [keyNodeId, setKeyNodeId] = useState(0)
    const [nodeStack, setNodeStack] = useState([])

    const [showRels, setShowRels] = useState("")
    const [openLimit, setOpenLimit] = useState(0)
    const [openLeft, setOpenLeft] = useState(true)
    const [openRight, setOpenRight] = useState(true)

    const [leftTabs, setLeftTabs] = useState("search")

    const [jsonLocalSearchStatus, setJsonLocalSearchStatus] = useState(false)



    useEffect(() => {
      if (rnodes?.length > 0) {
        
        setJsonLocalSearchStatus(false)
          let _nodes = []
          let _edges = redges;
  
          // console.log(res.data)
  
          function removeDuplicatesById(arr) {
              const uniqueIds = new Set();
              const resArr = [];
  
              for (const item of arr) {
                  if (!uniqueIds.has(item.properties.id)) {
                      uniqueIds.add(item.properties.id)
                      resArr.push(item)
                  }
              }
  
              return resArr;
          }
  
          _edges = removeDuplicatesById(_edges);
  
          _edges.map(item => {
              setEdgeSettings(item);
          })
  
          rnodes.map(item => {
              setNodeSettings(item)
              _nodes.push(item);
          })
  
          setNodes(_nodes)
          setEdges(_edges)
  
          setIsLoading(false)
  
  
          setShowActionBtn(true)
          if(Network) Network.stabilize()
      }
    }, [rnodes, redges])

    useEffect(() => {
        // console.log(openLimit, showRels)
        if (type != '' && type != null) {
            setIsLoading(true)
        }
    }, [])
    
    //For Local usage

    const edgesOptions = {
        length: 400,
        width: 0.3,
        selectionWidth: 2,
        arrows: {
            to: true,
        },
        smooth: {
            "type": "dynamic",
            "forceDirection": "vertical",
            "roundness": 0
        }, 
        font: {
            strokeWidth: 0,
            size: 10,
            align: "top"
        },
    }

    const physicsOptions = {
        enabled: physicsEnable,
        "repulsion": {
            "centralGravity": 0,
            "springLength": 335,
            "springConstant": 0.205,
            "nodeDistance": 150,
            "damping": 0.21
        },
        "maxVelocity": 55,
        "minVelocity": 30,
        "solver": "repulsion",
        "timestep": 0.81,
        "wind": {
            "x": 0.1
        }
    }

    const groupsOptions = {
        GLK: {
            shape: "circularImage",
            image: glkPersonIcon
        },
        CAR: {
            shape: "circularImage",
            image: carIcon
        },
        keyPerson: {
            shape: "circularImage",
            image: keyPersonIcon,
        },
        person: {
            shape: "circularImage",
            image: personIcon,
        },
        personJai: {
            shape: "circularImage",
            image: personjaiIcon,
        },
        keyJudgePerson: {
            shape: "circularImage",
            image: keyJudgePersonIcon,
        },
        ripPerson: {
            shape: "circularImage",
            image: ripPersonIcon,
        },
        judgePerson: {
            shape: "circularImage",
            image: judgePersonIcon,
        },
        keyCompany: {
            shape: "circularImage",
            image: keyCompanyIcon,
        },
        company: {
            shape: "circularImage",
            image: companyIcon,
        },
        judgeCompany: {
            shape: "circularImage",
            image: judgeCompanyIcon,
        },
        PROPISKA: {
            shape: "circularImage",
            image: addressIcon,
        },
        notarius: {
            shape: "circularImage",
            image: ntrIcon,  
        }
    }

    const nodesOptions = {
        font: {
            size: 17,
            color: "white",
            vadjust: -15
        },
        size: 20
    }

    const graphOptions = {
        autoResize: true,
        edges: edgesOptions,
        physics: physicsOptions,
        groups: groupsOptions,
        nodes: nodesOptions,
        height: "100%",
        layout: layoutOptions
    }

    const assignInfoBlock = (options, elemId) => {
        const infoBlock = document.querySelector(elemId)
        Object.entries(options).forEach(entry => {
            const [key, value] = entry;

            if (value == null) return

            const info = document.createElement("div")
            info.innerHTML = `${key.toUpperCase()}: <span>${value}</span>`

            infoBlock.appendChild(info)
        });
    }
    //for local usage
    const LocalGet = (params) => {
        setNodes([])
        setEdges([])

        setPhysicsEnable(true)

        setIsLoading(true)

        if (params == '890724350918') {
            const res = iin890724350918
            let _nodes = []
            let _edges = [];

            graJSON.typeOfSearch = res.typeOfSearch

            res.edges.map(item => {
                setEdgeSettings(item);
            })

            _edges = res.edges.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.id === value.id
                ))
            )

            res.nodes.filter(item => !nodes.includes(item)).map(item => {
                setNodeSettings(item)
            })

            _nodes = res.nodes.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.id === value.id
                ))
            )

            setCounter(currCounter => currCounter + 1)

            setNodes(_nodes)
            setEdges(_edges)

            graJSON.nodes = _nodes
            graJSON.edges = _edges
            graJSON.paramsOfSearch = res.paramsOfSearch
            graJSON.typeOfSearch = res.typeOfSearch

            setIsLoading(false)
            setShowActionBtn(true)

            return graJSON
        } else if (params == '811006300996') {
            const res = JSON.parse(JSON.stringify(iin811006300996))
            let _nodes = []
            let _edges = [];

            graJSON.typeOfSearch = res.typeOfSearch

            res.edges.map(item => {
                setEdgeSettings(item);
            })

            _edges = res.edges.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.id === value.id
                ))
            )

            res.nodes.filter(item => !nodes.includes(item)).map(item => {
                setNodeSettings(item)
            })

            _nodes = res.nodes.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.id === value.id
                ))
            )

            setCounter(currCounter => currCounter + 1)

            setNodes(_nodes)
            setEdges(_edges)

            graJSON.nodes = _nodes
            graJSON.edges = _edges
            graJSON.paramsOfSearch = res.paramsOfSearch
            graJSON.typeOfSearch = res.typeOfSearch

            setIsLoading(false)
            setShowActionBtn(true)

            return graJSON
        } else if (params == '770712302729') {
            const res = JSON.parse(JSON.stringify(iin770712302729))
            let _nodes = []
            let _edges = [];

            graJSON.typeOfSearch = res.typeOfSearch

            res.edges.map(item => {
                setEdgeSettings(item);
            })

            _edges = res.edges.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.id === value.id
                ))
            )

            res.nodes.filter(item => !nodes.includes(item)).map(item => {
                setNodeSettings(item)
            })

            _nodes = res.nodes.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.id === value.id
                ))
            )

            setCounter(currCounter => currCounter + 1)

            setNodes(_nodes)
            setEdges(_edges)

            graJSON.nodes = _nodes
            graJSON.edges = _edges
            graJSON.paramsOfSearch = res.paramsOfSearch
            graJSON.typeOfSearch = res.typeOfSearch

            setIsLoading(false)
            setShowActionBtn(true)

            return graJSON
        }
    }

    const Submit = async (options, tabName) => {
        // LocalGet(options.iin)
        setPhysicsEnable(true)
        setIsLoading(true)
        setNodes([])
        setEdges([])
        setCounter(currCounter => currCounter + 1)

        const userSession = JSON.parse(localStorage.getItem("user"))

        let url = "";
        let params = {};
        // console.log(options.mode)

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken
        switch(options.mode) {
            case "con1":
                graJSON.typeOfSearch = "con1"
                if (options.searchOption == "iinOption") {
                    url = "/fltree"
                    params = {person: options.iin1, relations: options.relString, depth: options.depth, limit: options.limit}
                    graJSON.params = params
                } else {
                    url = "/flFIOtree"
                    params = {
                        check1: options.checks1,
                        firstName1: options.nam1,
                        lastName1: options.fam1,
                        fatherName1: options.fath1,
                        relations: options.relString, depth: options.depth, limit: options.limit
                    }
                    graJSON.params = params
                    graJSON.iin = false
                }
                break;
            case "con2":
                graJSON.typeOfSearch = "con2"
                if (options.searchOption == "iinOption") {
                    url = "/shortestpaths";
                    params = {person: options.iin1, person2: options.iin2, relations: options.relString}
                    graJSON.params = params
                } else {
                    url = "/shortestpathsByFIO";
                    params = {
                        check1: options.checks1,
                        firstName1: options.nam1,
                        lastName1: options.fam1,
                        fatherName1: options.fath1,
                        check2: options.checks2,
                        firstName2: options.nam2,
                        lastName2: options.fam2,
                        fatherName2: options.fath2,
                        relations: options.relString
                    }
                    graJSON.params = params
                    graJSON.iin = false
                }
                break;
            case "con3":
                graJSON.typeOfSearch = "con3"
                if (options.searchOption == "iinOption") {
                    url = "/flulpath";
                    params = {person: options.iin1, ul: options.iin2, relations: options.relString}
                    graJSON.params = params
                } else {
                    url = "/flulpathByFIO";
                    params = {
                        check1: options.checks1,
                        firstName1: options.nam1,
                        lastName1: options.fam1,
                        fatherName1: options.fath1,
                        ul: options.iin2,
                        relations: options.relString
                    }
                    graJSON.params = params
                    graJSON.iin = false
                }
                break;
            case "con4":
                graJSON.typeOfSearch = "con4"
                url = "/ultree";
                params = {ul: options.iin1, relations: options.relString, depth: options.depth, limit: options.limit }
                graJSON.params = params
                break;
            case "con5":
                graJSON.typeOfSearch = "con5"
                url = "/ululpath";
                params = {ul1: options.iin1, ul2: options.iin2, relations: options.relString}
                graJSON.params = params
                break;
        }

        params["approvement_type"] = options.approvementObject ? options.approvementObject.approvement_type : ''
        params["orderNum"] = options.approvementObject ? options.approvementObject.orderNum : ''
        params["orderDate"] = options.approvementObject ? options.approvementObject.orderDate : ''
        params["articleName"] = options.approvementObject ? options.approvementObject.articleName : ''
        params["caseNum"] = options.approvementObject ?options.approvementObject.caseNum : ''
        params["checkingName"] = options.approvementObject ? options.approvementObject.checkingName : ''
        params["otherReasons"] = options.approvementObject ? options.approvementObject.other : ''
        params["organName"] = options.approvementObject ? options.approvementObject.organName : ''
        params["rukName"] = options.approvementObject ? options.approvementObject.rukName : ''
        params["sphereName"] = options.approvementObject ? options.approvementObject.sphereName : ''
        params["tematikName"] = options.approvementObject ? options.approvementObject.tematikName : ''

        let currentURL = baseURL
        setURLState(baseURL)
        if (tabName == 'zags') {
          currentURL = zagsURL
          setURLState(zagsURL)
        }
        // console.log(currentURL + url)
        axios.get((currentURL) + url, {params: params}).then(async (res) => {
            setJsonLocalSearchStatus(false)
            let _nodes = []
            let _edges = res.data.edges;
            console.log(res.data)

            // console.log(res.data)

            function removeDuplicatesById(arr) {
                const uniqueIds = new Set();
                const resArr = [];

                for (const item of arr) {
                    if (!uniqueIds.has(item.properties.id)) {
                        uniqueIds.add(item.properties.id)
                        resArr.push(item)
                    }
                }

                return resArr;
            }

            _edges = await removeDuplicatesById(_edges);

            _edges.map(item => {
                setEdgeSettings(item);
            })

            res.data.nodes.map(item => {
                setNodeSettings(item)
                _nodes.push(item);
            })

            setNodes(_nodes)
            setEdges(_edges)
            // console.log(_nodes)

            graJSON.nodes = _nodes
            graJSON.edges = _edges

            setIsLoading(false)

            const fileInput = document.getElementById('file-upload')
            fileInput.value = ""

            setShowActionBtn(true)
            if(Network) Network.stabilize()
        }).catch((r) => {
            console.log(r)
            let res = []
            if (options.iin1.length == 6) {
                  setJsonLocalSearchStatus(true)

                  res = searchResultsOfLieSearch.find(item => item.option == options.mode && (item.object == options.iin1));
                // }
            } else {
                if (params.person == '890724350918') {
                    res = iin890724350918
                } else if (params.person == '770712302729') {
                    res = iin770712302729
                } else if (params.person == '811006300996') {
                    res = iin811006300996
                }
            }
            let _nodes = []
            const _edges = res.edges;

            _edges.map(item => {
                setEdgeSettings(item);
            })

            res.nodes.map(item => {
                setNodeSettings(item)
                _nodes.push(item);
            })

            setNodes(_nodes)
            setEdges(_edges)

            graJSON.nodes = _nodes
            graJSON.edges = _edges

            setIsLoading(false)

            const fileInput = document.getElementById('file-upload')
            fileInput.value = ""

            setShowActionBtn(true)
            if(Network) Network.stabilize()
        }).finally(() => {
            setIsLoading(false)
        })
    };

    const mergeWithoutDuplicates = (arr1, arr2) => {
        let concatArray = arr1.concat(arr2)
        let newArray = []
        newArray = concatArray.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.id === value.id
            ))
        )

        if (newArray.to != undefined || newArray.to != null) {
            newArray = newArray.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.from === value.from && t.to === value.to
                ))
            )
        }

        return newArray
    }

    const shortOpen = (id) => {
      if (jsonLocalSearchStatus) {
        let tempNodes = nodes
        let tempEdges = edges

        let reult = searchResultsOfLieSearch.find((x) => x.object == id)

        reult.edges.map(item => {
            setEdgeSettings(item)
            let duplFlag = false
            tempEdges.map(node => {
                if (node.id === item.id) duplFlag = true
            })
            if (!duplFlag) {
                tempEdges.push(item)
                Network.body.data.edges.add(item);
            }

        })

        reult.nodes.map(item => {
            setNodeSettings(item)
            let duplFlag = false
            tempNodes.map(node => {
                if (node.id === item.id) duplFlag = true
            })
            if (!duplFlag) {
                tempNodes.push(item)
                Network.body.data.nodes.add(item);
            }
        })

        // let newNodes = mergeWithoutDuplicates(tempNodes, _nodes)
        // let newEdges = mergeWithoutDuplicates(tempEdges, _edges)



        setNodes(tempNodes)
        setEdges(tempEdges)

        setPhysicsEnable(true)

        Network.redraw()
        Network.fit({});
      } else {
        // let _url = leftTabs == 'search1' ? baseURL1 : baseURL
        let _url = urlState
  
        axios.get(`${_url}/shortopen`, {params: {id: id, relations: showRels, limit: openLimit }}).then(res => {
            let _nodes = []
            let _edges = []
  
            let tempNodes = nodes
            let tempEdges = edges

            
            res.data.edges.map(item => {
            setEdgeSettings(item)
            let duplFlag = false
              tempEdges.map(node => {
                if (node.id === item.id) duplFlag = true
              })
              if (!duplFlag) {
                tempEdges.push(item)
                Network.body.data.edges.add(item);
              }
              
            })
            
            res.data.nodes.map(item => {
              setNodeSettings(item)
              let duplFlag = false
              tempNodes.map(node => {
                if (node.id === item.id) duplFlag = true
              })
              if (!duplFlag) {
                tempNodes.push(item)
                Network.body.data.nodes.add(item);
              }
            })
            setGlobalEdges(tempEdges)
            setGlobalNodes(tempNodes)
              
              // let newNodes = mergeWithoutDuplicates(tempNodes, _nodes)
              // let newEdges = mergeWithoutDuplicates(tempEdges, _edges)
  
            setNodes(tempNodes)
            setEdges(tempEdges)
  
            setPhysicsEnable(true)
  
            Network.redraw()
            Network.fit({});
        })
      }



    }

    const shortHide = () => {
        const sNodeId = SelectedNode.id

        if(sNodeId == undefined || sNodeId == null) return

        let relatedNodes = []

        edges.map(item => {

            if (item.to == sNodeId) relatedNodes.push(Network.body.nodes[item.from])
            if (item.from == sNodeId) relatedNodes.push(Network.body.nodes[item.to])
        })

        let nodesToRemove = []
        let nodesToCheck = []

        relatedNodes.filter(item => item != undefined).map(relatedNode => {
            if (!relatedNode.id) return;
            const rNodeId = relatedNode.id
            let rrNodes = []
            edges.map(item => {

                if (item.to == rNodeId && item.from != sNodeId) rrNodes.push(Network.body.nodes[item.from])
                if (item.from == rNodeId && item.to != sNodeId) rrNodes.push(Network.body.nodes[item.to])
            })

            if (rrNodes.length == 0) {
                nodesToRemove.push(relatedNode)
            } else {
                nodesToCheck.push(relatedNode)
            }
        })

        if (nodesToRemove.length == 0) {
            removeNode(sNodeId)
        } else {
            nodesToRemove.map(item => {
                removeNode(item.id)
            })
        }

        nodesToCheck.map(item => {
            deepRemove(item.id)
        })

        setGlobalNodes(nodes)
        setGlobalEdges(edges)
        
    }

    const deepRemove = (id) => {
        let relatedNodes = []

        edges.map(item => {

            if (item.to == id) relatedNodes.push(Network.body.nodes[item.from])
            if (item.from == id) relatedNodes.push(Network.body.nodes[item.to])
        })

        setGlobalNodes(nodes)
        setGlobalEdges(edges)

    }


    const removeNode = (id) => {
        Network.body.data.nodes.remove([{id: id}]);
        let tempNodes = nodes
        for (let i=0; i<tempNodes.length; i++) {
            if (tempNodes[i].id == id) {
                tempNodes.splice(i, 1)
            }
        }

        setNodes(tempNodes)
        setGlobalNodes(nodes)
      setGlobalEdges(edges)
    }

    const setEdgeSettings = (edge) => {
        if (edge.properties.Vid_svyaziey == 'ЭСФ') {
          edge.label = relationsLevel1.find(x => x.value == edge.type).label || edge.properties.Vid_svyaziey
        } else {
          if (edge.type == 'WORKER_CUR') {
            edge.label = allRelations.find(x => x.value == edge.type).label
          } else {
            edge.label = edge.properties.Vid_svyaziey
          }
        }

        Object.assign(edge, {"color": "white"})
        Object.assign(edge, {font: {color: "white"}})
        Object.assign(edge, {id: edge.properties.id})

        if (edge.type == 'UCHILSYA' || edge.type == 'SLUZHIL') {
          edge.color = 'lime'
        }
        if (edge.type == 'REG_ADDRESS_CUR' || edge.type == 'REG_ADDRESS_HIST' || edge.type == 'REG_ADDRESS') {
          edge.color = 'aqua'
        }
        if (edge.type == 'ZAGS' || edge.type == 'BLIZKIE_RODS' || edge.type == 'SIBLING' || edge.type == 'COUSIN') {
          edge.color = 'pink'
        }
        if (edge.type == 'WORKER_CUR' || edge.type == 'WORKER_HIST') {
          edge.color = '#9999f2'
        }
        if (edge.type == 'SUDIM') {
          edge.color = 'red'
        }
    }

    const cropLabel = (label) => {
        let labelChunkArr = label.match(/.{1,60}/g)
        let cropedLabel = ""
        labelChunkArr.forEach(elem => {
            if (cropedLabel == "") cropedLabel = elem
            else cropedLabel += ('\n' + elem)
        })

        return cropedLabel
    }

    const setNodeSettings = (node) => {
        let key = false

        node.label = node.relCount + '\t\t\t\t\t\t\t\t\t';

        Object.assign(node, {"opened": false})

        

        if (node.properties.IINBIN) {
            // settings for ul
            // node.label += '\n\n' + node.properties.Name;

            if (node.properties.Name?.length > 60) {
                node.label += '\n\n' + cropLabel(node.properties.Name)
            } else {
                node.label += '\n\n' + (node.properties.Name ? node.properties.Name : node.properties.FullNameIP) 
            }


            const p = node.properties;
            if (p.nomer_sdelki) {
                node.group = "notarius"
            } else if (p.STATUS_OPG != null || p.STATYA_ERDR != null || p.ORGAN_REGISTER != null
                    ||  p.Status_neplatejasposobnosti != null ||  p.Bankrot != null
                    ||  p.BEZDEYSTVIA_UL != null ||  p.ERDR != null ||  p.FPG != null) {
                node.group = "judgeCompany"

            } else if (keys.includes(p.IINBIN) || keys.includes(p.IINBIN)) {
                setKeyNodeId(node.id);
                node.group = "keyCompany"

                setNodeStack([node.id, ...nodeStack])

            } else {
                node.group = "company"
            }

        } else if (node.properties.Ulica != null || node.properties.PKA != null) {
            // settings for propiska
            node.group = "PROPISKA"
            if ( node.properties.Adress_propiski == null) {
                node.label += '\n\n' + cropLabel(node.properties.Adress) ;
            } else {
                node.label += '\n\n' + node.properties.Adress_propiski ;
            }
        }  else if (node.properties.ISCAR == true) {
            node.group = "CAR"
            node.label = '\n\n' + node.properties.Adress
        } else {
            // settings for fl
            const p = node.properties;

            if (p.FIO == null) {
              node.label = p.Familia + " " + p.Name + " " + p.Otchestvo
            } else {
              node.label += "\n\n" + p.FIO
            }


            key = false;
            if (p.IIN != null && (keys.includes(p.IIN))) key = true;

            if (p.Death_Status != null) {
                node.group = "ripPerson"

            } else if (p.Organ_pravanarushenya != null || p.Pristavanie != null || p.Doljnik != null
                || p.Doljnik_po_alimentam != null || p.Status_neplatejasposobnosti != null || p.Razmer_Shtrafa != null
                || p.Status_KUIS != null || p.Status_Minzdrav != null || p.Statya != null || p.V_Roziske != null
                || p.Sud_ispolnitel != null || p.Med_org != null
                || p.StoppedBySud != null
                || p.PDL != null
                || p.SroppedByOrgan != null
                || p.ERDR != null
                || p.Propal != null
                || p.Rozisk != null
                || p.StatusPFR != null
                || p.DeadlinePassed != null
                || p.Doljnik != null
                || p.Rozisk != null

            ) {

                // console.log(p)

                if (key) node.group = "keyJudgePerson"
                else node.group = "judgePerson"

            } else {

                if (node.properties.IIN == null) node.group = "personJai"
                else if (key) node.group = "keyPerson"
                else node.group = "person"

            }
        }

        if (key) {
            setKeyNodeId(node.id);
            setNodeStack([node.id, ...nodeStack])
        }

        if (!nodeStack.includes(node.id))
            setNodeStack(() => [...nodeStack, node.id])

        if (node.properties.GLK != null) {
            node.group = "GLK"
        }

    }

    const manipulation = {
    }

    const events = {
        doubleClick: () => {
            let id = Object.keys(Network.selectionHandler.selectionObj.nodes)[0]
            shortOpen(id)
        },
        selectNode: (event) => {
            setPhysicsEnable(false)
            setShowNodeInfo(true)
            setShowEdgeInfo(false)
            setShowImage(false)
            setShowSudInfo(false)

            SelectedNode = Network.selectionHandler.selectionObj.nodes[Object.keys(Network.selectionHandler.selectionObj.nodes)[0]]

            onSelectNode = true

            const infoBlock = document.querySelector("#nodeInfoInner")
            const addInfoBlock = document.querySelector("#nodeAddInfoInner")
            // const sudInfoBlock = document.querySelector("#nodeSudInfoInner")
            const nodeImage = document.querySelector('.nodeImg');

            addInfoBlock.innerHTML = ""
            infoBlock.innerHTML = ""
            // sudInfoBlock.innerHTML = ""

            const sp = SelectedNode.options.properties;
            const sg = SelectedNode.options.group;

            if (sg == "person" || sg == "judgePerson" || sg == "ripPerson"
                || sg == "keyJudgePerson" || sg == "personJai" || sg == "keyPerson") {

                setShowImage(true)
                if (!SelectedNode.options.photoDbf) {
                    nodeImage.innerHTML = `<h3>Нет фото</h3>`
                } else {
                    nodeImage.innerHTML = `<img src="data:image/png;base64, ${SelectedNode.options.photoDbf.photo}"/>`
                }
                    
                assignInfoBlock({
                    "ИИН": sp.IIN || "Нет ИИН-а",
                    "Имя": sp.FIO ? sp.FIO.split(" ")[1] : sp.Name ? sp.Name : "Нет имени",
                    "Фамилия": sp.Family ? sp.Family : sp.Familia ? sp.Familia : "Нет фамилии",
                    "Отчество": sp.Otchestvo || "Нет отчества",
                    // "ФИО": sp.FIO ? sp.FIO : sp.sp.Name + " " + sp.Familia + " " + sp.Otchestvo "Нет ФИО",

                    "Дата рождения": sp.Data_Rozhdenya || "Нет даты рождения",
                }, '#nodeInfoInner')

                assignInfoBlock({
                    "Статус": sp.Status,
                    "Бухгалтер": sp.Buhgalter,
                    "ЧСИ": sp.CHSI,
                    "Статус смерти": sp.Death_Status
                }, '#nodeAddInfoInner')

                assignInfoBlock({"Аудитор": sp.Autditor}, '#nodeAddInfoInner')
                assignInfoBlock({"Нотариус": sp.Notarius}, '#nodeAddInfoInner')
                assignInfoBlock({"Адвокат": sp.Advocat}, '#nodeAddInfoInner')
                assignInfoBlock({"Аудитор": sp.Autditor}, '#nodeAddInfoInner')
                assignInfoBlock({"Частный судебный исполнитель": sp.Sud_ispolnitel}, '#nodeAddInfoInner')
                assignInfoBlock({"Гражданство": sp.Citizenship}, '#nodeAddInfoInner')
                assignInfoBlock({"Нация": sp.Nation}, '#nodeAddInfoInner')
                assignInfoBlock({"Место рождения": sp.Place_of_Birth}, '#nodeAddInfoInner')


            } else if (sg == "judgeCompany" || sg == "company" || sg == "keyCompany") {

                assignInfoBlock({
                    "Наименование": sp.Name,
                    "БИН": sp.IINBIN,
                    "Тип": sp.Type,
                    "Полное наим. ИП": sp.FullNameIP,

                }, '#nodeInfoInner')

                assignInfoBlock({
                    // "class": sp.Name,
                    // "PersonID": sp.PersonID, 
                    // "Label": sp.Label,
                    // "Source": sp.Source,
                    "Дата регистрационного действия": sp.DateRegisterAction,
                    "Дата начала регистрации": sp.RegisterStartDate,
                    "Дата окончании регистрации": sp.RegisterEndDate,
                    "Статус": sp.Status,
                    "Блокировка ЭСФ": sp.BLOCK_ESF,
                    "Полное наименование на гос языке": sp.FullNameNatLanguage,
                    "Лицензия": sp.License,

                }, '#nodeAddInfoInner')

                assignInfoBlock({"Бухгалтер": sp.Buhgalter}, '#nodeAddInfoInner') 
                assignInfoBlock({"НДС": sp.NDS}, '#nodeAddInfoInner') 

            } else if (sg == 'PROPISKA') {

                assignInfoBlock({
                    "Строение": sp.Stroenie,
                    "РКА": sp.PKA, 
                    "Область": sp.Oblast,
                    "Район": sp.Rayon,
                    "Город": sp.Gorod,
                    "Квартира": sp.Kvartira,
                    "Улица": sp.Ulica,
                    "Корпус": sp.Korpus,
                    "Адрес прописки": sp.Adress_propiski,
                    "Точный адрес": sp.Adress,

                }, '#nodeInfoInner')

                assignInfoBlock({
                    // "class": sp.Name,
                    "Код области": sp.Kod_oblasti, 
                    "Код страны": sp.Kod_Strani, 
                    "Код района": sp.Kod_rayona, 
                    // "PersonID": sp.PersonID, 
                    // "Label": sp.Label,
                    // "Source": sp.Source,
                }, '#nodeAddInfoInner')

                // assignInfoBlock({"Мед. Орг.": sp.Med_org,}, '#nodeSudInfoInner')
                assignInfoBlock({"Мед. Орг.": sp.Med_org,}, '#nodeAddInfoInner')
            }

            assignInfoBlock({"Доп. инфо": sp.dop_info,}, '#nodeAddInfoInner')
            assignInfoBlock({"Код": sp.kod,}, '#nodeAddInfoInner')

            assignInfoBlock({"ФПГ": sp.FPG,}, '#nodeAddInfoInner')
            assignInfoBlock({"ГЛК": sp.GLK,}, '#nodeAddInfoInner')


            if (sg == 'judgePerson' || sg == 'keyJudgePerson' || sg == 'judgeCompany' || sp == 'Status_doljnika' || sp == 'Status_neplatejasposobnosti' ) {
                setShowSudInfo(true)
                //RISK

                assignInfoBlock({"Мед. Орг.": sp.Med_org,}, '#nodeAddInfoInner')
                assignInfoBlock({"Статус должника": sp.Status_doljnika,}, '#nodeAddInfoInner')
                assignInfoBlock({"Статус неплатежеспособности": sp.Status_neplatejasposobnosti,}, '#nodeAddInfoInner')
                assignInfoBlock({"Должник по алиментам": sp.Doljnik_po_alimentam,}, '#nodeAddInfoInner')
                assignInfoBlock({"В розыске": sp.V_Roziske,}, '#nodeAddInfoInner')
                assignInfoBlock({"Аморальное": sp.Amoral,}, '#nodeAddInfoInner')
                assignInfoBlock({"Льготники ": sp.beneficiariesList,}, '#nodeAddInfoInner')
                assignInfoBlock({"Сведения по наркотическим веществам ": sp.drugAddicts,}, '#nodeAddInfoInner')
                assignInfoBlock({"Недееспособные": sp.kuis,}, '#nodeAddInfoInner')
                assignInfoBlock({"Заключенные": sp.incapacitateds,}, '#nodeAddInfoInner')
                assignInfoBlock({"Осужденные за рубежом ": sp.convictsAbroads,}, '#nodeAddInfoInner')
                assignInfoBlock({"Уволенные по отрицательным мотивам": sp.dismissal,}, '#nodeAddInfoInner')
                assignInfoBlock({"Приставание в общественных местах": sp.Pristavanie,}, '#nodeAddInfoInner')
                assignInfoBlock({"Орган, выявивший правонарушение": sp.Organ_pravanarushenya,}, '#nodeAddInfoInner')
                assignInfoBlock({"Дата решения": sp.Data_reshenya,}, '#nodeAddInfoInner')
                assignInfoBlock({"Статус КУИС": sp.Status_KUIS,}, '#nodeAddInfoInner')
                assignInfoBlock({"Размер наложенного штрафа": sp.Razmer_Shtrafa,}, '#nodeAddInfoInner')
                assignInfoBlock({"Статус Минздрав": sp.Status_Minzdrav,}, '#nodeAddInfoInner')
                assignInfoBlock({"Приказ о снятии с регистрационного учета": sp.PRIKAZ_O_SNYATYA,}, '#nodeAddInfoInner')
                assignInfoBlock({"Бездействующие ЮЛ": sp.BEZDEYSTVIA_UL,}, '#nodeAddInfoInner')
                assignInfoBlock({"Статус ОПГ": sp.STATUS_OPG,}, '#nodeAddInfoInner')
                assignInfoBlock({"Статья ЕРДР": sp.STATYA_ERDR,}, '#nodeAddInfoInner')
                assignInfoBlock({"Статус ЕРДР": sp.STATUS_ERDR,}, '#nodeAddInfoInner')
                assignInfoBlock({"Орган регистрации": sp.ORGAN_REGISTER,}, '#nodeAddInfoInner')
                assignInfoBlock({"ФПГ": sp.FPG,}, '#nodeAddInfoInner')
                assignInfoBlock({"Направлено в": sp.Napravlenio_V,}, '#nodeAddInfoInner')

                assignInfoBlock({"Взыскатель": sp.Vziskatel}, '#nodeAddInfoInner')
                assignInfoBlock({"Дата": sp.dataa}, '#nodeAddInfoInner')
                assignInfoBlock({"Должник": sp.dolzhnik}, '#nodeAddInfoInner')
                assignInfoBlock({"Категория": sp.kategoria}, '#nodeAddInfoInner')
                assignInfoBlock({"Орган": sp.organ}, '#nodeAddInfoInner')
                assignInfoBlock({"Сумма": sp.summa}, '#nodeAddInfoInner')

                assignInfoBlock({
                    "Просрочка": sp.DeadlinePassed,
                    "Дата регистрационного действия": sp.DateRegisterAction,
                    "Статус ПФР": sp.StatusPFR,
                    "ФПГ": sp.FPG,
                    "Бездействующие ЮЛ": sp.BEZDEYSTVIA_UL,
                    "ЕРДР": sp.ERDR,
                    "Банкрот": sp.Bankrot,
                    "ПДЛ": sp.PDL,
                    "Прекращено органом": sp.SroppedByOrgan,
                    "Приставание в общественных местах": sp.Pristavanie,
                    "Прекращено судом": sp.StoppedBySud,
                    "Розыск": sp.Rosizk,
                    "Должник": sp.Doljnik,
                    "Пропавший": sp.Propal,
                }, '#nodeAddInfoInner')
            }

      }, 

      deselectNode: (event) => {
        const infoBlock = document.querySelector("#nodeInfoInner")
        const addInfoBlock = document.querySelector("#nodeAddInfoInner")
        // const sudInfoBlock = document.querySelector("#nodeSudInfoInner")

        infoBlock.innerHTML = ""
        addInfoBlock.innerHTML = ""
        // sudInfoBlock.innerHTML = ""

        onSelectNode = false

        setShowNodeInfo(false)
        setShowEdgeInfo(false)
        setShowImage(false)
        setShowSudInfo(false)

      },

      selectEdge: (event) => {
        if (onSelectNode == true) return

        setShowNodeInfo(false)
        setShowEdgeInfo(true)
        setShowImage(false)
        setShowSudInfo(false)

        SelectedEdge = edges.filter(elem => elem.properties.id == Object.keys(Network.selectionHandler.selectionObj.edges)[0])[0]


        const infoBlock = document.querySelector("#nodeInfoInner")
        const addInfoBlock = document.querySelector("#nodeAddInfoInner")
        // const sudInfoBlock = document.querySelector("#nodeSudInfoInner")
        addInfoBlock.innerHTML = ""
        infoBlock.innerHTML = ""
        // sudInfoBlock.innerHTML = ""

        const sp = SelectedEdge.properties
        assignInfoBlock({
        //   "id": sp.id,
          "Вид связи": sp.Vid_svyaziey,
        //   "Label": sp.Label,
        //   "Source": sp.Source
        }, '#nodeInfoInner')

        if (SelectedEdge.type == "REG_ADDRESS_HIST" || SelectedEdge.type == "REG_ADDRESS_CUR" || SelectedEdge.type == "REG_ADDRESS") {
          assignInfoBlock({
            "Дата начала прописки": sp.Data_nachali_propiski || sp.data_nachalo,
            "Дата окончания прописки": sp.data_oconchanya,
            "Дата регистрационного действия": sp.data_reg,
            "Адрес": sp.address_of_reg,
            "РКА": sp.rka,
          }, '#nodeInfoInner')

        } else if (SelectedEdge.type == "WORKER_CUR" || SelectedEdge.type == "WORKER_HIST") {
          assignInfoBlock({
              "БИН/ИИН работадателя": sp.IINBIN_rabotadatelya,
              "ИИН": sp.IIN,
              "Дата начала отчисления ОПВ/СО": sp.data_nachalo,
              "Дата окончания отчисления ОПВ/СО": sp.data_oconchanya,
              "Количество месяцев пенсионных отчислений": sp.mesyac_pensionnih,
              "Пенсионные отчисления": sp.pensionnoe_otchislenie,
              "Социальные отчисления": sp.soc_ochislenya,
              "Средняя заработная плата": sp.average_zp,
              "Дата начало работы": sp.Start_Date,
              "Дата окончания работы": sp.End_Date,

          }, '#nodeInfoInner')

        } else if (SelectedEdge.type == 'SUDIM') {
          assignInfoBlock({
            "Дата начала заключения": sp.Data_nachala,
            "Дата конца заключения": sp.Data_konca,
            "Статья": sp.Statya,

          }, '#nodeInfoInner')

        } else if (SelectedEdge.type == 'UCHILSYA') {
          assignInfoBlock({
            "Год поступления": sp.data_nachalo,
            "Год окончания": sp.data_konca
          }, '#nodeInfoInner')

        } else {
          assignInfoBlock({
            "Название": sp.company,
            "Дата начала аффилированности": sp.Data_nachalo_affilirovannosti,
            "Тип аффилированности": sp.Type_affilirovannosti,
            "БИН/ИИН работадателя": sp.IINBIN_rabotadatelya,
            "Наименование типа должности на русском": sp.naimenovanie_tipa_dolzhnosty,
            "Наименование типа должности на русском ": sp.NAME_tipa_dolzhnosty,
            "Дата начала": sp.data_nachalo,
            "Дата окончания": sp.data_oconchanya,
            "ИИН": sp.IIN,
            "Общая сумма ЭСФ": sp.obshaya_summa,
            "ЭСФ за 2019 год": sp.esf_2019,
            "Телефон": sp.telephone,
            "ТИП": sp.tip,
            "Cумма": sp.sum,
            "Cумма по периодам": sp.sum_by_periods,
            "ЭСФ за 2020 год": sp.esf_2020,
            "ЭСФ за 2021 год": sp.esf_2021,
            "ЭСФ за 2022 год": sp.esf_2022,
            "ИИН-БИН поставщика": sp.IINBIN_postavshika,
            "БИН заказчика": sp.BIN_zakazchika,
            "Итоговая сумма, без НДС": sp.itog_summa,
            "Дата": sp.data,
            "Номер сделки": sp.nomer_sdelki,
            "Тип сделки": sp.type_sdelki,
            "Представитель": sp.predstavitel,
            "ПДЛ": sp.pdl,
            "РКА": sp.rka,
            "Год службы": sp.god_sluzhbi,
            "Описание": sp.opisanie
          }, '#nodeInfoInner')

            assignInfoBlock({"Взыскатель": sp.Vziskatel}, '#nodeInfoInner')
            assignInfoBlock({"Дата": sp.dataa}, '#nodeInfoInner')
            assignInfoBlock({"Должник": sp.dolzhnik}, '#nodeInfoInner')
            assignInfoBlock({"Категория": sp.kategoria}, '#nodeInfoInner')
            assignInfoBlock({"Орган": sp.organ}, '#nodeInfoInner')
            assignInfoBlock({"Сумма": sp.summa}, '#nodeInfoInner')

            // beneficiar
            assignInfoBlock({"Доп. инфо": sp.dop_info,}, '#nodeInfoInner')
            assignInfoBlock({"Код": sp.kod,}, '#nodeInfoInner')
        }
      },

      deselectEdge: (event) => {
        setShowNodeInfo(false)
        setShowEdgeInfo(false)
        setShowImage(false)
        setShowSudInfo(false)
      }

    }

    const search = () => {
        updateSearched()
        showSearched()
    }

    const update = () => {
        setNodes([])
        setEdges([])
        graJSON.nodes = []
        graJSON.edges = []
    }

    const searchNext = () => {
        setSliderPage(sliderPage + 1);
        if (sliderPage >= searchedNodes.length) {
            setSliderPage(0);
        }

        showSearched();
    }

    const searchPrev = () => {
        setSliderPage(sliderPage - 1);
        if (sliderPage < 0) {
            setSliderPage(searchedNodes.length - 1);
        }

        showSearched();
    }

    const updateSearched = () => {
        const value = document.getElementById("nodeSearchInput").value;

        const searchNodes = Object.values(Network.body.nodes).filter(elem => {
            for ( var key in elem.options.properties) {
                if (elem.options.properties.hasOwnProperty(key) && elem.options.properties[key] != null) {

                    // let result = elem.options.properties[key].toString().replace(/[a-zA-Z]/g, function(char) {
                    //     return char.toLowerCase()
                    // })
                    let result = elem.options.properties[key].toString().toLowerCase()
                    if (result.includes(value.toLowerCase())) {
                        return true;
                    }

                }

            }

            if (elem.options.label != undefined && elem.options.label.toLowerCase().includes(value.toLowerCase())) {
                return true;
            }
        });

        setSliderPage(0);
        setSearchedNodes(searchNodes);
    }

    const showSearched = () => {
        const item = searchedNodes[sliderPage];

        item && Network.focus(item.id, {
            scale: 1.5,
            offset: {
            x: 0,
            y: 0
            },
        })
    }

    const handleLeftOpen = (value) => {
      setOpenLeft(value)
    }

    const handleRightOpen = (value) => {
        setOpenRight(value)
    }

    const handleLayout = (layout) => {
        setLayoutOptions(prev => ({
            ...prev,
            hierarchical: layout
        }))

        setPhysicsEnable(!layout.enabled)
    }

    useEffect(() => {
        setUpdateGraph(prev => !prev)
    }, [physicsEnable])

    useEffect(() => {

        graJSON.edges = edges
        graJSON.nodes = nodes

        // Network.redraw()
    }, [nodes, edges])

    const download = () => {
        const target = Network.body.container
        html2canvas(target).then((canvas)=> {
            const base64image = canvas.toDataURL("image/png")
            var anchor = document.createElement('a')
            anchor.setAttribute("href", base64image)
            anchor.setAttribute("download", "graph-result.png")
            anchor.click()
            anchor.remove()
        })
    }

    const exportBt = () => {
        const fileName = "graph.txt"
        const fileContent = JSON.stringify(graJSON, null, 2)
        const blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"})
        const url = URL.createObjectURL(blob)

        let first = ""
        let second = ""

        if (graJSON.typeOfSearch == "con1") {
            if (graJSON.iin) {
                first = graJSON.params.person
                second = ""

            } else {
                first = "Фамилия: " + graJSON.params.lastName1 + ", имя: " + graJSON.params.firstName1 + ", отчество: " + graJSON.params.fatherName1
                second = "" 
            }

        } else if (graJSON.typeOfSearch == "con2") {
            if (graJSON.iin) {
                first = graJSON.params.person
                second = graJSON.params.person2

            } else {
                first = "Фамилия: " + graJSON.params.lastName1 + ", имя: " + graJSON.params.firstName1 + ", отчество: " + graJSON.params.fatherName1
                second = "Фамилия: " + graJSON.params.lastName2 + ", имя: " + graJSON.params.firstName2 + ", отчество: " + graJSON.params.fatherName2
            }

        } else if (graJSON.typeOfSearch == "con3") {
            if (graJSON.iin) {
                first = graJSON.params.person
                second = graJSON.params.ul

            } else {
                first = "Фамилия: " + graJSON.params.lastName1 + ", имя: " + graJSON.params.firstName1 + ", отчество: " + graJSON.params.fatherName1
                second = graJSON.params.ul
            }

        } else if (graJSON.typeOfSearch == "con4") {
            first = graJSON.params.ul
            second = ""

        } else if (graJSON.typeOfSearch == "con5") {
            first = graJSON.params.ul1
            second = graJSON.params.ul2

        }

        axios.get(`${baseURL}/downloadedscheme`, {params: {first: first, second: second}})

        const link = document.createElement("a")
        link.download = fileName;
        link.href = url;
        link.click();
    }

    const importBt = (file) =>  {
        setNodes([])
        setEdges([])

        setPhysicsEnable(true)

        setIsLoading(true)

        const res = JSON.parse(file)

        let _nodes = []
        let _edges = [];

        graJSON.typeOfSearch = res.typeOfSearch

        res.edges.map(item => {
            setEdgeSettings(item);
        })

        _edges = res.edges.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.id === value.id
            ))
        )
        
        res.nodes.filter(item => !nodes.includes(item)).map(item => {
            setNodeSettings(item)
        })

        _nodes = res.nodes.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.id === value.id
            ))
        )

        setCounter(currCounter => currCounter + 1)

        setNodes(_nodes)
        setEdges(_edges)

        graJSON.nodes = _nodes
        graJSON.edges = _edges
        graJSON.paramsOfSearch = res.paramsOfSearch
        graJSON.typeOfSearch = res.typeOfSearch
        
        setIsLoading(false)
        setShowActionBtn(true)

        return graJSON
    }

        return (
            <div className='mainSection'>
              <div className="leftBarOpen" style={{display: openLeft?'none':'block', transition: 'display .8s ease'}}>
                <IconButton aria-label="expand row" size="small" onClick={() => handleLeftOpen(true)}>
                  <KeyboardArrowRightIcon style={{ fill: '#000000' }}/>
                </IconButton>
              </div>
              {/* <LeftBar openLeft={openLeft} setLeftTabs={setLeftTabs} handleLeftOpen={handleLeftOpen} handleLayout={handleLayout} params={graJSON} update={update} downloadScheme={download} exportBt={exportBt} handleSubmit={Submit}></LeftBar> */}
              <div className={`centralBar ${openLeft && openRight ?'centralBar60' : openLeft || openRight ? 'centralBar80' : 'centralBar100'} `}>
                  <div className="nodeSearch">
                      <div>
                          <input type="text" id="nodeSearchInput" style={{opacity: '0.3'}} placeholder="Поиск по схеме" 
                              onKeyDown={event => {
                                  if (event.key === 'Enter') {
                                      if(event.target.value != "") search(event.target.value) 
                                      else Network.fit({});
                                  }
                              }}
                              onChange={event => {
                                  if (event.target.value == "") Network.fit({});
                              }}
                          />
                          <i className="fa-solid fa-magnifying-glass"
                              onClick={() => search()}>
                          </i>
                      </div>
                      <div>
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA4UlEQVR4nK3UMUoDQRSH8V2wiDaWCvZ24hHEVgjewCt4hO//hl3YZk9gZ+0NAiktUwqW6dOl0sInKw6kyIqZfV85xY/h8WaqKqY6yKkq4E7SUwR0DjxLckmLKVYNPACbX8yLwZTSFfC6A3kR2Pf9MSBJH3swPwg0s1tJ7yOQ/xts2/ZsZ+g+Baz3DL0MBC6B5QGQj4Jd150CqwLM/7rhkaRHSdsQMNc0zQXwEgbmzGwuaR0GDgEnw1IDnyFgLqV0PfLsfMrnMLaji1Lwp/yKgK8QMGdmN8BbGDgEzMzsPh98A4cThMeOLdocAAAAAElFTkSuQmCC"
                              onClick={() => searchPrev()}/>
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAzUlEQVR4nK3UPQ4BURiF4RFKKjW1hFZiEaKhtg3le+5MMsmUSq1yWguwA7EIYgNEITHiLxTCNfOd5LRPMnPy3SB4pRRYBuhLmiVJUrMCB5IySVtgZAlmjy6ApiWYAXtJkzRNyyagXvDKOdc1A3XvSdLUezR+g89unXNDSzB7jhZFUcMS/D4aOcBHjx9/QU5wCbQsPnkHjL/ePx4gcAbmcRzXC68MrIHeT8gDPFyXBCrBP+EzmP+B4A0ENl7X4AHe7hWoFsKuCcOwDXSKQhcGtZXbAfm2YgAAAABJRU5ErkJggg=="
                              onClick={() => searchNext()}/>
                      </div>
                  </div>
                  <Graph
                      key={Math.random()}
                      graph={{nodes: nodes, edges: edges}}
                      options={graphOptions}
                      events={events}
                      getNetwork={network => {
                        Network = network;
                      }}
                      manipulation={manipulation}
                      className={"graph"}
                      updateGraph={updateGraph}
                  />
              </div>
                <div style={{display: 'none'}} ref={itapRef} onClick={() => download()}></div>
                <div className="rightBarOpen" style={{display: openRight?'none':'block', transition: 'display .8s ease'}}>
                    <IconButton aria-label="expand row" size="small" onClick={() => handleRightOpen(true)}>
                        <KeyboardArrowLeftIcon style={{ fill: '#FFF' }}/>
                    </IconButton>
                </div>
                <RightBar leftTabs={leftTabs} handleRightOpen={handleRightOpen} openRight={openRight} setShowRels={setShowRels} setOpenLimit={setOpenLimit} Network={Network} showAction={showActionBtn} shortOpen={shortOpen} shortHide={shortHide} isOnSelectNode={showNodeInfo} isOnSelectEdge={showEdgeInfo} showImage={showNodeImage} showSudInfo={showSudInfo}></RightBar>
            </div>
        )
      }

export default GraphNetnew;


//local usage networks
const iin890724350918 = {
    "nodes": [
      {
        "id": 158303388,
        "photoDbf": null,
        "properties": {
          "Status_neplatejasposobnosti": null,
          "IINBIN": "961140001200",
          "Buhgalter": "ПОДГОРНОВА ЕЛЕНА, ИИН:761124402681",
          "Label": "COMPANY",
          "License": null,
          "BLOCK_ESF": null,
          "STATYA_ERDR": null,
          "Status_Uchastnika_MFCA": null,
          "Source": "EHD",
          "Nomer_sdelki": null,
          "Name": "Товарищество с ограниченной ответственностью фирма \"ЖЕНИС\"",
          "Type": "ЮЛ",
          "BEZDEYSTVIA_UL": null,
          "PersonID": "961140001200",
          "PRIKAZ_O_SNYATYA": null,
          "Unique_id": null,
          "ORGAN_REGISTER": null,
          "Napravlenio_V": null,
          "STATUS_ERDR": null,
          "NDS": null,
          "STATUS_OPG": null,
          "FPG": null
        },
        "opened": false,
        "label": "Товарищество с ограниченной ответственностью фирма \"ЖЕНИС\"",
        "group": "company"
      },
      {
        "id": 81105427,
        "photoDbf": {
          "iin": "890724350918",
          "document_type_id": "2",
          "photo": "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",
          "date": "2019-01-22 10:07:56"
        },
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": "Общее кол-во займов: 2,\nСумма долга по займам: 561849,33,\nОбщая сумма займов: 618099,33,\nМакс. кол-во дней просрочки: 2867",
          "Familia": "АЛИМБАЕВ",
          "V_Roziske": null,
          "GLK": null,
          "Label": "ZAGS",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "BIRTH",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "24.07.1989",
          "Propal": null,
          "PersonID": "28162555",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 81105427,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "АЛИМБАЕВ КУАНЫШ ЕЛЬТАЕВИЧ",
          "IIN": "890724350918",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "ЕЛЬТАЕВИЧ"
        },
        "opened": false,
        "label": "АЛИМБАЕВ КУАНЫШ ЕЛЬТАЕВИЧ",
        "group": "keyJudgePerson"
      },
      {
        "id": 31345090,
        "photoDbf": {
          "iin": "890724350918",
          "document_type_id": "2",
          "photo": "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",
          "date": "2019-01-22 10:07:56"
        },
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": "Общее кол-во займов: 2,\nСумма долга по займам: 561849,33,\nОбщая сумма займов: 618099,33,\nМакс. кол-во дней просрочки: 2867",
          "Familia": "АЛИМБАЕВ",
          "V_Roziske": null,
          "GLK": null,
          "Label": "MVD",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "Форма 1",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "24.07.1989",
          "Propal": null,
          "PersonID": "117276646",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 31345090,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "АЛИМБАЕВ КУАНЫШ ЕЛЬТАЕВИЧ",
          "IIN": "890724350918",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "ЕЛЬТАЕВИЧ"
        },
        "opened": false,
        "label": "АЛИМБАЕВ КУАНЫШ ЕЛЬТАЕВИЧ",
        "group": "keyJudgePerson"
      },
      {
        "id": 8434102,
        "photoDbf": {
          "iin": "871004450807",
          "document_type_id": "2",
          "photo": "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",
          "date": "2019-01-23 01:48:17"
        },
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "АЛИМБАЕВА",
          "V_Roziske": null,
          "GLK": null,
          "Label": "ZAGS",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "BIRTH",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "04.10.1987",
          "Propal": null,
          "PersonID": "924556",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 8434102,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "АЛИМБАЕВА АСЕЛЬ ЕЛЬТАЕВНА",
          "IIN": "871004450807",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "ЕЛЬТАЕВНА"
        },
        "opened": false,
        "label": "АЛИМБАЕВА АСЕЛЬ ЕЛЬТАЕВНА",
        "group": "person"
      },
      {
        "id": 164515400,
        "photoDbf": null,
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "ЕЛЬТАЙ",
          "V_Roziske": null,
          "GLK": null,
          "Label": "ZAGS",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "BIRTH",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "2017-04-28",
          "Propal": null,
          "PersonID": null,
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 164515400,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "ЕЛЬТАЙ ӘМІР-ӘЛІ ҚУАНЫШҰЛЫ",
          "IIN": "170428500241",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "ҚУАНЫШҰЛЫ"
        },
        "opened": false,
        "label": "ЕЛЬТАЙ ӘМІР-ӘЛІ ҚУАНЫШҰЛЫ",
        "group": "person"
      },
      {
        "id": 66556864,
        "photoDbf": null,
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "ЕЛЬТАЙ",
          "V_Roziske": null,
          "GLK": null,
          "Label": "ZAGS",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "BIRTH",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "28.04.2017",
          "Propal": null,
          "PersonID": "13607120",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 66556864,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "ЕЛЬТАЙ ӘМІР-ӘЛІ ҚУАНЫШҰЛЫ",
          "IIN": "170428500241",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "ҚУАНЫШҰЛЫ"
        },
        "opened": false,
        "label": "ЕЛЬТАЙ ӘМІР-ӘЛІ ҚУАНЫШҰЛЫ",
        "group": "person"
      },
      {
        "id": 67102909,
        "photoDbf": {
          "iin": "641221400539",
          "document_type_id": "2",
          "photo": "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",
          "date": "2019-01-22 10:26:29"
        },
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "АЛИМБАЕВА",
          "V_Roziske": null,
          "GLK": null,
          "Label": "ZAGS",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "BIRTH",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "21.12.1964",
          "Propal": null,
          "PersonID": "14249062",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 67102909,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "АЛИМБАЕВА КУЛЖАН ДОСАНОВНА",
          "IIN": "641221400539",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "ДОСАНОВНА"
        },
        "opened": false,
        "label": "АЛИМБАЕВА КУЛЖАН ДОСАНОВНА",
        "group": "person"
      },
      {
        "id": 37654855,
        "photoDbf": {
          "iin": "901027401358",
          "document_type_id": "2",
          "photo": "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",
          "date": "2019-01-23 02:27:19"
        },
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": "Общее кол-во займов: 5,\nСумма долга по займам: 330473,\nОбщая сумма займов: 1235094,1,\nМакс. кол-во дней просрочки: 2199",
          "Familia": "СМАГУЛОВА",
          "V_Roziske": null,
          "GLK": null,
          "Label": "GBDFL",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "Person",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "27.10.1990",
          "Propal": null,
          "PersonID": "123728294",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 37654855,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "СМАГУЛОВА ЖАДЫРА АЛТЫНГАЗИЕВНА",
          "IIN": "901027401358",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "АЛТЫНГАЗИЕВНА"
        },
        "opened": false,
        "label": "СМАГУЛОВА ЖАДЫРА АЛТЫНГАЗИЕВНА",
        "group": "judgePerson"
      },
      {
        "id": 19178869,
        "photoDbf": null,
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "АЛИМБАЕВ",
          "V_Roziske": null,
          "GLK": null,
          "Label": "MVD",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "Форма 1",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "15.01.1962",
          "Propal": null,
          "PersonID": "105251787",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 19178869,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "АЛИМБАЕВ ЕЛЬТАЙ ЕСКЕНДИРОВИЧ",
          "IIN": null,
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "ЕСКЕНДИРОВИЧ"
        },
        "opened": false,
        "label": "АЛИМБАЕВ ЕЛЬТАЙ ЕСКЕНДИРОВИЧ",
        "group": "personJai"
      },
      {
        "id": 114159577,
        "photoDbf": null,
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "АЛИМБАЕВ",
          "V_Roziske": null,
          "GLK": null,
          "Label": "ZAGS",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "BIRTH",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "15.01.1962",
          "Propal": null,
          "PersonID": "61317443",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 114159577,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "АЛИМБАЕВ ЕЛЬТАЙ ЕСКЕНДЫРОВИЧ",
          "IIN": null,
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "ЕСКЕНДЫРОВИЧ"
        },
        "opened": false,
        "label": "АЛИМБАЕВ ЕЛЬТАЙ ЕСКЕНДЫРОВИЧ",
        "group": "personJai"
      }
    ],
    "edges": [
      {
        "from": 158303388,
        "to": 81105427,
        "type": "WORKER_HIST",
        "properties": {
          "data_oconchanya": "2020-08-01",
          "pensionnoe_otchislenie": "165390",
          "IINBIN_rabotadatelya": "961140001200",
          "average_zp": "206737,5",
          "Label": "GCVP",
          "mesyac_pensionnih": "8",
          "id": 203942254,
          "Vid_svyaziey": "Бывший сотрудник",
          "Source": "GCVP",
          "IIN": "890724350918",
          "data_nachalo": "2020-01-01",
          "soc_ochislenya": "54016"
        },
        "label": "Бывший сотрудник",
        "color": "#9999f2",
        "font": {
          "color": "white"
        },
        "id": 203942254
      },
      {
        "from": 31345090,
        "to": 8434102,
        "type": "SIBLING",
        "properties": {
          "id": 335071212,
          "Vid_svyaziey": "Родные Брат/Сестра"
        },
        "label": "Родные Брат/Сестра",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 335071212
      },
      {
        "from": 31345090,
        "to": 164515400,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 56213249,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "ZAGS"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 56213249
      },
      {
        "from": 31345090,
        "to": 66556864,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 56213246,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "ZAGS"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 56213246
      },
      {
        "from": 8434102,
        "to": 81105427,
        "type": "SIBLING",
        "properties": {
          "id": 335071215,
          "Vid_svyaziey": "Родные Брат/Сестра"
        },
        "label": "Родные Брат/Сестра",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 335071215
      },
      {
        "from": 8434102,
        "to": 31345090,
        "type": "SIBLING",
        "properties": {
          "id": 335071214,
          "Vid_svyaziey": "Родные Брат/Сестра"
        },
        "label": "Родные Брат/Сестра",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 335071214
      },
      {
        "from": 81105427,
        "to": 8434102,
        "type": "SIBLING",
        "properties": {
          "id": 335071213,
          "Vid_svyaziey": "Родные Брат/Сестра"
        },
        "label": "Родные Брат/Сестра",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 335071213
      },
      {
        "from": 81105427,
        "to": 67102909,
        "type": "ZAGS",
        "properties": {
          "Label": "MVD",
          "id": 19278744,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "Форма 1"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 19278744
      },
      {
        "from": 81105427,
        "to": 164515400,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 56213251,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "ZAGS"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 56213251
      },
      {
        "from": 81105427,
        "to": 66556864,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 96548308,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "BIRTH"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 96548308
      },
      {
        "from": 81105427,
        "to": 66556864,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 56213247,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "ZAGS"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 56213247
      },
      {
        "from": 81105427,
        "to": 37654855,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 140620746,
          "Vid_svyaziey": "БРАК",
          "Source": "MARRIAGE"
        },
        "label": "БРАК",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 140620746
      },
      {
        "from": 67102909,
        "to": 81105427,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 29539253,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "BIRTH"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 29539253
      },
      {
        "from": 19178869,
        "to": 81105427,
        "type": "ZAGS",
        "properties": {
          "Label": "MVD",
          "id": 19702703,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "Форма 1"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 19702703
      },
      {
        "from": 114159577,
        "to": 81105427,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 27850662,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "BIRTH"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 27850662
      }
    ],
    "typeOfSearch": "con1",
    "params": {
      "person": "890724350918",
      "relations": "BUHGALTER,DETDOM_HIST,DFO_AFF_FIZ,DFO_AFF_UL,DIRECTOR_CUR,DIRECTOR_HIST,FOUNDER_CUR,FOUNDER_HIST,ESF_100,ESF_10and100,ESF_10and50,ESF_50and100,ESF_5and10,FPG,GOSZAKUP,IP_KX,NTR_FL,NTR_UL_FL,OPG,PDL,REG_ADDRESS,REG_ADDRESS_CUR,REG_ADDRESS_HIST,REG_ADDRESS_UL,SLUZHIL,SUDIM,UCHILSYA,WORKER_CUR,WORKER_HIST,ZAGS,ZAGS_FIO,ZAGS_IIN,BLIZKIE_RODS,COUSIN,SIBLING",
      "depth": 1,
      "limit": "30",
      "approvement_type": "",
      "orderNum": "",
      "orderDate": "",
      "articleName": "",
      "caseNum": "",
      "checkingName": "",
      "otherReasons": "",
      "organName": "",
      "rukName": "",
      "sphereName": "",
      "tematikName": ""
    },
    "iin": false
}

const iin811006300996 = {
"nodes": [
    {
    "id": 158549415,
    "photoDbf": null,
    "properties": {
        "Status_neplatejasposobnosti": null,
        "IINBIN": "160140006975",
        "Buhgalter": null,
        "Label": "COMPANY",
        "License": null,
        "BLOCK_ESF": null,
        "STATYA_ERDR": null,
        "Status_Uchastnika_MFCA": null,
        "Source": "EHD",
        "Nomer_sdelki": null,
        "Name": "Государственное учреждение \"Агентство Республики Казахстан по противодейcтвию коррупции (Антикоррупционная служба)\"",
        "Type": "ЮЛ",
        "BEZDEYSTVIA_UL": null,
        "PersonID": "160140006975",
        "PRIKAZ_O_SNYATYA": null,
        "Unique_id": null,
        "ORGAN_REGISTER": null,
        "Napravlenio_V": null,
        "STATUS_ERDR": null,
        "NDS": null,
        "STATUS_OPG": null,
        "FPG": null
    },
    "opened": false,
    "label": "Государственное учреждение \"Агентство Республики Казахстан п\nо противодейcтвию коррупции (Антикоррупционная служба)\"",
    "group": "company"
    },
    {
    "id": 145882725,
    "photoDbf": {
        "iin": "811006300996",
        "document_type_id": "2",
        "photo": "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",
        "date": "2019-01-22 04:08:38"
    },
    "properties": {
        "Death_Status": null,
        "RIP_date": null,
        "Status_neplatejasposobnosti": null,
        "Familia": "БОЖБАНОВ",
        "V_Roziske": null,
        "GLK": null,
        "Label": "GBDFL adress",
        "Razmer_Shtrafa": null,
        "Pristavanie": null,
        "PFR_Info": null,
        "Source": "REG_ADDRESS",
        "Statya": null,
        "Notarius": null,
        "Data_Rozhdenya": "06.10.1981",
        "Propal": null,
        "PersonID": "93035088",
        "Med_org": null,
        "Advocat": null,
        "Autditor": null,
        "Status_KUIS": null,
        "id": 145882725,
        "Doljnik_po_alimentam": null,
        "Status_doljnika": null,
        "Status_Minzdrav": null,
        "FIO": "БОЖБАНОВ АБЗАЛ БЕКМУРЗАЕВИЧ",
        "IIN": "811006300996",
        "Organ_pravanarushenya": null,
        "Sud_ispolnitel": null,
        "Data_reshenya": null,
        "Date_of_Death": null,
        "Otchestvo": "БЕКМУРЗАЕВИЧ"
    },
    "opened": false,
    "label": "БОЖБАНОВ АБЗАЛ БЕКМУРЗАЕВИЧ",
    "group": "keyPerson"
    },
    {
    "id": 158549500,
    "photoDbf": null,
    "properties": {
        "Status_neplatejasposobnosti": null,
        "IINBIN": "160140014897",
        "Buhgalter": null,
        "Label": "COMPANY",
        "License": null,
        "BLOCK_ESF": null,
        "STATYA_ERDR": null,
        "Status_Uchastnika_MFCA": null,
        "Source": "EHD",
        "Nomer_sdelki": null,
        "Name": "Республиканское государственное учреждение \"Департамент Агентства Республики Казахстан по противодействию коррупции (Антикоррупционной службы) по городу Нур-Султану\"",
        "Type": "ЮЛ",
        "BEZDEYSTVIA_UL": null,
        "PersonID": "160140014897",
        "PRIKAZ_O_SNYATYA": null,
        "Unique_id": null,
        "ORGAN_REGISTER": null,
        "Napravlenio_V": null,
        "STATUS_ERDR": null,
        "NDS": null,
        "STATUS_OPG": null,
        "FPG": null
    },
    "opened": false,
    "label": "Республиканское государственное учреждение \"Департамент Аген\nтства Республики Казахстан по противодействию коррупции (Ант\nикоррупционной службы) по городу Нур-Султану\"",
    "group": "company"
    },
    {
    "id": 5729783,
    "photoDbf": null,
    "properties": {
        "Adress_propiski": "УЛИЦА Габидена Мустафина, 21, , 48",
        "Label": "RN",
        "Source": "REG_ADDRESS",
        "Kod_oblasti": "407",
        "Ulica": "УЛИЦА Габидена Мустафина",
        "Opisanie": null,
        "PersonID": "1201400009926256",
        "Rayon": null,
        "Naselenni_punct": null,
        "type_stroenie": null,
        "Kod_rayona": "22",
        "Type_adresa": null,
        "Kadastr_nomer": null,
        "Gorod": null,
        "Dom": null,
        "Kod_Strani": "105",
        "Dop_1": null,
        "PKA": "1201400009926256",
        "IP_address": null,
        "Dop_2": null,
        "Stroenie": "21",
        "Dop_3": null,
        "Korpus": null,
        "Oblast": null,
        "Uchastok": null,
        "Kvartira": "48"
    },
    "opened": false,
    "group": "PROPISKA",
    "label": "УЛИЦА Габидена Мустафина, 21, , 48"
    },
    {
    "id": 2875618,
    "photoDbf": null,
    "properties": {
        "Adress_propiski": "г. Нур-Султан, р-н Сарыарка, ж.м. Көктал, ул. Моншакты, д. 12, , , ",
        "Label": "RN",
        "Source": "RN",
        "Kod_oblasti": null,
        "Ulica": "г. Нур-Султан, р-н Сарыарка, ж.м. Көктал, ул. Моншакты, д. 12",
        "Opisanie": null,
        "PersonID": "0201700062873561",
        "Rayon": null,
        "Naselenni_punct": null,
        "type_stroenie": null,
        "Kod_rayona": null,
        "Type_adresa": null,
        "Kadastr_nomer": null,
        "Gorod": null,
        "Dom": null,
        "Kod_Strani": null,
        "Dop_1": null,
        "PKA": "0201700062873561",
        "IP_address": null,
        "Dop_2": null,
        "Stroenie": null,
        "Dop_3": null,
        "Korpus": null,
        "Oblast": null,
        "Uchastok": null,
        "Kvartira": null
    },
    "opened": false,
    "group": "PROPISKA",
    "label": "г. Нур-Султан, р-н Сарыарка, ж.м. Көктал, ул. Моншакты, д. 12, , , "
    },
    {
    "id": 614323,
    "photoDbf": null,
    "properties": {
        "Adress_propiski": "г. Нур-Султан, р-н Сарыарка, ул. Әлия Молдағұлова, д. 6/4, , , ",
        "Label": "RN",
        "Source": "RN",
        "Kod_oblasti": null,
        "Ulica": "г. Нур-Султан, р-н Сарыарка, ул. Әлия Молдағұлова, д. 6/4",
        "Opisanie": null,
        "PersonID": "0201300081582009",
        "Rayon": null,
        "Naselenni_punct": null,
        "type_stroenie": null,
        "Kod_rayona": null,
        "Type_adresa": null,
        "Kadastr_nomer": null,
        "Gorod": null,
        "Dom": null,
        "Kod_Strani": null,
        "Dop_1": null,
        "PKA": "0201300081582009",
        "IP_address": null,
        "Dop_2": null,
        "Stroenie": null,
        "Dop_3": null,
        "Korpus": null,
        "Oblast": null,
        "Uchastok": null,
        "Kvartira": null
    },
    "opened": false,
    "group": "PROPISKA",
    "label": "г. Нур-Султан, р-н Сарыарка, ул. Әлия Молдағұлова, д. 6/4, , , "
    },
    {
    "id": 138526948,
    "photoDbf": {
        "iin": "530604400921",
        "document_type_id": "1",
        "photo": "/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAITAZ0DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6FooooJCiiigAozTc0hNMBxPFANNFLQIKTNJmkpgFFFFAAOKdmm0UAKeaSikzQAtOyMVHmkBzkUgHn6ilUimou7k4PtSNsHDOq/U0AS00MD0x+dVy8acqc/8AAqimunUYRomH90Nz/KgRe7Zpy49azPPl2bvJQ/8AAz/hWRN4qs4J/KmhYdPnWQED86dhcx1fSkya5e48WwRJlQhHYs4ArGHjG5mvVEFvCytk8SZ7fSlYLnoCkZwCM+maXB5wM49K8yPjqaGYy3VsEIOzywcEH3z9KvaD8QYdQ1pLKdYoVbgSs4XHHTk/Wiwrnf8AIHI49fSmSsQQFAz6k9KrvdQhGZZEIHbcMH8ar/aikUc05i3SoJFXPQHnB96Ni1qXln4DF12n+IKSPzqZWJPt2PSuYs9Yl1G5aONfs4TLFiNzEDjpwB1HrVm2u54HkiLl440LEkAE4+g9KAN80m4VnJeb4lcQvlgCMn/61WVaRkyWVf8AZxSGTMwXoRT+1VtrbccE1JFMJACwwaAJRS0lLQAUUUUAFFFFABRRRQCCiiigAooooAKKKKACiiigCM9aKD1pCaA6C0U3PFANOIhCeetFIepoFMBaKKKAEpR0pKM0hC0UmaM0AOzSZpuaAaAFJwM00ZPIpH6Y/M0ye5itoi0rCNMfeY/rRYVyXIXgniqkl+NzRogIHVj1rmfEHjHTtNjEtxIyxbiFGRmTHGQv3j68A/lXnGufGKyNrLHpzpaxjjIILHGc/wAOe1NITketXd/BFIyu0xcjoDxn/PvXM618RND0eUxXTiKfAOwQtz15BAP64/w+dfEXj7UNQmkMd9dbSSUYOVOM+vBrlX1VSsjXPmTTsR85ck9D/wDWqraEc9z6H1D4nJqVwLXRVMkuCxkmLRjHpxk1m6jq+pyW0s02sWoRcSmKB7gMCP4DlcEHp1rwWK/XcQVGCOjKCPyIqZNSyNqh+OnPH5UJBc9R1jxBNcWy/uj5rDaGV+o5yefxrDt9XNvaeXH+7zk/MTnjnjFccNWuI43KTup/3qo3GsSykGWQs3rgcUtS7nVy6p5bB0ZBIh2YOTuA7npzXR6R8SNQtiEni8xQMBFkYfzNeWi+wwO9jk5bA5NXl1W1a0hVYh5yH967dxzj+lF2Fz2OTxfBq2nPE1tCvm7WSTaS6nP3c/pn2rBHiCG2ufLu43e3hfc21sn02gEd/Xtnoe/mUGqGKT7zp7g0+bUfNO4yMcnOe/507WE2e5eFPijD59vbkSSx3LERod2F6g8E4z3zx29K9V0/WrbUZEsgYYJbaNWUFWLMBwCSBjP418fWk7Q7WjO1FOcAV2tj8RNQtoir3k75UKpbBKgdgSMgewpWuCZ9BW129nJPcT3LyMznKYPy7mJGOef0pia9Ja3qi4iWSK8cK24kkMWyR9PlIrwaD4gXdzPucNtCqpyyjcAMc8c9Bya0tP8AGitqNu96JWiXO5DhuME9fqc0WKufSCanaLbhEfDOpCLsOFOOmfQZFaNq/wAmzIJxnOPc8V5b4X1nT71IryC8ZYo8s1uQW5I9OnYdfT2rtrDUGYbLGMOQpLiPAC89SMcdaVik0dETsXLnd7EVn2klxBcOZhH9kZiAVJ37iT17dc05J0A/feZvIypLEg/r/OpP3TLtIIO3O/HVj/k/nSGX42DAMvQ1J9apQMY1Vcg4A5zirKSjA3E5PtSAmFFN3DtzS0AA60tMB5NOoGLRSUUCFopKKAFopBS0AFFFFABRRRQBDmkJopDTsK4uaBSUULQAopKM0AFGaaTSZoEPzSZpuaKAHZpM03NJn3oEPBzQcLyxwDUe7CM2flAzntj1rlvEXie009JhLPDHCisXc5Jb5TwB7njIzTQrm1q2r2thEZLiQxIqlmLjHA9jzXivj/4swErFp87uOdoEYKkcjnn6da8y+IXj+51O/SKCNIbZU+RM7iOhySR3P06V5xLcuSeBuOMnIOcZ5/WmTqdLrfirVdXmMl5qMzAMSqhtoTP93HTp2rnJLtmkILFkLZOf1/rVKSdi2OKhMrAnGKTY1Bsuy3LZbax2j7uewqKOQswLv9aqbyc571YtYVfl3249qaK5ElqaVufNY4HA7mlc7QRuA+lDHaq+UhAH8R6VQmkcE8AmrRnyvoTSSqCFV3J75PFVpJRu4NQkyE7tp/KgKZOvB6VNzRRtuK0zBvlYjtQJT8wLfK3XHegxBepoWB2B2gk+lLUr3R4mJc/N+dTRSjcNzce1QLayEZII/CpEtihyW/IUrMiXL3NFboqpGcr3xSwTtIxwy4HtVFSV4IwD1zVxz5Kr5KFs9cZOKpMzL7z7YB5TEOOpA96mgv2KDcSGPG49cVlrK69ADnrUyTjKqcZz60XKjqdBa69e2Dotre3ESHGfLYjIzzn14rpNI8fa1YFm/ta5DNwzK3BHGAc9R1rz+WfZg5GKhlmd32hhsPfFNDsfRGjfF/TJ4mXUpp4ygALBHIJ9vmP6YrcHxS0VLeOWG+uWfI3K0ZKkfzr5dmmaKMKG4HuKSC/kDiNjGFHfH/16HFAmz7E0n4m+Gr612y3jwztkDK4AOPqcc11+i6tbajbeZYv9qizjehBx9ea+HYtRYjy2CtEozkeufzNdb4c14WkoltvJjuldSMZ2tjpndnHU96lxHdn2SjDqGHBwRnBqYHPrXk3hD4hf2g0i3j28brgYVx+fSvS7C+inG5JUI254NTYpMvgc0ZGSO4phkAz0pkbfvCw6H/69BVybtmikBwKM0gFHNFC9KKAFFGaSigBc0ZpKKAFzS02nUAV6Q9KKaTTEOJ4pM03NFAC5pDSUE0CFpCaQmkzQIfTT1pM0BgDg9TyKAIzNg42mopLpLfHyPKzHonWquqavbaXbmW5ZgCeGAPJx0xXjnxD8fHTbeESNcwJcIHSMBcsM8MSP/QaaRLkdB8Q/H8FjBd2lvLBcXsL7ZUE4whwcjIOTjnIIHIHSvm/xj4nuNT1CQ3Dq5JDKqOcAc4HJPrWb4j8SXOqyjexWPdlOF5x0zgVhE5DyOcnqfemIc7tK5PA+lVp8jjNLcTl2whKqOw4qCk2aRi92HWnpGGzzzjNOhRtwbtVuAIgZgmSKSVwlO2w22teAzdPcVZDRwt/e9hURkeZwoJUdMZqTy0iJ6Fvp0rS2hjJ9x0lzJOyhYggHc5qlLKwLFsc+lSXM7MuAce9VTEx+vrQk0XBdWMZySfSnRRtJ0OBnrU8CLGCzAE1NGGkGD3PHNJRKc7bDYodhwuWNWY0kVshf0NWGZIEXZweh4qvJqasNsUblx3Jp3sZayJNhXlmGPSnBo9vKgn8KyfPd2IbLH3NOeRVU9Q30pXuVyNG3DcxBCvlrk+uKa06sdwAA6cViMwYjaTuHqKlgeVEIY+/WgOXQ0ftIfKiPdjvQq/uyQAG9Kpmd9vFNWVs4BIPrSuNGgVDRgyHBHFV5iUf92cgjFQ+eH3I+SR3p0YMi4AHT0oTBjo8RggHcT3NPXLErgZFNhhJBEo+WpEkjjkJIOTVJ3J1GRTtHKVZc1N5ud2AwPGMUnnI0gGDg1My/3fxo2FqbOi6m9vdLIpZSpB5bAODX0D4O1prmCK/0+eISKpV7d3+4SSDwDxyDz74xzx80bnG3viun8Maw9g4cMwXbt+U0i1Kx9i6NrA1SzRoYyrMnOeVVs/dJ/vAYwPTB9q1IlKAZJLd/rXi/gPxTZtNa3atLtVDE8ZByO+8duuPft0r2PT7yO/tIp4WZkdQQWGDUlplzPFJmmngYpM1JVyRTSk0xTQfagLkmeTRmo+aMmgVyTNJj3puRQDTsFx4opAaUGpGVieaaaXPNNNUIWjNNzSUCHZpM0lJQApNJmkye9FAhcjnJxWXr2s2ul2U0k8qo7RkRgnkt6/hkVduJBGp3c56e/Gf6V4t8X/EyW160COm9IyFBGSjYBPyk46FeoP8ASmkI5zx145ms3jWa4kuNTHDO0YHlgjIG1hwehzgV4hrOsTXlyZri4lnmJJLOcnqc/mT+lT+ItYlv7wzSSu7OAS7tknHHUnPaubJJzk5P1pt2CMb7lhW+TJJ/E1EXJ3Acg9qYWJGKFyDkCouy1Gwg6881PFETyFyOtMjCc7uvapi7KvBA46U0KTvoicMix7QMsfbpQ0blCwHynqfSobcFvmcgL61Iskknyq3yfzrRGVrMaAARsJ47nvT33ZwgyT70ix5cHOAOtTq6qRhcntxVWE2RW9ukYZrogk9FHJNP2mUEqrbF5wBQVLPufIPr6Vcg+WHaoOG4PvQkJu+rK8ECD55CPUL1oeTY4KghR2q6sCeWWPDjoCay7mTc2M4wO1IUdRk9ycnBwevNU2kcnJY/hRI+4/SmVm2dMYpIljlK5zk5qQtvjBBCn3aq1LnjGTikmNxW5JK4J6ZPrmnxz4zuB6YBz0qA9eOlJRzMOVWLyTI2BKTg+1PMQbd5EgbB78VQGT36VNDceXRcnlLAHysjYD+o5pFUjkSBcdzUZuAWJGB9RUZncqSQpHTpQLlZpFpPJyJlI9jURJMeSh471VtWLEq7HZ7Grat1G8Y9KpMiSsNYllRkLZ+lTrJIODkk01ZUAZQBkDOcVA1wYyCTz9KLk2b2NWOXavPUU9HXblPlPc561k+czchutTRXBC4YimB1Og67LaSqouGQBscAZxkcZ9K+gfhh41iEdpZ3l6581hsY4x0+7+g/76r5WgnH2oN26V3HhbUzDA++VgU+eN16xnB5B7dBSGmfawb1wT6g8U415z8LPGiazDLY6ncp9viAKk8b1ZjjBzzzx+Veic9utJqxpFjqUGmA8UtIodmikpeMGnYBM0opKUUAKKXNNBFLkUrDuVz1pueTQetFBIUUZppNABmkJ96SkzigQuaWmg5pJSqrzTQmYPi+8itbFt1xHGWYIzN/AgB+b8AucV8nfE/UorrxJemBxLEh2rMOj46sOOhGK9h+OurfZLC+tgSJZtiEhvuryxx7/KR+NfNeq3eUeMA4IHJPJ6frVbE7uxlMDJyASBxUfTjFPZNijJ609EyuCazbNbpIiUZIqWTCqIw2c4J9qjcjecdKdwpz7UIb1GZ2k4pVy7c84ptORtuTTW47EkkjOm3bgVaUbPlH3R3qtAfL/eNyp7VK84b5T19a1iYyXRErynI2rx61NBGsmWZvpVOP5329qsOwUBEGcdTTM5K2iJmQlsIST9KEuDvOAM9AKrytiPg5J7VJaRl25AouCjdFlpv3BUkBqx7hjuwOlbsVi8jlxtAxjpVy08MmYbiR1/u//WrGpUSN6NF3OPoruH8LiNG28k8cL/8AWrN/4ROdidrkfVTWCrRZ1OhNHM0V00XhScN878eymtjS/CTMylgpA9U/+tTdWKEqMmcMkErjKoxpwtZMHcpX6969ig8Mw+Rj5Vb/AHR/hSP4UTJztOR/c/8ArVDrlKgzx0W7kZwcU82rDrnFety+GGSIBYgQO+z/AOtVGbw8WwoiOT1Oz/61NViXRkeaC2ULlmOaYsEwJCIzD6V39z4fkjDoU2q38W3/AOtXKavp7WTleAMcHGM1caiZm6ckZaxTRnJib8RUyvyOKh8+TYA3K+9PjlJ+9yOwrZNGMk2Su6kjHBK02YrgDPOKNvmMCq8jvTZ1yrHPamQtxhJQCpIVYKSynmoEkGAMYI6GnxS4XGeaEW0yVBscECtrSZsXEO0KMsASzVj7TjIOV71Yt1wyMCQKdrGbPT7G5Gmql/Zzbb+CUb4nXgr94EZ9196+nPBXie38RWAeOaLzkVfNCnOCQD/OvjTSr5IJtlwMxsQOT05969O+GviIaDqrOSZUmLBQGxgbT70boL21PqLtj0pAeKis5luII5oyGjkXejZzuFS5qWrGqd0GaUHimmlBpDHA0tNzxQDQA6imk0uaAIKQ0U1uaBDj0pnY0uc03OAaaEJmg0lFAAOtRy/vMDoM9/oakHGOSPpWbrl3FZ2YnuZY4o/MC7nOOSD/AIU0JnzD8cdWFz4kuIl3M3mRkZOAMrkH9c149qDFrl8jBHXnvXWfELXP7c8TarqKyBoZZybfCgZiBxHx/uAZ9wa5CUmQ7hjnr7miWgQ3uRMdxGKlkYiMAnmkjTI3dAP/AK9MlYM2R0qLF7sQDcwAocbWxnNLgqA3IPamnk+9MoVMbhu6U4tubkcdhTPanxKSSfSmuwPuNZiSfSl3DbgDn1pPvMcd6ApLYFK+oE0BOw47VYLkJ8hwahjXC4x9aeiiabaAwQYq9kZNXZLaxb2Ln6AGt+ytVcIiqu4AFjVe2jZmBCKT0G0V0um2axJGSVDONrc+hrNzsVTptu7H2enCV4oEC5bGO2P84rrbOwVU27VxmofD1mXZ5I0BfOxfpgf411NvZBQoUYHua4qk7np0YWMldOHGxVrRtdJJ+8qdK6CwsN3LJx71tJZqFGI6xtqdDZyEGgozEiKOr0ejxqACqA+wrrIrYAD5KlW0U/fWqIucilhGrbfLQ/hVldPQ/wACflXTpYxsc7QaebBc/dpJBc5tdNVuy0xtKyGUhMduK6lbNegFBtikm5gdmKaE2cDfaOTuUBCCOcjNcd4i8LGZMJHExx37DBr26S0jkydvasy80tCMFMjrTTsZSaeh8j+JtEfSmVgF2kkFgff0rIKAoHTgnrX0/wCIfCtrdoEuYVYE5DjqP0rxLxf4RvNGd2eJhAWwpzkH9K66VVPRnLVpO3Mjj4lZV5OFPfNB3Kcnle1WcEIImAGPXpVTLbh1Kiuh6q6ONatiXCdGGBTBH82DjbUwXcSWPA6VHIP3fHUGhIuL6E9u6iUIQc1bmzgbew7HFZ9thiMj5uma0LUAMyyHk9KE7mclZlpMPGNw4OevPNW9N1AWt0BI8mME5UkVQCsmFByPeklKpncuQemBTi7MGj6++DXiVNT0SC1eVpPLgVlBGNqgkEDj6flXpGQwBXoelfIHwd8T3Gl+KrKMSuIiy+YBkgqTzjnp8xr61069jv7WOeBt6SDII9fSnJdRxZaFOwMUzBpQazNUxaBRRQAGlFJQKAIiaYx5oppOaBBnmkzSGl7U0AUU0daKBDtwyORmvDf2kfElxa6XbaXp1wEnacNII3+cAKCMj/gVe23DoiF5CAFGetfGfxK10a742v5gVMYchNvQ4VVHb0BpomTOI1AJ9nQowzgDb6fSqMZ6L9as3hKyHI+Xp9Kh+UEbT1wf1qZajh8ICQC3xxk1CoyeBmnoQF+bpimDhdw65xRc0WlxxZnwuKaRtJBHIp6rtJfsBkGoydxJPfmi4IfEByW6CnIGEbY71H0XGOTVpI8pgHtQKTEijVApYckVYtrTzJ8nhMcYqJzlVC8kVuBFhtg8p2kLtwfU/wD6/wBKzbFFX1M2aKOMlAfmHY9aSzj3TAL364+tWrW0MsE87glt529sirWkWRfUJE2sFCBs/jRd2Go3ZvaFp6T3OB91R/StSKMPqDRKDsRjkD2/+uMfjU1pEbS0ldF5XA575ra0HTlaaGYMXZtruuO/QfzJrCcjvpU9Lm94dsvKtI5WG1m+bH8v5V0VjaKxUHJwahtbXJQEFQOgrorK28sDOeua5L3Z1pWRNbWy7cAYFaKW2FGB+lOtosjrV4JgVSJepWFvwDS+Vk47VaxkUgU5qiWiNIR2yMU8pgd6cMgiphigm5X8sYzjFNZQVx1HpVnGQaZ5YoFcrGPAGBxUcsQcEZq9tGMVAyhTxTTJMq6skkQBlHHqK47xj4eGqaVcwTRksoJjYLzmvQyobrUE8QZCME8YNF+XVCfY+NfE2mPpWqXFvKrDy2/iGOOtYkgGBsIwa96+NHhovDNqMMch2BQ2ORj5v8a8KuIPJPyEuuPyruo1OaOpxV6XK7orjjINNA8zI6Yp/ReRnNRvlBkda0vYxQgUxyKVPersMm5wSeRxVSNg3B6nmjfsbg9DQhNNmpLv25U557UyXdJDz1BpIJPMbkgDH60kLFZSrniqINTQ7h9Ov7W7jkO8HaTjjB4/z9K+t/hBryaj4ftrUuhnCGQENyemf5mvjrT5QI5EftyPzr2b4BavLH4ks4XCiEK6Bj74/wAaq10C0PqDIPI/KimqSaXuKzRqh1FNoNIY6ikHSloAq0lLSUAB6UnalNNzzQAnelP3T+lJ1NNY4fPoCaZJzvje+XTtLl4JaaKQAn+E7eK+I9VkcX90Qy7jK49AvzHpX118U5jBpc0zFkxbTRAq33iVJ/D7v618b3zM0jbicBjjJz1oBK7HSsZIiWIyetVTkY5oVmXoaRiWOSc0m7mkY2HE/IB6U5yBg+1M6p7g0Z6Y4xSsFhzuDGqgUwdaXHy5pBwaBrQs2h+YjaCWIAJ7VevV8qTAwNi5I7GneHYPMkYsAQCP61DrzA33TgdvXk1Cd3YlxDS1El0BJwu3dx3/AM5rVsQdUuirjEUeX553cf4msiFyVWKPJlPPpx6V6PoelxafYJJIiOwXBYDkk84qZuzLhE5S9jaOQwQtzgAA9s9P8+1bvhuzM88x3hVYjnscdv1pkNvHeX2ryyhd6lY4wexwT/7MK2vCdnI+mwRRxjfK5ZVB9GIJJP8AvCs5VEkdFOndmjplmNWuBYK37qAFpZCMknoB+hPNegafaJFAEQAKuAABjp0qjommLZRFAELE7mcDGTjH+P510VjBlv1+lcM58x6UIaF3SrfoTz9RW3Em0gAcfSobKMLEB39avRDHA6ZpxQmixCgUZqY9M03oKcDlMVexDQKvJpQOMU1c5OKUE9B1ouTYQp705F9aFzz3pe1FyWhxOBTOvSlGSOaj5Xii4rDzxUbjcMilyR15pc8E0CsRMuBmo5ASCc1YwCmM1E4+Q0xMxNZs1vNPuoWAw6kdM18q+M9IbSdUeJSxVlBPGB0r68kXgnGfXmvHPjD4fMkUl1EqDER+vGK3oyszOr70bHgG3BI/GoW5Bq3eRsrKV/h61VdcDcDkV29LnnS0disVOSQcUOp+Umh1LNlRwaUABdpOD1pFj7XO5gTVvdtkyTmqCyYYnFTOcpnOKqLIlHUuxSkTBRxngn1rufAM89hc2uoRn91FchGzkZJx3/EV55HJl+Oor1j4S3Ud/otzokybyZpbw5AwAIgv5/jVpkWPrHSb2G/tUuLbeImzgMQTwSO3vmrvGK87+EOrJdaMQWdvnKrkdMZJ/nXo2Dj2qGXEbRQKKkoWikooArZpKKM4oAQ0lKTmm80CHA81BP8AMGXONw2/nxUw/Wq1z0+9hhggevNAjzr43wSzxabbwvtRoJZducZYbQP5mvjiTliec55r7F+MM8k81sluPuWkiBh2djx/6DXx9cLtABXBzzT6FRepBS0lFSaBSkYpKUnIxTWwC5AzilQAnB6npTQM9OtSiNk2uQRyKQjotARIbK4eXAI9/asK8kDXRZuf/wBdb1mP+JfMAuS/yj61Bo2kNc61DDcRF4iyq+Ow3AE1Cko3HGDkdL4G0DYTqeqxcPHlA3ucdPpiuvmjjFq8zjEUaNJgeignOPwq/Dp7PbLBDGdqDCqo9O386Z4it/K064gjGD5Dr8vqQwA/E4/OuSdW8jujQtGxxGlWsd0L64G92aV5YkUEliSccAdsL19K9Q8GaM+n2ss9yP8ASXJUFGBwvYccYznP4VkeANCWDSFlnhYzSkFmcZKYJwB9c/rXothZeXD5bA/Kx/GsatTQ6KNHl3K+n2+6bAXtgjt+Fb9paA4wMYFMs7dI23BMe9alsu3ntWENTpeiHwQhVA7irESfN04pmcU9GINbLQxaZOOlKnI4ppIXrQrYHFDZKQ9TgmkZsio1YbiM0Ocbcd2FJsLE6n5aOKYTycUBux70JkcrJABjIpp2Zx3pobGRmgbfvZ5qkFhGx06GmjI60rHJzTHIHU0ybDwcLzTTk5xSZBHzHApDkDNNE2ImI3EfpXPeJ7AXunToUzlMY/KuiIzk96qzJuG1hnPGKpaE2PlDxhpZs5RtQqjk/Q8muOdCnK8qfevbPiVpirbR5jIClmDY9jXi92VjkYocoT+Vd1Cd1ZnFXhZ3RSlyhO3pnmomOTUsqsGJGWU80wJuPAwfSrZnG1hgq1Au9dpx+dMjjzkSLirVtGnJ5ppEzkiIKQ/JxXqnwNCR62Zcnd5UyM2DjYyBefxNeXXhG5tvBz0r034HzBLifzWXDwzpg9fug5/Tj3qkRurntvwcFvv1Bbc/uradee2GT5v616zETsXf97GD9a8m+E0ZWPxBOkYSBpVjOz7o2wg5H/fX6V6xGxdSdvGeKTLQ4d6AeeelJQKkoXiikooArUhpaSgQnakpTSUCAZpk6BsZ6gHFPApr8ggckjAoA8x8YoZfOn3bfsm+Q+5GT/SvkG8cOy7FIGxef+AivtDxfFts5wANtykgOecPjgfqfyr46v3RLlk2gIu08jOCVzj36mmCepl0U4L8pJPSm1JqFFFFAEkC75kX1NaE4zNHGR91AfyzVKx/4+oj6MP51oyOG1Ngq5IQIPxP/wBekybXZ0umWe6CMtjEbcDJycmuy8L6Ikd4zYbOEAJzjqaq6Bp4lmSMgcSDJIH1r0zRtP2QhTg4bPT6VxVp3dj0aFNJXLGm6aFBDn5T/wDXpg0tZWZpSdvJwPbOP5VuqBGoXjj2pPtcSqw2fU1yctzr5iHTrOOGFAoIHXBrVhiGDisk6tbw9Vkf1wKVvEVqqFgkmB2xT5R8xvIm0Y7GrEZ+bA9K5mDxJFI23yiSeQM4qxb62jtlkKfrVJWDc6LcACT1FKsmeM1lx3qyqCoyPX/61WIZMg8UmxpF3zN0oUjHy9anHyge1Z4b9+eeg/rVzI2cd6ncGhVJDUk7Y2k/3hTEI3ck1HfNhA3X5hSYki0XHpQJR6VUEmD7Ux7gKB15NNA0Xg2SeKcW4FUEul7nFPW7j3ADJ5rWPYyZaOeuKdt3Dmqwu42fbzmphMg+8TVWIZIqAqc0xhjg077QgO1+PelYDbnOaVibkWcE1CRliM9RUjg5zxiopFOfaq6CPM/iPaboF3H5fm/ka+ablVS9mt5Oisdpr6u8dW5ltF/2d2PyNfK/ieERahMAc4f+YzW9CVmYV4XiZJYgFT61JA/GM4qHt70ldadjltdWLm4gZ27qX7UqjMIKt781VwQu4N14pN3y4wPrTbI5ESyyMz727mvQPg3NnxEYyAV+zztgnH/LPn9K86HX612vwim+zeMYnVRI3kTDaenKGnAJLQ+qvhNZQp4WvriIkLPMZG5z/CE4/Ba7+D/j3jPZgD+lef8AwstWs/hxbI7FtxkXAPcyMP616Agwu0n7pwMUSEh4ooFFSMO9KKSjNAFakJ4pabTAToCSeKbkbd2eKVjgE/yGaopI4uUhkTapzhiOtIRaEoY4XNOAPIzy2KNgCkAfjTJGIhYpuO3uPegDkvGNs/k7EO4ZM7gdlXOev17V8beILKS2u0aVjtkiRweuMopI6+9faniO082xlW4uXEcgKFA+CwIOVHHX2r4y8S3Ms8FisvEkSFSD2GFH9BTF1MeVCIuWqrVqJlaIhuWqu4+Y4pMuHVMbRRRSLLWmAm+hwM/OP51pwKf+EiIxkNIg+nzLVbw8u6/Vm6Agk1saZaNP4hJU5LzDbtPXDDH8qiT3HTV5WPW/ANm8loZJMFzJjP0r0DzFtI2Y59uKy/DdgLK1KlcYY5we1XXt1viTOCsanC84/nXA9W7nowVlYrnUnujiANx6kCmJZXMq7lTLHtuFbNpZQRJhSDx6D/CtCO1jdCQQ3puNS2bJHC6hbXkDMNyx4GSA3T9K5/8A0meXcC0iL6Pj+eK9Sl06OUkPGwHT5ehrPn0aJRhEO30BqOfQtK+hxAjlznZhjx1FOtpphIqMCOf71dM+mKD91gvfJoi0wKxZVwB3NR7Q2jT0GabcvE6BiSMdM8Vv2lxuDEsax2tiuWwScVLB8rAMDmp5kPlOitnJZnyeeKvrJhec1j2MvmMQFxitNcsp4NFxNEkb4bPWo9SlxCG/hDDihVIcnsaZfJvtnXg54ouyWVJrnYMnPrxWLquosVXaWGDVi5JB78DnNY16jTHjPFVF9wauUn190ZlAkJ9yKqX/AIgcwkRlg+ACQxHP5U+XTG5IUkn0qodJlfKtFlT6ZP8AOqjJLciVNtaFW38QvFKqSSzb2OfvE10Npq08gO15CBzy1Zlr4WDyKfJkAycngc/gK6fSNE+yhhI8nI45B7/StlVizFwfUn0/UZN2WLOMdCa3dN1RJGCPuzjvVFtHhKZPmB+xUgf0qu1jNbMHhc9e/X+VUmmZuKR1qsHTjpTTx171laZcyYVJHOfetUkE/Mc4o2Jv3MHxJHutcKAc5/ka+XPiFB5VzPwo/eAfkK+sr6MntkYNfMvxStg9zcqoG5Zic1VL4iamsDzGlGKSiu44R7sCqgDBFMopaASsTwjO0luntXVfDl/I8W27o2GKOn5qa5BAeCDW/wCF75rHVbO53kCJxnIz37VpAxnpqfa/hUImg6fbQgL5crM4x1O/cP6V1PQKeOmK4H4e6sdRm1q8WVXi85JURiCyjygvQHuUNd4uCfk54BPtSY0OzRmiipGFFFFAysaQ0tNP+fSmISoLiMsC68yR5ZPw6j8alllWBdzY+nr9Krrc7wSpAOQQOvTpSESW83mID/H0ZT2PeqN/f/ZDhVV2ILLHn75AyB/L6UTvJGz3DKy7QW+ZcK3sPc1yGt+IdPt/NvLqdYpoc+Su5RjIAJGW5HP6Hp1pgL468QJomnt5Lx3V3IjyYcCQRNg8gYOOcfT15r441O7e5uHLEEZJGOevauj8YeKJdXupCij7O0kh+bG5tx744zjHTA56CuTkkd/vHIBOOPWh6aBBXdxqMVPFKepP+TTKXPHNSaWFzk9APpSY6+1JRQM6Twjpc17OwhVySueB9R/WvUvBXgsx6jBdXUb/ACHIBA6/nVf4N6Svlm4cknyxgenzH/CvXbeFVAIzwc1xVKl5M7aMEo3e5IbcLHtjON3UU+JABtKLgevrSTOFIwaasuwFup6Vzt6G8Uy/DCp+9jH0q1bwLGihGyoHeoIZQIlbABI6Zqtc6lFGGYkAAZOSOBUtl6moGXft6g96hujCnyjH1zXnniL4nWWkXZtYImuZSpzsZSAfQ85rjrz4hazqAjKC0tI2B+RvmfrjOSMY/CnGk5Euqobs9ku5LQEB5o1J9GFVoCsjER/MnseteKrq+9993uL9d6YA9x068ius8PeIprWSNGIkix94AcD3qZ0GjSnXv1PR2gUrjbgYrPlTEny9KWx1YXESum0lucZqvPdBbpM9TjisUjoTZsWSsuNoz05raVcKeOKzrM855zityBVZcMMjFaJXIciudvqKhl2lGFabW0W3iPn6mqlxbfI207cVSgQ5o5fU1KuQp7c1UjhDZyvan6xObe6KFgcqOtR/2hHFEGYjPsRzUTVjSDJPJiHGQPXNPgigEmGZD/wIVwus+JJppWjtgLdFbmVsEn8+K5+XXY7dpZQ7l16yEqFP04ojRnLVClVUUe321tHsBjGQeuDmrkUMbbty9OgHFeF2nj3VbGIS2clvLEOdkiDJH1Fdp4S+Jthr7yQahb/YLhCNu6RQGz6ZOe9bRoNI5nWTZ6MIunGB71HKqhCWUVDBeBiqhSQehzUkhMo28AU46Ca6kCRKXDrwR0xV9D/e61UChWx6VYz3zV3IfcS5yVOPQ18u/EuYtqF+gOCJv619RO+4DFfK/wATgy6vqBX/AJ+DmrpbkT+B2POaKU8nNJXccIU5RuOKbSg4oQE8SgZzzVm2ZkYYUFeuapo+G4GFqXzTtKx960i0Yyi2ey/DPx5eaRePEGheOUoJFkOAQN2Bn8a+jvD3iBNREiqyC5jIEiAnGfb8c+tfFvhTTZ9R1mCCKZY5ifk3Dg8E4/T9a+u/Bmg3dhClzNfm4umiCOBEFCfdLAjHUkD06VUtAgdxHIWH3eacvU1Xtzxg9R1qyMHkVkWLRRRQBWpB1JwTgE4FJ3FRS/M20n04x19vpQI5CfVZ9Rvng0uA3cycupIVUGTgksR1wemenOKpDQPEd0SZZrJAwDeVKzyhc9sZAP51uaZYNpd3dxzsJY7yZ7hGBOAM/c59MjHrk+laH2lbbM7ZMQUs29gqKB6sCaBHmXiu11vw5ptzeTXmiRQQLuIFlKA2T32uec+3avmjxX4hvdd1CSe7WOIuAPLhyEGAOgJPpn616x8cvFVx4k1WaxtJ1i0SylVGUEMkk4DfMHwD/GBzx8teRpaPdTbLSIKpIAxyF/Hv3qraEp6mbAkt7dxwpgyTSBVGe5OB/Oul8VaMmhaNa2srq940pLlV4XbnIz3wWA/Cux8F6CkFvcrbWkU96V27iMFOOo4Jzn05rkvibe7tdfS1SNY9OPlApg5favmcgZPzg9Sak0Wpx1FFFIsKs6dCZrlVXrgmq1amiRN5rMDjIxSew0rs9/8AhJADoiyg9Yxnj0Zq9FhjJUZxgiuX+GlqIvDFlhQNyc+43E/yrslj4wPSvNnuehHayM2+RV4H3gM1RhmLAvgDnHNaN+sgjYKhbjoK5e4bUFRxbwNF1++Rz/Osb3NlfoSa54httLtjcXjOqK23CgnOa8i1rxLd+IHeKIvDbswAy5yR78+/pW/feFdS1i7LahOZVBJVXB2iuntPCEEUKLHbqpA4+U/1NaRshtSZ5DreiXNpaQXCT/uGTdIynDZzj8f/ANdO0HVRbeIbW+u7K1uLe3Cj7OEwjHeG+ZTkEHBB9q9iHg3ziA4hMX8SyR9alXwlpFs+W0uyll7N5YGP0rphXUVY56mHT16nnnhtU8W+IQslnZ2MaQEFLWIIpAOQSOctzyfYVfn0mfRdS3NIslsjY3Lxge4/wr0TTfDmnRTFhZW3l90WPGfxA+laUXh6HeZBHEq5yF8sEAf1rKU+cunBQOa0dVmgjkib5mXIwMdatSW0qzwu/wB4Nnk9s11dvpMKqdyQ+wEYFVbixUSokKrjOTj/AD7VhyJHTGrfQ1rNw3X0rbtiNvvisZAo4AxitOzO4ZPpVpXIkzSB6e9V70HyWwOverK9qr3a5VvpV2Mbs8+8V2/+lMScDYOfSsCZYlgDzPgHgYGe1dzrdh553EZAXnjn8+1YjaVbNAR5KkY54IP/ANeplG5rGpbQ8gvN+s6g8MZEcSMSNxrnNRkk03U9TtwqXEhjaJVb7i5Awyg9D0/M171B4ftYwcwRFT2K802XQtKEo+0WNu6cbkZAwbj0PH/6q0p1FDcipFS6HgS3un23hQW1xa3P9rO0jNKjqEALAjtnpnvRYaHLe2E83nooU4BfJboeQccV7Xc+D9NlkaWG1tViOQEWAADr6dOtXLXw1ptuGjWGMhuucn9Ca6FViznjRSZ5X4M8YXnha5ktdSMtzZPwGEhZlIBA6n29K900vWILy0jmhYlWUEZBFcvrHhezvbRohZRg5HO3HT6VlaRoGoaHJEISzWwAXYueB+Nc9TXY3glsenxS7znPB7VegGVIAFcrYCaQx7g68DORXUWkR2/K2R61nGXcUo2LDLgdq+bfiZaIPEN9E3UzFug6cf419JumRjOQetePfFvSk/tNbhtipI5XOOvyr/hWlN2ZmldWPnW9tWtZ2DfdB/yKrMQWJHSuq1i3IVvl3AEDGK566tHTLhTt69Old8Xc896OzKlL2pKUDNMY5eBz0NW7JBlSDkFqhgj3Dpn2rqtJ0l20Nrttgj3FcH72auKMZu+h6p8HfCp1qQXQMUUcUgXLLuLZDDI9MGvoXT7J7e3RGk8wjHzljuPHfj/OTXnXw2a00LwBBdTDyMNLIx2nLKHI4/I16OmrWiFWkmQh0DDGM4PQn9aJMa2LseEHSpFYE4oGDGrcEMMg54Ipm4FshTipGS5wcU6owBjPSlzjpQMr8ZzTHG4gjA9zTj1pCSoyOtAis4W4QJNGFCcKc7Tj1znvx+VcP44ub+z8P6/BYIXEcDBC/VEIJbPI5x0+legPGXUqDtJ6g15P8b9dax8NfYrXab/V3WJUPLBVZXJA+gH500I+ctc1Bp2NrFn5m3zEjrJkk8dT27V1fhPTtPt/CWoz3S4vwT5TE5AA9vzrb8NeCINWlge/M8D+RtLqwG9j85HPA+8fpt9a56eKbQ7250qYLcuo/c8bN29Oe5+nWi9xWsT2vjEeGxdzx+TLczJiD5Ay7uTuxkcZ2815Ze3M19e3F1dOZJ5naSRz3YnJP61LfSncUVVUIxTg5zjvVKkXEKKUnJyaSkWKOvPStrw+WaR9qMcdOOKxK6TwqD5cgXk7s/pUT2Lp/EfTngVNnhnT+MN5I4/OunhUlOOtc/4OXb4e04dzCua6OIbhs7V5z1bO+Ksivs8x8A02ewRlx5eT61fjQAjJ4BqTOAxA4qEkNNmTHpduMExYNPeyYM20jYB8uf8A9VaCMAT8p21IsIJJkPWlYtNoyDp1y4yGGCP4TTodFySZSx/H/wCtW0qqmPL5qRuuQMmqSK5mUIdPihHyxgfWpXhRVzt/KrKg5IcYPammMEsfWml2J5u5QuVCwkqOvAqGK3UEHHI65q5Ooz9KiJGKdhxRBIqhgB1NadnhV/Cs0oCc1pWmentSVxyNAHjioLhgAeeamHAqtcnNWlcyIHRZCQwyCKzWsgp+RSVz0rTVSealHI9aewGSbSMjIXn0qObS45eWjJPtWvLAQAwHWpIlPTOaylHqXGfc5ptO8s7VLqv93NILPa/zxM3H8K810k0O4Nxzj1qMCUMR/CKSuht3MeKyZuqNg9sVLHZJkCRAfbFapLbcsOaWMLIc55HNXch36FaDT4wwIRcVa8mKPhePanq2fkA56ZpxjAG0c57+lBGr3IJAqjrXn3xitVk0OGaNcyJOASPcEV37oQjKxzjkVw3xWby/B11IxG1JIyP++gP61XUEfO+syRNPLGX2ENjHSsa8R5UKK2cDjBxRe3AubiTzgAr8kg96ro/kcxNuCjAz+P8AjXfA86q1czZU2NjP65poU7gCDU8kgnclxtb1zTfKkVcqMitbE3toaFkqqYyfLG445rtvC9vNe3Eenp88MjDaoHG84z2/u7q87STDMDXp/wAJLOS4u4J45UVULELwWJ47ZyeD2FUmYtNM958VRQ6N4Cubb9zi3tp2yq7vVvTnGaisNUgtdL09r+eCeV1iCkDJMe3nPT1GT71w3jzUmlddMhucpdr5YYx7TtJAfhvQZrlNAuo7qWe1tXTzHV/NkzklPlGAOmeTSirmjZ9MeEr1r7QbGaWUvugjOT2BHB/EYrcUbVBJBrK8NWn2XSoIw5crGqDIxx2/QVrooHPakxITPHtTgOKawy1OpIoqk802QblNLmjIoERtKdp3rkjpXz0yy+Kfil4m1O5mxZ6IsiQLgABhGU6jruMWeT+Fe+apObezkkUcjH86+fPCCP8A8Ipq1rHHm41NYZFJYcIrszHPrtJ/PvQB12gW1tbaPDrm0G8MkpQtJhQdzooYe+Bz6HpXlnxLmS51O4vIf3aJGvlHr0A/M5z+YrtZNVWXw5H4SKMLlX2rIG/hLGTPTHBbH4Y968o8e6rcFntrpAZHX5sMSF6dPyFAt9DhXYEkqMAnOPSm0lKDg0jQSiiigYV0vg+QRtOep4xXNVr+HJMXfljqwJ/Son8LLp/Ej6p8GSeboFiw6eUAP8/hXUWhO7Brh/hzNu0WOLP+pQA/XLf4V2UD/NmvN6npRV0XWGXHPAqVST6Cq6vuJxUq8Lg96zLSHxyBnI6VKSCpA9agAGDxzUkQxjvTQ7FiNQUznFPVQ2TnAFRqvHzcetIzZ4TpVIlkzuGbI6jioXYbQPenqNvHc0x1OWJxinewoxu9SGUKQTzVRiB1qa6uFghZmHQVjQ332kFwOBxUqdzTksjSXk1fgBAzWbBLnt2rQt3wMitUjN3LoYBRnrUM3zA4qUqGU4PNIFIHNWZvQg3EKcikWT6UTPs7ZrN1G+W1li3KSJBxjtUSY4K5sqoMWDkinBv4cZFV7CcTJ8pzxVtSM9KmMrobi0R8gkBeDT2UDJAxUnBzzVWSTa+M5BpDCTqKYqbWJFScEdelOUEqRRYRGM5ODTxlUPIpjYHTOaieXJIxxRcLaCud4bHXFeefF6VU8F3iNjMjxoB77wf/AGWu/WQDOB1ry/4xKZ9JjRTjy5RI35bf/ZqrqJLU+Y0m/fFdowW696WcNuOG+lLqkfk3zgcZO4fjVXec5ya9ONrHlTj71xS2TzzQshXOMc0p+ZflHTrTcDHU1TDQeGDAjGCa1tB1G80+6je2l2FAQDtBxz7isiCIzSBV61v6Vp8ygkAYweWP+FCIlbY6HSjBOHvbqYy3CBsHIUKMHriu2+Cmmot5fXV7BOhJVoIypX5cg5OeSOnIry21ja3vIml+aHeu8DkHngY75r2rQbqIRR3Ezzt84tbYKfu9CAc/wjjOMdRgdcWiIa7n0HY7fsMQGdrLwfbtVgH5QO9VtPhMVlCgfftjC4HtwevvVpQOeahmiAcU4c0nelU8UkMo0dqD1oY4P40xGd4hyNNfb146fUV4npV0unDRrfUFX7bZ3TyXCggs8biQqRjlgFZc+le63exkHmruTdyMA/zrxD4nR6dp1m8spNvqqyyN5ittPlBsKo78RkDnjNICj8RbrRWX7eLu0T5lBUKTJgq38IHYnv6V4pqEiahLKyHGAPvNmma/qcl/dyR2808luPmw5ySfrWPbzmMnLHmgLDJU2Nio6lmw3zA+1RUi47BRRRQMK0NBYrqkRXrhv5Gs+tTw3G0mpDYpYqhOB+X9ambtFl0/iR9I/DzMNuqvx5kQYfn/APXrtVcA4rhfCc6G2smQnfHEqOPToD+orr4pQ/OfpXlyZ6kEacMyjC7hkmrqOBwRWFA2Cdx+bPFaUUu7vzWVzWxfTgstTIe/SqyuB1qSNwevSqTsSWRJ68j1qOQ4YHcAOw9aAQQdvSmPt3fN26VfMJRJlY4LVXuLjYppXmAUgHrXN+INWS0spZXlC7QaylI3p07lDW9UN1qi6dbMWncgsAeigkkn24xWzHZ+Su1AoA9K5bwJANRu73WZwWeWR4oHJ/gG3PH1D13KsjAnjmrgrasitJXsiCAYzx+NXoDxiqKvtYjIxU6SKpyG/Kq5kiFE1YWHNK7YqpFOvJVhTJbocjdk0KZLgPnbe4ANc74z027utPi+wjMkMpkKg4LAA8CtuGQM4LHkVdGx+uCa0dmjOLcWc74Y1aO4gjO8Fdg+UEcV00cvAz3rzB3bQvE9zay4g0+XLWuOm0AEj8CwrvbK4EkSjcWPY1gm46HU48yuaw+YdeKieIjoMikjfAAJqQsdvBrRMwlEiRTsYY70ivgkEmpVGAcmoZOMkqBVbkIR35JBqvI4yc9aczjBqlLKd+O1Zs0SJC3euO8RWP8Aah1GI7WDhQueg+ZT/wCy107SYzk8Vzt5fQ2FtcT3DIGcgBe/X0qk+orXZ8weK7F4rk3HBjbCj9f8K5+u98dQiPS1+Xad6j9DXBV6FGXNG551eHJOwoJHQ0ZJpKUcVqYlm0jkWUMhIPbFbdg7+ZGzs8iFgHXt9P5Vmaa6mdC5AQda2IbmC2nWdI3ZFOeVyhPXp3P9KpMwbd9STVXtpdQHlRGNVAAUg7gfXH5V7d4f06/sNFtrwx7oXiVZGYdDtBzyOeM8Dp2614bbNPrGsB2SJpZXUAwpsXpgYAHt6etfRlpr9jJoslkXk2iZIo1EWVVNrAN0qnoEdD0bwRrH2/S44JJP9PtUVJgSNwBztY/7yru/GuhTHQflXnPw/JTxFeEbUuLyPcyNuHEZCpx2+Vq9FVcVLLQ89aB0pOtFJDKfXrSHkjNLn3prAHAOcnjigRU1N/Kti4HAPNfJHxl1x7zxBcxJLHLEtwxjdcfLwPz44r6j8YXf9n6TLK0gES7dxPGMtj1r4dvpXvpLm8YbQXBIHqc/4UwItzyL5SkMWOcAck1FJBJFIEkUqx7Gtrwr5fnuAzJcupUMwG0Lxz6561o+KdGggXdYySSxIvM0gHznjpj0zjqaQ1oUdL0cXVlcSKC3kyKjDHOSG9/9mr2m+F7S81q7tXuJYbePO19u5uvB/L271o6beSGwEsIRQFEbHJGTj+fWtizYpe388JnQI2yNbdczS5PPy5HAxnqeKBI8317TG0nUZLR3LlQDuKbc/hWdWv4nt2i1OSQgASYbaP4c9v0rIpFoK6v4dEDVLkkZxD/7MK5Sug8D6lHpevJLNGZImRkZQcds/wBKip8LNKekke1eCMPezjd/yzLY9wcf1ru7Q7flzXP+HrCOEw3EbD96g7YxnmuhU7Jx0ODXlSPVix7B1bgn8qvQNgdOajYZ5z1poYqcis0bLY14ZN3BqQNjIqhDKDjj9anjbJJzSuCiW4pdgI45pry5PNQhhgk9ahnm42j0qec0UBl9cbITgjOeK828W3Mt7FNBGPlyQQBmur1advJ2g85qrpemLI2X5zz92knc2soq5H4IYWWgWsYGNquD7EsT/Oti+1eK2Y+ZLGikZyzgVl3OmTWdxIbdv3bc7cEcn6Vx+u6bfXso+TAC4OSxz+lW2trmainqdxBrNvcN/o91by9MhZFNaS3wVScgN6GvJbbwhtkD+Y8bDB+RMciups7y6t18q5jLIowHGTn86HyrZgos7ZL7KnbikF58xLYUD2Jrn0uDjJ6dsGq9/C95BJHkqpHXGaqL7jcUzXn8VadBceU99YrJx8pnUEfgTWxZayJU3K6FTgAg5B+mK8bv/DxjRmG5sD+7/wDWrX8HrPapJE6zN0I3gkenHpWjd9jP2aOh+KSGa00+4gOJYnfGOeuBWh4S1R7i2izt54P6UyWF75R5qcL2xmsLTEfT9c8rJ8uQkjtjP/6qzlLS7LprSx6pbShkAJFWYyORmue0+bMS5POa0hJ3BqYSM5wNBmJ4FMkPBxUKSGlEgroTOaUbEE7YyKrdQxNT3ByxNQbsg8daTQdCtMpYE+leXeJobi51683q32cbdj44+6M/yr1ab5VGK5jxHGlnp5kV0eXeMJnrnNFroI7ngXxPvV+0rYjaSu2Qkf8AAhiuCrX8W3DXPiTUZHPPnMPyOKyK9KlHlikeZVlzSbCiirum2EuoSeVbJI0noqluMe1aGTdirGzL93vV7TILm8uVt7aNnmlOxVQZJz2x+tbN34Q1DT1ikmhmljbnEcTEj2xjr/hXSeE7WO3ZwZjaloWEgnxHgZGQG7OcY6HrTRF02dP4E8Npowkub4/u94JZWAYYyCF5IPUdj1/KSwuAZrm3K4ZJDks3U5wSBxzx9PatOe80xLSO23TIQSBnawOT1PIwPz6VyN1dGPXJNu+KKU798h+ZvmPOeN3Xk9+Kpaise8fDSaW41ETlQwKbwy/xAgj+or0cEADFcP8AC6zj/sQ34c+XJ8kQUYwquwz+OAeP1rt8AcUmNC5opMUoGKQyltBxkcikcZ+7weppwprZLKB6gn6d6AOE+L8Etz4G1GGI/IypuGeuJo8V8anetncJghRMmeehw9fdPiWwhv8ATpreeJZYmA3I3Q4YH+eK+GNWsriw1K6tLtWFxC5Vwe2KfQEbvhHShqd5BaxSJDPMjSeY2SFQZBJ/75PFdLrNxrL6D/Z96YpoItwDfKPvEHGNuevvUfwiBu9TSGNUadInxuIBAyOSx6Lg16h4f0KDWbS+k+xIyhxHG0jqUT5RzyeeT6fr0QI8B0eG6uVNos21HZXGTwp6A/XmvUPCkH2DSb5LcNNeGVAjIcMfmfncxGMj39q09X8KtoVzaXOopAUnnCSJCckjOSu0dvf6e1EMEr6XcfZtkEuxHllRc7GVgmSuMg/Myj/eNAkeT+JrHZbLPu3OVViPQEkVzFdt4+vLcoLW3I3Ky5x6DIx+YriaRcQq/oU622qQSv8AdXd2/wBkiqFXNItDe6hFbqwUvnk+wJ/pSlsy4fEj6a0SJoLpos5CkfKfxrodue2KorCIsyYB6ZYVeibKKfUV5UlqepHYnjfcMUN8n8qagwPxqSQgkYrGTszaLJI2xgirCSDJ7Gs9XwTu4p4bI68etZyZtFF1peCB1qpczLs5zn1pjyhULHNZOp3qQQdfmbIVe7HHQVm2bRQ1SLq+KAcIOSffP+BrqLKFYo1HGcVheGLD7LbMZfmd8FmPc4Ga3RIBx37VrBEVH0G32CrDAOOtZYjV+ABWswDg9yRiq/kEcYFU432Mo1Ckttxjj8aljslz8w49KtRwj+6AanAAODUqLRpzXMxdPjLoAF2j0HSpTYIDjPSr6bR25p2fXFUoilKyMxrCIg7lB/CporZFA2jH4VYOdx9KUnkYzWqujFSJILbKYHWuf8SWIVXmQDfEQfyrqLc7Rk+lRalElzbuu0crzn8amSuh052kc9o9xvtY2Ga3YpNy5rkbaRbTUJbRyQS+5QOmD/8AqNb9pMFJDNkVzpNM65K6ua4bI4qSNgM5qoknOe1TRMDnmt4M45okZgc1ATnj0qTIzUbfeOK1MLkdwcL79q8/8SQPbCe8K4CEDryckCu/us7Vx1rzb4yzmy8E3+yQxuzxqhBwSd4PH4A1dNczsRKXKrnzbdSme5mmYktI5c59Sc1FRSgZr00uh5jYlT2c0kE4eGRo29VYj+VRiNj2pYVDShSQB61SRLasz2PwUb5rWEzzNdtIN4YSFSpyT0PGefWuke1sVY/2laCWR33MjKACM92Bzn6D8a4Pw3o8t/ahdN1QWd7GoeJCCFPPQtnjnHDDHPtXf+Gkv9Khth4oWWZ/OxBPJ80ZJ+6VY/Jj73AOeuBTaIitC94V8FWC3E09zBCJY2Uxxom7yyAT6gEn8cVg/F6Ge3e1ncOsErFI1YgN3OcAkYx75r02x1ayguYra81hlyTthuC8fy9Tndg46npXAfHbVINSstLi01C8KSFC+Cq7sEcHHPBFJPUu2h6J8APEC6r4UFiVZZrFBuJxgqXfGP0r0scNXin7PggW78QJZlWCuowvYb5MfpXtgAXI9KJbmcBT60maTNKMd6RoU+9IeGBzR3pG6c0CK92BsJcAr3GOv+eK+cfjz8Pmt/O8S6NbNtkkY3ih87QQApC/n09fy+lA2GBIrM1K0E0DW7ZaOU7WHoc9f5/nTQHxX4E1RNI13zJpZYkeMxNtyD1B28cjOMfj26j6z8E29qmi4EcUiSnIeMKAcMRnAx3GOnavI/ip8JoInv8AUtElupLx33NbbNwdjktgn/6/StL4cfE0p4Ru7fUWiXWonZYrfYytLuHGBj3P5UrXGbXxWlhuNW0200uYTz28U8lxGgLbcsgViSMAgo4xnjPT0oa1pz6dosqWbF7iRESYg5LElXPbnlTj2rd0HQZrRL67upsXd0WuZgFGCepHU8ksePbpXB/GDxM+lk21i8SXEZSKRG+c7lVf5YYfjTA8V167+2arcyg5QuduBgYrPooqSgqSCV4JRJE7I46MpwRUdKKA2PqrwpqJ13wvp14pLyTwgy7AAA44YAemQ35VsQkLHhs/LxXzx8M/FD6OuqW07RmCSBXjDcfvElVuCP8AZ38GvXPBXiWDXI5ljZfNUk7ATnHy56j1JrzqtPlkz06E1KB2kY6U+UYHH1qK3+aEM3WpzweOQRXI9TeBVkcYBpqy/KeeKfJgtjHApgQEkCsZM7I7EU0uV5PHpWbJD594hkXKpggH1z1rW8gDls9eKhnVklMhGBioS1KvYuR3AjTbzk9AKa9028Fc1i3OoLCRl0yelRy61bRW5ka4iyO26uiFzKSudVDcrsDFtueDnpVa717TrTme5iBAzwc8V5Xr/i2aa4kgtZIhCcDK4Jz+Nc8Q0smDye+BmuiELmlLDKW57UPF+kMP3VwWPfC1es9Xs7w4glycZ54rw7DxMqpnYT8xK9Kniu/LXCuobOO3NDpHWsGktD3Oa6t7ePzJJVX/AIFmq8etWMkojFxGWNeM3OpzSR4Lgr7AUWRMm2QybWJxjAo9nYn6ovtHulvMk4+R4yM4OGqwQgGV57HivGheSW4JhmG4c42itWw8ZXkRIuI0de3H+Aq3DQ5amDf2T0tbgoxDfd7VJ9oRlO39a52w1y21BQUdA2MkZqaO7+diSuPrWEm0cqhJMo+ILMm/ju4Rjb1KnHf/AOvVq1kOMnrU7n7REy9NwxwagNu6YGDnNYPudUJ6WZowTZ+9nFW4n9xVKFcDkE461eRBiriZVEShulKVwd3f0pI0ywp0vynBOPb1reOxxvcqXsiR+XvJAJ7c5rwz9oPV5Wh0/Tl4jZzI5Xo+FXb3/wBr0ruvitNqP2Szj0eby5VZnbbGHJUDjANeA+OU1o6iJNb065shhUiSWIqMBFA+bA3HABP8hXRh4XlcxxEvdOZp6DccCmU9WIXtXoRPPY+Rto2qTmrOkIpuQXCsMHhhmqIx3qRZHByuKd9RW0sj0rw3evbPKIUVJMBoiR1+bo3+zyOvoK7/AEzxD/aVhFpV88bzgmQxTKDt5IUwkZweRg54yeleL6VcteJcKGCyNGI3GR8y9MfoOnNdFp11Lb2draXFujwxSb0kBIdeDgZyQR7Y3H1pbkpnqk/2q4njVYIVmUbd1/DHIRkn7z4ZsduDWP4xsriPTobjWvsSQo2+KK1LBOhOSDzuIGOfTtWbZanPF53kw3Ch8Ykhgdg2PUFW/mKy9Q1641MJBqUoNtGxKKU2F2PAJ79AfTqaEhnq/wCzZp0lvp2rXjId87RqC3cq0qt+te0cfX3rifhFbG08E2G9W81085t3YuzNj/x412neiT1JiKaSiikWU6QgmlooAjcEc5zjtUF0D5LjjJxGPbPGTVvbuBFcz4n1l7GNGUMRHuGBj5SRgE+vJoEVNWvxazQWUdrLPNEwlRymY2b5urenXt6V4B4ztm0z4p6HfRNGHupI2/dfKAVIX8+hx7j1rf8AH3i+KDzhePLLeth0G5iFByQcY29M147faze3+pxTxXEnmRsDCRhSh4yR2B4/QU1oB9SahqUMFpJIsscbWatcu7yDLyAfd7cnB468GvlW8l/tjVby7cukbMXO45IBOAM/56Ut9Pq7WSyXdxM9sz8EyZBYjrj6d6yg7BWUMdrfeGev1pDSEY5Yn1NJRRSKCiipXi228cmeWYj8gP8AGgD2T4afDzTLvQ7bVNTvHE95BLIioqssG0tgtnkZwuOe59q2dEjj0fxctnIYmEkRjjlB27l6g/jt/WqXwx8V/wBraDpWiy3Eq/2R+/aE5xLhjtIIH8Kk8E4PH4ZPxL8SxP4ge+t2lIiCwIcYIdVP6ZBrkqRlJnRQajqz2mxfdERwT61YYZCjNcp4L1+LXdKgvod4EjMpDDkEEiusGGBxXBUXK7HpUnzakUkYHIJxTUjwwOc/WpVO0HNOC/NmsGtTrTJIYlc7j1HaqeukKgbjOCMVeTsBVe+iMkwjwDx3rPW9kP1OE1DRjcMu12y3J46d6y5/AyTk5mkyeThf/rV6YtntzuA4q0LRB9zGMc11U3YlztseTJ4LltW/cEOvGN0Z/oKlGgyJMGmjkBGP9Whx/KvTiwicoynjoaYzIT8pPuK6FUSLp4hrc4RbCEMMlwcYwMVPNolo8ThQzStjaSRhfXtXWTpAw+VF+uK565JRmCPgg4pqpFHXGtzamRb6HB55JQ4Hqo/wq2dJtiwXeEKnPQYq3btIVIRkbJ/uD39qs28EzNyIzn/YWj2quaOtpuY1xpkRkL78j0AHNZMmnLvbyI51PU4TOfyr0KztQuBIU69Nn+FaMccPJAH5VftEck655Pa+GtSeVpIppYgfVWFbNlDqemSqtwROhOM4bPP1+lenQwF14HFRXVlmNkIB71hUbaOJ1eZmJpMjTiPK7SDyK6JoQVOc4PtWDHGbe/XBwMjpXTQ8odxzXInd2Zo9rlNE2EDOcdKmi5bFOePt3oiXaSa1itTOTuiZRhuKjnbD++D1p4bvWL4r1SPStEvb6V2UQRM/AyTit/JHNfuc9Iyav4shtnK+XFLHEATwxaRhz144rK+MsLeKvDFxBHKLddHlE7PcDCku4TaGyc/fOeFwVA57ePaB8RL/AE298+cyTHcvO4A4Bz6fWqHjjxle+JtRuHDywae7ApbAgADA+9gDOSucHOO1ddKlKL1OKrOMjlaKKWuo5x0a72xVhbbcQAwFRQDqe3SplYSEMOicGrRlJu+hKtvLaMlx0K4ZcqQG4zXU+GNQi1m8ttOvS8QkYKC0gEZ57Z6H869Dh0+38QeDhZGDdd+WkkMjHaEO1iQQD824YBz07ZrynXtCvtFuZEuVSPy5AoMbAnn5lIPXpjj2pIZ6FdaRPo00VrPPeQqX/dyJESDnHViV6E9cfy5ni0Nbu6ie4uDJh1AG3DEZ68k5/wDrisbwv4nvbnTp7fUG+02dwPLaRsBo+vOcbmwSD17cV7P4Hc3Xh+aWeTdDBhJGxkySBMt+BFPYaPR/DkZhsUj4CqDt7dCRg/nWqpycCqVnGYYgrjG1AG7/ADcZ/XNWgcPz1qHqNKxJRSUYoApH60q/nTDuycAEUZZf4aYDzLEOGz+AzXh3xOu9XtZ9TvUSGexjwVYg5jJUD5hwpOeBnP68+yXjlI2LOkSryZDwBz9RXhfxS1651AahpWm2gFlccec6mNpSmG43YyQQ3HPtTEeQ2Vhc+JNZnlubyOOP5mfzX24APQBQQBzXZwaDoNqZignnmADBogHCgZyScccZ/LnivO0uLzTLueNEPIKt1J984+lXU8U6g0Yt4WjUNkERxlWbPqRyRjseOvqaRNzN8R39zdyiOeZTDG7GOKM/ImTzj8ABzzxWNVm8jkVt8gILEk59TVc8npikXHYSiiigoKvQiOaxkU/61CCo9elUacjshypwaadhSV9hASrcEgj0oJJJJOSaGOST60lIZ23w18XN4euzbTyFbK4lUtlchTyCevHb8q+kLWdXTcjKyH5lYfxA96+Oa98+EXiuXWrKezvZEN3bhAgzyyYAz+f864sVSuuZHbhKtnys9TUhhRyCCCagSQBeuM0/zRt7ZrzGz1rF2GQbfmOT2NJHlpGzz05qtGxYbein+L0q3AAORwKUVqKTsiwsahRSgHJ9DxRyfumpVA2gfrWtjEqSwqxIZc1RnsuTheMdc1tbAee9IYFcfNnH1os2VGdjmmto0z94fQ1CLS3xnaPxFdSLC2Y5ZCfbJqT+zLYg/u1pqmy/ao5L7Jb4JCDn2pYrWLdtAI/EiusXTLbOPKGBSiwtgf8AVLke1X7MTqroYcVogwOv45q/b2qLk7auG0iByBj6VIIlUcGnGDRm5pjYwQMAAUrKcHcM09EOOlKfu89RVGfoZl/aK6hlXDrzmprV98fJ5FWJAHjYDkkYrNilMTMjcEVzzVnc2ptvQ0eKjzg1Cs3vTw2eaaYpKw93ABycDH65x/KvBfj54nZpk0e0n+Qx/v0A65Kkfyr3C9kxGQOp6V8qfFtnPjzUlck7REBnt+7Wu3Dx5mcWIlaJx1FFFd554UUU5cZ+amgEwR14q5pb7LoDftUg55qBwDyvzGrOm2++cbkLHOAg78GnYhvQ+gPhRZNPo1vFcl3hVQg+blCWI+X05/TntW3438EQ6vps0XkxNdoMwTyZGFBJwWx7t7c/jU3wxtFg0+UIrLs2n5u2GY/416PBEkkSbgsocZBIyPcflk1LGloeKfD3wfqelzyO1q6M7jCyqxGMEHPHXk9PavZtL09Ssca20kcEIU7CqrucdXwOegGAcY5yBxWjb2yQkiMhlDcbgCRx6nmrsQAyQeT196G7hYkjG05PpxTgfXrTQaXPNIZIKWmilFMRUxTXwq85Oak2+tNfO4elAFa8to7i1eCYExvjdzjoc/0rznVdJkmhutI1q0uY7JAqWmowK0vmsORvRAfL6AFmwuc/SvTZACAecj0qFySWDgFc8Z7c9RVID5X8a6LKLlra2urLUxGQuDdRRSJjI2lN+SR9PwrivsGpW1w4ieJEUjO+SNeoHqa+22UyL5bDfHnd84yPpmsa50+1cyA20BKjG8RD0z1pEcp8XXej3Jt/OiiurljyzLAwVeCeuMGsqeCSB9kyFWwDg+4z/Wvs7XPD0Ziby1iYbGBRflX2OMHnrj8a+UPF8bwyrDKNxt3MfmKOG47H2xQUnbQ5ulpKcOmMHNIsbRRS9qADPGKSiigArc8GalNpfiKylgKjfKkb5GflLqT/ACrDqS2cxXEUg6owb8jSkrqxUXZ3R9cQyB4lZSORTycZOf0rN0uQCGFhypBNaSOHRsmvEqK0j3qUtCeD5l2lsKetX1kXGFOKxt+wGlS4xzUpoqSudBHJtHBGasRsCOKxra43j5sDFW4p8HpWiMmjTDKEJzSq2e1VUm3gDGKk34HOKfNYViyMDJH86nRiUBGKzvOweRxT1kGOtNSHyXNLAxTMYJJqpFP82P61I0p5OCatSJ5CZlB4oVAByarG5zIuBTzLkVXMQ4slAwDtqBzgEHucU3zsZ7fjUTzgHBGTUsSiRySCOQjP41TvMear+oxmlvZuG4AqtFJ5iZbgg96ylqbQVieMgHBPFTxnnk4FQwHeTnipHcYYd6IrUctiKc75sDoO9fLXxbfzPH2pv6iL/wBFLX1KgAJz3r5X+KZB8bagV5BEZB9f3a124bc4MT8JyVFFFdpwCj2pyKXbFEXDjGPxqyGBwOM+1NESlYWJFAYH0z9a2fDGZtajZMbUVufTg1hXD4Gwdeua7H4Z6XLqF6scIB3M2TgnHyZq7kqN9WfRvgq28rRJZWY5myuCMcFnAP4g5rsbBWS3t4UIKr83TuQQf51kWkccb2domT8pBHHGBwcfjW/FiMpGARtAGayNktCxHyuD8oB796lVvQU0egP50q9DQBMDxSp1pijAz1p4NBJIKcKjBp2aYFUuw+lIGB6UtNxikApPtmoJyACSSv0qU9KaMkHvTQFP7VhW2kPjjdjBH6VXLSx5R49rS/cKtnnocirFwx3mNeCfyrnPE+t2+npHa2xL6hID5axKXweMZx0piKvizxXYaAsR1NZ50cECOIcjHUnkD9a+YvHmrJr2syz2Nj9kSV8mIuG3MFHPoOjH/gVemXvgXxFesZbiERSSHLytNGMk5J5BPPJPrXK+MPCyaU8djDi/1FT/AKSkJ3heAecgEde/P5GgR5XS9K6zWvAur6TbGS4tS4DAbonDgZ4Gce9YD6feKrBrSQ7TgkKcikVco0UrAg4IIPvSUDCiiigAooooA+m/Dsy3GgaZKq8yW0bc+6iryyPEc5JArl/hvei88I6cCQXji8s+o2sVH6CurKbozXkVl77R7VCXuIet4HXpVWSZlbKnAqrcRFXO3ioAsg75Fc7Vjsi7o2ba/wCxJrThuSQCGNcll0ycYqaO+kQfIxIHXNNSE4o60XRGOT1olvH5wTXPw6gHUbiQfpU4vUPSQfnSuUoI2Yr9yhGTmn2165P3iQOtYrT7cEEYp8bqhYqyhWpofKuh0UU5dyw4qUXJ7ZzWEswVcgjNSRXoTJzVKViXA3fN4BJqCe9VOBuOaxm1HzCV3fkKYLjcCBz+FPnIdM2vtPAJJ5qOa7QKeoIrHaWbZwKqTTu4KsTvPajnuJQRcu77c5AY80+3mYjAYg1hlJN/HBq3bpMTjP41N9S3FJHQRXO372TVqPldzVn2MeMmTmr688Z4FXE5amo26k8u2lf0UmvlX4lf8jfejOcCMf8Aji19M67cbLSZFIztx/Ovlfxdcm71+5mY5LBOfooFduF3OHE6KxjUUUV2nEKBk4FLyp44NICR0pyIzgkc460IQsILTIM8lhg/jXvvw3t7OztHl8j5wqISvUnb9f8Ae/OvBYYGeQDnqOQcV7n8DbmaY3kl/esbZWBQSMCd2PTHpTewk9T27Q18z9+G3b+cKMADJrejAGSV5NZOj5ktY3I2rtX5e1a64U/L0rI0HrwAKEPH40E9MDmlX2696YEimnLzTF704dapE2JBT6jXmnj60CZXGM4pCOKMc5pCMjmgQ1hxTVHBwacw4xTRxnFMZn6p5iWs8sPMoU4AGexrkta02WLbeWto811EpIL/ANSenGa7ieNZkcSDcuMEdKoLpFmjLKsY3LyCWbI7etNCPN7nUfF+oCKO1igghyA7pbr8pPpvY7+O6+nvWrB4RsbUyTOJrm5mb57yfDyzdTkqRx27V2d1b5ljkEjGQvvyADz9KqyW2ZHWVyYweg6mhsEjz7xxapHHBbxxCWzWMSyKSVP8eMkEH7239K808YSabp2iGaARRX8i5jizuzyo75yeTXsPia1ijs7u/m3siowOOpVc847dM9f518y+N9UN74ilaL/UwHEQI5Axnnk1Oo2kc9MzvIzSDDnrxj9KjroPDfh6fX7uQecscSY3ykEjr+XA/pVfxBpcenSqLdpHjyVLMO/b88UwMeit3w5pMV9qenR3UoWG6MgODgjaD/UVX8TafHpmsz20D741OQaAuZVFFFAz1r4J3ryrd2cjDyowu0dxkua9TUnbgYrxH4M3PleIriE9JICw+oI/oxr26NMYrzcSrSuerhJXjqRTKDwQM1XaLHTOKuMuXx3pNvXjNcbd0d602KwiRl5H51C1uOSFwPatDyQwGcilSLHy1BeljOihycYwKlFqoYA5H41e+z/NnPFP+zqcHnimxRZQa1kydruRTTFOoySSB2P/AOutZVAzgdfWmMoQHgn6VCnY1KOZtpGTxTk37eS1XjHjHTnrTWjwDjOKrmC5URNvPNXYFAUnrS28fy5IxmrcMLYblcdqaZm2Q7CTg5xVd4BuLYJb1NagjH3qikTk8VRkmZ6wA5LA5zV23t1B4FPjQZGaniUoxzj0qkKUieFFU9KGbaGKjI+tNVvm6ioLyQRxPgdievpVRMWjnPFV60VtdMMAqhK57tg4H5185eKYBBqmFzgoDk/j/hXtPi6ZrjUBbYIQqsrH6EnH16V5h8QtP8u9WWPIVYwCG6nmu7D6M4cVqcbRRRXYcQVZssGVUkJWJmAZh2FVqkjY8r2NNCex6NpEnhu0tHWZLa4kLDDOCSBzzx6V0/gfWNPa5ubSzgtoHm2ujIdoGNxOAeOgFeJguny5wKvWLstyrbuVJxx2wRTauR8J9x6eYhYxeS67SgJx2rSg+aNTj0FeNeCviVA1nZWBt2eVIlV3aRVUn1OBxXe6P4xs7y+WyePy5f4ZBIChIGdoPGT7YrI3Wx1eVycYJHSkJII460yNlZ2I4PHB6mpACxOeMUXCw5SefSnio0Oc8GnimJj84paZmn54pkkJ6UhPalI5prDBoEDDIqPBB4NSNgikJAHSi4EQY5PHtUe4r8uBk06Tk4H3uxprB8c8+9NAQXaFlBDbSOOKo3O0AbsjHUjvUl7KLeP77sSfugZ3e3J4+tc42t3hlk8/T4pYScqPtJ/d/UbOf1pMqJwvxu8UjTvD1zZRMftF0FiUDIAQ5yc+uFIxXzzpVlLquq21nDzLcSBASemTya9F+Ot4mqa7Bf2wZbea2QgN1yHdeffIxn26mnfCVrTSNIv9SvIQ93cOqWPyhjuXIbnoPvjrRey1Fpc6K1tbOwuYNC0OP7USpM8xURgb2AwM9wMc8/Q1wPxH8q2FtbI2ZZXadgBgBei49jluO2PevRY/K8JaM194imeSSfcyIoLPKyjgEg4xhccn0rxe+nvNc1FpJCXlYHy1Zh8qZJAB9Bmmk3qDVjU0VHttOtNSDIyQTKhQg/xMf/iTWFq9wbrVLuY/xysQPQZPFdTJF5Hg3QWuCZBNcZjT0UOxb+n51yeosDqFwY12LvOAO3NMlblaiiikUdJ8Pb5bDxPbyuCVZHU4/wB0n+lfR0IyqkdMV8q2EogukkPQZ/ka+orFt9tCf4Sgrgxkdmd2De5bEeXyKjddp5bFWLc4GMUrL82T1rz7WR6id0RomcEVKUyoxQAAoI61Ipz17UirkQTDZPanDvT8Atx3qTYVIbGRUthEi6ds0qANuxwalk5524pVUKMioNbkHlhiKeIjkDPApxUCnJjNNCbFVV5H9KmjAAOOtPVBxxVpI1xmtImbZVVSEy1DYIqfaSTjpTcKDyORVGTZWxg59Kei7xu7U5nHKgc0p4AI6VSERkhVzisvVLhILeWZ8lY13n8BWswJXjpXJ+M5C9ibSP8A1t06xID0IJGc/wDAc1UdxSdkctETqF5c3YBIlkOFPZRgD+VYXjWwNzCHfhyBx143Cu+sdP8A7O0+KMhfMC4JXtxWBq6K8Sh8lQjuT67Rkfyrti7HFON1c8TuNNkjjDqQRjmqB4NepaZpghhmVkRlztP4da5/W/DhilMgEYR27VtGr3OV0+xxlKpwQa2JtGkjmWN9oViNr5znPQYqpfabNaMQ+0j2P+fatlJMy5WVGkJbNTRXJU5IGaSa1lhQNIuAehzXQ+CNAk1m4ndLdZ0j42lgPX1IqrkOKaKaeJtQhszaxsqpxyC27g+uatQ+ImurNbS6RFlMgkFyELPkDAXOc7fX8a7bXfhtFf4k0aGWxkA+aJwrIxwOA3mE9Qf4e9ed674fvtEu3tb+JVkUbtwcHK57YPsaAtoe0eA9e1DRrlrK+VriIyov2hXw8ZbgYBJyMkeneva9L1l50dGTcYxucqeRjqTnr17V8eeErkwX6JdSu0TN1BJ28H/61fV2nzJPp0LXOZnePcGAwY2wPzxmpkhwdztYssA4OVIzTkOaw/Cmore6eItriaMsnzHqA5H8gK2lbLUi9yQ9aUdKaOtPpisRN1pDyDSmmnigkaflGRSM3y9Oad1wKZ3PIoCwzI2HA+amknHNSYBHHX2Gaic4JGfzpjKk9vFdEGZFkAPGe3vWB4o0u3utJaIxAKrDHO0kZ9RzXQRvgkbsjNc14s1RbW0mWJ1aZSqkMCyr05OP8e9K+oNWR8y+IGvNV0p/NVpZBcNKxVflBYsxAx7uT+JrDttb1rTFt4YJ5IRbZ8pTEPlySSRke55+noK9z+D3h/TL7whBqmoxiaSd5GMc3zJgHaPyAqz4q0zwfa3EkiaRZzXSpnCltob0xyMUpVIp2ZpDDznsjxO00fxV41vo7hoL6+LsIxcTA7ByBgMePwFdj4y0vSfBelWljZs5u5nZrqaQ7nAQKAinAwu4k4A7e1M8R+NdVtBBZ+HRbaREoLmOzhVRk/xc9D7ivPNbudSu2WTVru5uWH3GmlMh9+c9fenGV9mKdNw0kJqOtT3UNtAmI4IEARRng7QGPJPU5P41lFic5OSeSTRjB5opkCUUUUAFfVHhmQz6JYGQ5LQqTx0O3NfL1nbm5l2L1xmvp7woSulWGVx+5Qj05UVxYzZI68ItWzU2lHGcjnj3pxXMgY5q2Y1mX5uGA4IqopZSQ3X3Fea9j1YseUK8gcVHnBOasREucN0qCVCHPpmouaDoz8wq7G/vWfGQG5P4VaU88H8KRUUSSndk9abGQV680xmIzjnNRoSuec1JdicFSWHcd6fGBkdqrRMN5J6HtU4I55oFYtIx9Bip0kC/f6GqkTbfl6+5qZivRjn0q4mckSlgM5PXpUWTk9KQtuGOOKTaQScnmtDNIVeTnilYHGF6Ui5Jx2p83yIAjDJPpmmtB2K11MsUJ+bvXDQGfUvEIKhmhticsRxvI28fT5hW14p1H7DYNISC24AD1Oen9fwo0ayFhaqr5+0NhpSTyzk7ifzJ4rSGrM6ishL+LhFY/dOWYnGODx+ePzrGvbYfPCIishABU9B/kV0dwivvJy5IJweme1Z80DNdrJMxLMQzdsY4/kK6EzlktDHsNKCrIQgJOGPfI5qzPo0NzbGN4gW4NbsUcKBsAqdoA4znGap3N4kK/uB5s2f9WvX+VVa5Gx5/4g0QQaReh0KhBuiYnncMYAqK30iK40O2e5hJdoV5xyTgc13K6RPqqmbVA0MAbItsY+mT+PpVy40a3a3SOPciRrhQtNTsRa+5x3gzTEeznt7uOOV42GeAeD+FdVoekx6DLLLpUQiEvLhT1NWtA0D7N50oLBpSM8dccV00emx7MEHFVzsjkRFHrKbI1nHlFhtLPH8v5iue8ceHofEumyRwCK4kwHVoZB5iYJ+6evfoc9TXUtpsEqeXt3fUf5FV5PDwIf7LPcwSFdoMLlMflirVSxLgjwG88FT6VulV496MpRGnTzDkgfd4J69q+iNI1cXWkb4gsk6qNyoCcHbznJ9cV55B4bltvEYGuGa7ClXjLsQrcHIIBJ4IHcV6b4dbSraF4kt47cMOcksT07nmqeIj1ZccBU5faQV0bOk2j2umQKTidUG4jruPX+taSHJHGD3qFXWWP9y24dcrU0Z5/wATWikpbHPZp2Y+nZNNyM4yKX64/OqExlNY1HPPHCN0hwMZ6ZrA1HxPFHuW2iZ2A5Y8Y4rKdWNPU6KOErYh+4joyGxuXOR6DNZt9q9paRu0kqyMOqxMC35Zrib/AFK6vztLsR1IDEfzNZ9wixAPdyMV/urzXLPGdj2cPkUXrUd/JHVz+L7PYRHBI2D912Cn9M1RuPFl3KhFtbRxr75auTvNXgiQiCFfTJHNUIL+S8uBFbxb5OOrbVH+cVzPFTe56tPI6EVexp3/AI+1CGUojwIy5J+QE8e2a848YeLNRuPDjwvIge6kR5WWMYbktx6YOB9OtdZrekrNA5unG9QWBQdDg8c15pcwXcdubVUguUU5G0lSP++vrV06rb1ZhicFTjB8lM2Ph/4il/4R+DSVmRFgZwFIGWBYt9f4jXUrcQtEybW3E/Pz1z6V4XdRS2927ISpByOef0pw1a+Rdn2iXb6eY3+Ndc6PtHdM8vC46GFi4VYanqU3h1Ly4mlQsMAAKc+lcfr+i3EISJ4yBkkEBufzqnpWqaxPG62a79v3iJCD7dWFF/Drd0R9oUgDuZcj/wBCNXTpcu55mMrxrzvGJzssTxyMrKcg46UytkaJdbS8zpj2OTVSWwKkqHXdnpit7o5EyhSgEkAdTxW3p+hPPImXBO7p2r0Lw74RhhLT3ix7VxhVQHng1nOqomkabZzXg/w/+7N1cK+WUbRgjrnP8q900SPy7GyQnlIwuPotZWiaXumRnVVt1BIAx39q62GDOVJAAPGB7Vw1qnNuehRhyksYPlKwIyO1R3URf5/0qQq0ci5I2kVIGIPTg1w31sdq0KEZxyOSKeWyeamkhOdyYxTGGEPHNJmkWUpV2yZAJyanRgVz0NSiPcFNPls93IOKRUSEHJPrTAu5sdDQ9rMD8jA8cg+lNCtEu6Qnyxxx1qS7j1G1+CCKsLjjjmqysHPylj9alQlRgDNAiwrAHgip+GrODBX4BJq5F57gjCqPrVJkMl246VJHCzLknHPTFOij2Yyc1LnkH0Oau5CIyFiXB61XnkIG5BkirZj3ktgVm6i4ZlTq2eMdKpXDmOWv2F34hs4GXMcSPMw9Tyo/nW1FHvn3EfMcnjvWDDCYdYe6uH2woWEm3k4JOMfjXTIf9IdRjJOBW6VkYy1GyDewiRSMkByaqJb75pGAwowCW/h4zzWtFakB5Cflzg/U1ItqwkmjYgsqqcjvnP8AhVpmUloZemxveRSbBLEi8FyvzN9O341PZ6fBas62yMgb7zEnn862xGAEVQANvamj7xAUYq07GNr6GTNahdqDvx9KesBESIRuxxxWssLHHA6UqW4yeec0LUTRBBHgYIOKsxx/WrEabQaci7ifmxVEWC3hG4kZz61cjRcc9frUUICvyDk069lW3hklc8Ku7ijZEpOTsjjdY/e64zIR+7VenPJBqTc2Rkc4qlA0fls1xnc554zVg7Ng2uCO3BzXDOTb0PssLS5aCi0X7e/mt5D5LY49Ac1PF4ungH72NWHpjBNYs0xjRmUdTxVcXKkAFCrE9+Qaca0o6EvA06jfOjsbTxfZzYWSCdD3xjH862bfWLOZCwnSMekjKD/OvN3iWTnABPdRSi2nA+RgR7mto4uaOOpkuGnrHRmhcSz3cm6aVn9cnioWijC7pMHHQGlaYL93+VU5Gkk4zwK5nJvc9ClRS0WhLcXQaP8AdDb6kcVRNs8wO9+D6mrPk4jJNTBQF5GABUbnVGXs/hM1LBS2Ci7R/ERTLhX2tFZYVcZeToF/x4FW5pXkk8mDAA5Zjxx35rOv7jH7q1bG4fmaT0RpTvIaIrdo9h2zepcZB98H/PNRPp0DLtijVM9Si4z+VXbS1xGSRlsck9qkZo1YKpZQn+sJ6jPQD3/+vUxk7mkorYwbnw3bXTfOsbbowCWXOTWc/gWxd/lSJG7lY85/MgV2UGHXhelP24J/l6Vp7WXRnM8PTlujz+bwWkdzBHCdiHqUVuefrWuPh6uSdsjH/a3f/FV1ewB4HA4VwGJ7LnJNdYI84JU9Oa7KVWTifNZrh406qaPJ2+G8O4M0cY9cgn+tW7TwLawsC0EDY/2K9IZMkgrkVC8PJABAqnOR5ygjj7LQIbTJW3jznI+WrC6ZcTPmVfl7KK3miw2Tz9asDaozgZ6VCk76lqNipbWWxQqqBx0q4sOzAx0qS3QuSTwamkUhc9hWc9S47mbdgswwMkUqsHQjGPrUpxuY96rsHAyeB7VhY6E9LD7dSFYN270jRbg5UZI9KkjkDIc4p0Z2sSD1pFJGeS6NhgwUVZjmG0lsGrRiSUjcoOaZPYhR+7VsY9aVjSLKkk6uMBT1pwkXb83P1potZA2NjYI/WmtbzKcMjZqeVjdiR3TZnGM02FlD/LjHfimbXAIdCR9Krv5iMWUMF9MUWsCSZoSbc5j2/XGKI7gE4Y9KrI7yJ0OfYU420jD5QAe/NU0Si+kq5+9Tg43EjcRVa2t2Bw/NX1iVV6U46ikQsZJQQnyj3qF7YcntjnIq/wDKFxjGKo3krsQEYKvQ9q1RkznpokZ5IiFYPzjHbOf6VNo+TcJ5zs0mDk89D3/lTr2MQzxSYIU5BIqzBD5boFUCRcZ9SB2rZbGcjXJ/drGOOnNOt0KSSHqCR/KktcOgkcY52gGksZ/Nt4pAM+aSenocf0qkrGVy1ChD5xgFacsbA4FOG4lcD2P0q0AAM4FXEz6ldwDjPrTtgZcL1pQg6kHFSKAOU/WqJETIGD1qdVBHQLSBO561IqkjGKBPTUI1Kk9wKwfE135hFnGSC2Gb6c5Fa2p3P2Syldfv7cL3y1cgXmnnaadG8xv0FY1J6WO/LsNKpPma0EMR3FlZsdeCcUrAxrgkMW9KczkYUBwe/FMZ0OTyOwrkW59atCrdT+RhnQGMcYBqnNbMyi9s2IRudozxmrd6FaBQcfN14FReHbgMJLObBI3cEdqVrlJcquJbXzhdsjE+ua0IriF1+8VI9Kq3lmqu3loR3GO9VYt8OQykk+tLZhyRnqjQHJz1p6LycioYWyBUxbA4psyabJJdipkdaz766PlFIsNI3Cj1p17PiMHoKp6ahO+7ftytCKhFLUfLJ9l03a/+tcZPtntWdp0JmnDtn5Txil1GdppnUfWr+np5cGQcHOalqx1xXKi2D5auT3HT19qqNyAWwyKSd2cbie/4dPxp945HlRp96QgZ9M96qN/pM/2ePiOEfN3PPQf59KEyY+Zft+hUHrU64A5x9ScVDEPLKkkccGiRmVwFGd3PyjNJq5MlcnHzKwxlSp5rqtOm+02SOSNwAyB64rjovMAy2AuefWtfQLhobmS3flZBuX8K3oO2h5GbYd1KalHob3lnJJ6UyWP3rRii8xAD0NO+zBTyeK69z5i9tDEmgH3lyaSOAHk5rXMIJ4qvJEUIx1zUtF3IBHtGV61FNyDzV/y8qc1E8WQaiSuNaGcU44FNMYKkHNXJI9tQsm4cHHrWTiaqRQkBA2qOKkhXI5qZ4MLlTmoY2cMV21k1Y2i7lmEAY5qySNuc81DC25cHGakPHWhFMUKCuWJBpxCsmN3NNPNBAHerIFWNTnOajeFMkY/WnncvSoZHb5s9aQ0IsKDnODUcg29O9N3sPrSAlvvVDdykmiaPPAzj8KlIxyW4FMhTIzSyKW4FEAYjsME549agkQTD5h06YNWowuNpByO/amvGWPH5jpW6RkzN1KASW7JETu4x+dJaxGUq46r1P/1q01h9aaIzAzSRDOT8w9RWsTKRA0jKe3ykZz65x/KrOmoiW1usZyAWx+dKkYmXfwQx5GeRzRYqIY44x05Iz+NabmexpMAq5zyeaYhduSPlpiqSVzmp4lyuDzVJWIsG0kfLyKkSI8frUyxbVGPWplXC/N1oJ0IGjzjnirEeEXODj6Ug4YcZ5rH8Q6r9jhSONS8r84GPWlKSirjp03VmoRMXXL03V8yJjyoiSpHOTx/9eqRkkKjchf6cY+p7U6Ioy4jbe2fmxTSgWTzFI3Lxgnn8q4Zycnc+ywlBUKaj1FeVTGdzlW9NpwPxqvIwZxEOg5zT3HlKdqrjrhWJX86yrkC2MSgtIHccd1/+tU3OuMbonuQ+2RSOVPH0qjp77NdZuxBFaGnt5xljk4aFtpz3wSP6VmIvl6z5bH5lJP8AOqjoNLSx1YxJEOe1UpY8N3qW0nOAOMA4q1JHvOc0mYRfI2ZMWN+PSiWQBDmog2JBjiifJUjP0qUzS1tSuY/tbiJTgHvUupziC08lRkJVi0Q28ReXG49Kwrmc3VyUQ/KG5zSbNKUbvUl02FZWEh7nNapAUMzfdXmoLOIQxjGPWpWIfgED1z3oWppN9iBpDbQyXMwzlTtUenWpoIfLi2MP3jEGQ+/J/rVC0YatfM6Eta2rEbsHDNkbQPXgH86u3s7uTa2pzODuLeg6/wBaaRDvsJ5vmGRI+kfJI7n/ACaniGQjsTkVHbwi22wpgt1470945jJt4VT1FFgaurE+5eT6UxWM43oxyh4zTEg5y8mfbGKuRsigBEHHpxQn2M6kE4tHaaZN51vG/XIBq/uDdq5rw9eCOQW7njGF5rpEOATXZTlofGYmk6dVphtHXtTWiDDjpTsmlHI5q0cyuV3i2pkfdqBiCCAa0DjHNQyRAj5Vx70WKTsZ0qZzmqzIR9K0JAyvx0ppj384zUtFJlLYMfL1qFohnOOa0JIzxgVBIhArCUTaDK4hPWkZc8VZUfLSBOeB+NJRNFIix70g69anMYHWo3XHQU7DbuQhvlzUMrgggdanKnacg/XFVpEPb+VS1oEdCM5I9MUsETEkk00xluh/WrEKMOvH41HLc05iZcA4xSxjmmqmWJzVuCLdjaOa0hEzcrDFjxzSrGTk+lW0hKj5sU7y1Oa6VHQwc9StEnBB71IYe+aniQA4IyKXhmwadiWyjNa7iGAAb+9TEtnW4RzgkdzWr5RHTBBoEWWUAcCqRDZBHbsuSpDc5qzFHiTJxmpBGqE8Z+lLGMPkjk1RNx6Adcc0kgJPI5qTHPPrVTU7uOzgd5GKkDIA6mk3bUhRcpWRBql7HYRb5c5PCgetcUds87F+JZOeeT69amnupNQlMkrkqBgKece9VHgkEwYL5q+m7aw/HrXJUnzadD6rLsEqPvT3Gy24dD/Ht58xRtkX3JPWnW6sYwvmvKF6b+tLCz/MrtvA9Qc/likkcIVbkJuCkgdM/wD16wtY9e19xksyNMDKSpHAI5xVDxQrwQx3MagiJ9zDP8IySf0q/cQkwEsvIByCKlswt5aPHKBIpG1gfTHSi1xc3LqUZFe2lW9gx83OOmQRUdzaltRW+TAilTYV9D0/pTdDuklsfs1xIPPg/dyq3VCpIyfrjIrSijzZtGeTjINV0G9Cr5hilQemK17a5DKc1hXBZWAPOODT4J9oYc/nUoU4XV0Qu54ZelW4U8w5bnHOarom75TVtdsFq244PPWkS9dEU9auzGqhG5xwB9azdLgLS72HXkmoZZGvLhEGOAelblvEEjQL6c0joXuRJCgVAByegqhqt19ktWiU5uZvljCjJySB/WtNAIwXfoOmaxtNt/7R1cXjsNlvgLjoTg/yOKaJTurs2LG1jsLFIlUIyqu7b/EwGCT69P51FbRLErXDj99J1J9O36Vckwynr6E1i6jemS8FpDhnXJIHJ6A1REbvUuRF3vwwGVUcmrsgO4Oeg60y0iEabc89896eXVSUyDmhivqNZlB4BK+9OWWMKcZz9KjUZH3cke/SkQyscJ831GKhIdi3b3DQzxsuAQcrmuw0q8FzAuWy+OR71xKR7Mspy3fNaWj3fkXSbiuDwc1vSlY8rMsIqsOaO6O059qdggc1HCQ+3uM9RUrna5C/rXXc+VejsRkMTjFPXBBDdO1IOWJNIDnIJxigCGQAswpiqVBFSyLkgg07aMDPWkCZXcHGOCfaoHXPGOavMqgc5qExAHcuahxuaxlYqiE4JAoMToMkVP8Axc0pw+QTxUWNUyrgH71NfGcCrJRXz1GKjaMAd6VikyvtZjj+Go5YlXOasYJNMljLUWGmU/K29Fye1PiVmPzAfhVjys49BUyRqOnNTy3HcqQxPuORkVoWi7RyKdEoANOB9BWiVjN6jm5zQkZPapI1yuaMN2NaJmTEVNvUUotyG3DmpF561IrEfSqRLECnAzxTsAZ2gUdWzTqaM2xNp9BSKCSSRUmeAKhklEYJOAPU1QDpJFiVmdgoHJJ7Vx3iS++1zlI3/dqMZHc5/wD1VJreqNcTyW8ZXyuhYc5/Gsj7owvbsa5alS+iPfy3ANP2siuSUfK5jz+Rqf7QBkEbX+lKAm1lBIyOQe/tSBFChWYqnpjp/jXPsfQNEczKpPOCx5YE5qC4B+yzRxPlZRhC3JD44OfqKZNMYt6nkkYGRTNPl+1RzWz4Dh94PfIwRT3K5bK5Ztbn7ZZMwDhlJVg4ww+v8/xpmizBXlQNznmoJWkg1COYDBuhtm9FK5C8++RTY2EF8P7rDkn61N7CUbxMjUkXSPFE9xM/l2N8TvbPAYAEfTJzXU6c4eLDkbiMfjWT4vsUv9KQHOSQHPYf5xVHwhqjSwpbTlRJDlfQnGB0qug2uamma97HtlcEc5qgSVJya272PzEEucZFZE8W5gQ/6VFyqburGnDEoy1ZOv3BG1B3961ppRDB8x6ZzXK7jf3hCkkLjrTIpqz5i9o8O0MWHJHpW3Em1MtxTbZVjXJAwOKjurkeU3Xikwd5PQpavc7IZdmSR8oA9a0tIt/s1isYIByWbj3/AMBWRZr9o1BS/KKdxB9f8mtx2baQDlu/0/zmmrhPVcpHczpFFLO4CrEhbk43Ec4/Sue8JWbtHJqcpPnXnzBSPujJP8sVX8UStrF/a6XZMQsbiS5OdvAO0j36mujuM20KQwjsFUA42gVSVkGtuUdI4LGNOo4zTrePYT3J/Skt49i5fG71qQsQwUHANQ+49lYSUFCCCCRUmeQyjIPUVXWMhiRUwVk+7g57UIliSv8AIWY7QOwpIHeVflGI89T1p/lqpLFc56H3pVJznd2x9KFuNuMo2sdLoGpBcQyd24JNdEVKgksCOtedxvsYDPzZ4NdVoupLcKYZc71xyRn2rqpT6M+azLAOL9pA1xmUbhxntUADOD2OasknoowVpFVwxPGK2PFV+oxRt4608jcN1IByxzyKF5pFWEPNLtwOacV5x0NMbd0Y8UDQm3cDjFMMfBz1pQpwcHFLk7SKTNEyHy8c5oIwKnZR5fTmmBTtDZ/CpRVyBU9BQyE8CpwpAOKq3tylnA9xOxEajkgZNJgmI0THIqZE2HBHUUWsyXUCzRZKnI54qwBuIppA5WIRjkYp0YABzUjxYGcionIXg07E3uOXqcHAokJ/CmqualAwKaRLEXGKliHYnNEaZQnNKBtqkiGSDFBwAfSjtziobi5jt4Hd8hQM4xVNqJKi5MkllESZYjH1rkdY1U3btFH8oVuuaZqmotfMEh3Ko684zWQyhXweT6Vz1at1ZHvZdl1l7SqC4Jfa2WHUeoqRMBPl49jUZU7vTB/KpB83U9O/rWB76SS0AjPzE1GMOec0srMfu/dFMBJXdGeO9KwPYbeIJISDwU7isixJi16Mj7jKQfryP6Vt4VwcDBIrFvB5FzG/8Syg8eh4H64osXB3VjX1aMyWMyIPnC71Pupz/Ss+8j+028ciHDHEpH4dK2gwmjDL3BFZMMZjDKfXNJhTlYnsmN1auhxggH9a427hNlqq3YJwGG4Diuo0giK+eMk4IOB2qDW7Bt0oyNjGmtjSm1GTT6mxpVyl3YRnP3l9c1UlHluQRWNotwbK6EBJ27uMeldPcxCYqy+lS9dTKUeSRh+K5pIrU+WxX5T0+oqj4S+azd25bf1ooplP+GdDckhABWXMSQ2aKKTLolnSAFPA6nn9K0JgA05HG1cj24oorRGcvjOZ8AQRNp1xdsgNzM4aSQ9WOM/zJrZtB5k7vJlnbqSaKKcthr4mXV5XJpFAwxxzRRWRD3EgOY2zzSQfNvzziiigZMg3GVG5VRkD0quOF4/vUUULca3JQAzHPpVhfkUFCQeuRRRVrcyrK8Gdjo8rzW8ZlYsdverbMQzAHjNFFdnQ+JrK02KR09xUgGBxRRQyV8IE561GQCcHpRRQgDGGAFK3BOKKKTKQzJIwfSkU/OB2oopIpDuxqtLGkjeXIqsjKcqwyD1oooGh9mqqm1QAo7CrLACiiqRDG461EFBLZHQ0UUAh8P3jTwPvUUUCYsHenH7oNFFV1IkQyk561yOtTytfKjOxTHSiisq2x6OXJOorlFPmU59aS3dpN6ucgdOKKK5kfV9UNH+tC9qH4bA6ZoooGx7gZAxxioolCsVAwPSiimS9hVAKkmsXWOI5iOoIx+Az/Oiik9h0tzZsePPUdFYYHpxSXygOMDtRRSYL4jMXi/yPetjUEVtNywBPHNFFC2Kn8SOPvlC3SlRgg11mluzW/JzzRRS6GlbZH//Z",
        "date": "2019-01-23 02:05:34"
    },
    "properties": {
        "Death_Status": null,
        "RIP_date": null,
        "Status_neplatejasposobnosti": null,
        "Familia": "НИЯЗГАЛИЕВА",
        "V_Roziske": null,
        "GLK": null,
        "Label": "GBDFL adress",
        "Razmer_Shtrafa": null,
        "Pristavanie": null,
        "PFR_Info": null,
        "Source": "REG_ADDRESS",
        "Statya": null,
        "Notarius": null,
        "Data_Rozhdenya": "04.06.1953",
        "Propal": null,
        "PersonID": "85671359",
        "Med_org": null,
        "Advocat": null,
        "Autditor": null,
        "Status_KUIS": null,
        "id": 138526948,
        "Doljnik_po_alimentam": null,
        "Status_doljnika": null,
        "Status_Minzdrav": null,
        "FIO": "НИЯЗГАЛИЕВА КЕНЖЕ ГАЗИЖАНКЫЗЫ",
        "IIN": "530604400921",
        "Organ_pravanarushenya": null,
        "Sud_ispolnitel": null,
        "Data_reshenya": null,
        "Date_of_Death": null,
        "Otchestvo": "ГАЗИЖАНКЫЗЫ"
    },
    "opened": false,
    "label": "НИЯЗГАЛИЕВА КЕНЖЕ ГАЗИЖАНКЫЗЫ",
    "group": "person"
    },
    {
    "id": 121770381,
    "photoDbf": null,
    "properties": {
        "Death_Status": null,
        "RIP_date": null,
        "Status_neplatejasposobnosti": null,
        "Familia": "БОЖБАНОВ",
        "V_Roziske": null,
        "GLK": null,
        "Label": "ZAGS",
        "Razmer_Shtrafa": null,
        "Pristavanie": null,
        "PFR_Info": null,
        "Source": "BIRTH",
        "Statya": null,
        "Notarius": null,
        "Data_Rozhdenya": null,
        "Propal": null,
        "PersonID": "68816808",
        "Med_org": null,
        "Advocat": null,
        "Autditor": null,
        "Status_KUIS": null,
        "id": 121770381,
        "Doljnik_po_alimentam": null,
        "Status_doljnika": null,
        "Status_Minzdrav": null,
        "FIO": "БОЖБАНОВ БЕКМУРЗА САУЛЕБАЕВИЧ",
        "IIN": null,
        "Organ_pravanarushenya": null,
        "Sud_ispolnitel": null,
        "Data_reshenya": null,
        "Date_of_Death": null,
        "Otchestvo": "САУЛЕБАЕВИЧ"
    },
    "opened": false,
    "label": "БОЖБАНОВ БЕКМУРЗА САУЛЕБАЕВИЧ",
    "group": "personJai"
    },
    {
    "id": 98551686,
    "photoDbf": null,
    "properties": {
        "Death_Status": null,
        "RIP_date": null,
        "Status_neplatejasposobnosti": null,
        "Familia": "БОЖБАНОВА",
        "V_Roziske": null,
        "GLK": null,
        "Label": "ZAGS",
        "Razmer_Shtrafa": null,
        "Pristavanie": null,
        "PFR_Info": null,
        "Source": "BIRTH",
        "Statya": null,
        "Notarius": null,
        "Data_Rozhdenya": null,
        "Propal": null,
        "PersonID": "45656338",
        "Med_org": null,
        "Advocat": null,
        "Autditor": null,
        "Status_KUIS": null,
        "id": 98551686,
        "Doljnik_po_alimentam": null,
        "Status_doljnika": null,
        "Status_Minzdrav": null,
        "FIO": "БОЖБАНОВА КЕНЖЕ ГАЗИЖАНОВНА",
        "IIN": null,
        "Organ_pravanarushenya": null,
        "Sud_ispolnitel": null,
        "Data_reshenya": null,
        "Date_of_Death": null,
        "Otchestvo": "ГАЗИЖАНОВНА"
    },
    "opened": false,
    "label": "БОЖБАНОВА КЕНЖЕ ГАЗИЖАНОВНА",
    "group": "personJai"
    },
    {
    "id": 145882726,
    "photoDbf": null,
    "properties": {
        "Death_Status": null,
        "RIP_date": null,
        "Status_neplatejasposobnosti": null,
        "Familia": "БОЖБАНОВ",
        "V_Roziske": null,
        "GLK": null,
        "Label": "MVD",
        "Razmer_Shtrafa": null,
        "Pristavanie": null,
        "PFR_Info": null,
        "Source": "Форма 1",
        "Statya": null,
        "Notarius": null,
        "Data_Rozhdenya": "01.01.1954",
        "Propal": null,
        "PersonID": "93035089",
        "Med_org": null,
        "Advocat": null,
        "Autditor": null,
        "Status_KUIS": null,
        "id": 145882726,
        "Doljnik_po_alimentam": null,
        "Status_doljnika": null,
        "Status_Minzdrav": null,
        "FIO": "БОЖБАНОВ БЕКМУРЗА КАУНБАЕВИЧ",
        "IIN": null,
        "Organ_pravanarushenya": null,
        "Sud_ispolnitel": null,
        "Data_reshenya": null,
        "Date_of_Death": null,
        "Otchestvo": "КАУНБАЕВИЧ"
    },
    "opened": false,
    "label": "БОЖБАНОВ БЕКМУРЗА КАУНБАЕВИЧ",
    "group": "personJai"
    }
],
"edges": [
    {
    "from": 158549415,
    "to": 145882725,
    "type": "WORKER_CUR",
    "properties": {
        "data_oconchanya": "2022-02-01",
        "pensionnoe_otchislenie": "0",
        "IINBIN_rabotadatelya": "160140006975",
        "average_zp": null,
        "Label": "GCVP",
        "mesyac_pensionnih": "0",
        "id": 197802416,
        "Vid_svyaziey": "Действующий сотрудник",
        "Source": "GCVP",
        "IIN": "811006300996",
        "data_nachalo": "2019-03-01",
        "soc_ochislenya": "368105"
    },
    "label": "Действующий сотрудник",
    "color": "#9999f2",
    "font": {
        "color": "white"
    },
    "id": 197802416
    },
    {
    "from": 158549500,
    "to": 145882725,
    "type": "WORKER_HIST",
    "properties": {
        "data_oconchanya": "2019-02-01",
        "pensionnoe_otchislenie": "0",
        "IINBIN_rabotadatelya": "160140014897",
        "average_zp": null,
        "Label": "GCVP",
        "mesyac_pensionnih": "0",
        "id": 197802417,
        "Vid_svyaziey": "Бывший сотрудник",
        "Source": "GCVP",
        "IIN": "811006300996",
        "data_nachalo": "2019-01-01",
        "soc_ochislenya": "13798"
    },
    "label": "Бывший сотрудник",
    "color": "#9999f2",
    "font": {
        "color": "white"
    },
    "id": 197802417
    },
    {
    "from": 145882725,
    "to": 5729783,
    "type": "REG_ADDRESS_CUR",
    "properties": {
        "Label": "GBDFL adress",
        "id": 167398378,
        "Vid_svyaziey": "ПРОПИСКА",
        "Source": "REG_ADDRESS",
        "Data_nachali_propiski": "18.12.2019"
    },
    "label": "ПРОПИСКА",
    "color": "aqua",
    "font": {
        "color": "white"
    },
    "id": 167398378
    },
    {
    "from": 145882725,
    "to": 2875618,
    "type": "REG_ADDRESS_CUR",
    "properties": {
        "Label": "GBDFL adress",
        "id": 191023911,
        "Vid_svyaziey": "ПРОПИСКА",
        "Source": "REG_ADDRESS",
        "Data_nachali_propiski": "10.03.2006"
    },
    "label": "ПРОПИСКА",
    "color": "aqua",
    "font": {
        "color": "white"
    },
    "id": 191023911
    },
    {
    "from": 145882725,
    "to": 614323,
    "type": "REG_ADDRESS_CUR",
    "properties": {
        "Label": "GBDFL adress",
        "id": 190705103,
        "Vid_svyaziey": "ПРОПИСКА",
        "Source": "REG_ADDRESS",
        "Data_nachali_propiski": "10.03.2006"
    },
    "label": "ПРОПИСКА",
    "color": "aqua",
    "font": {
        "color": "white"
    },
    "id": 190705103
    },
    {
    "from": 138526948,
    "to": 145882725,
    "type": "ZAGS",
    "properties": {
        "Label": "MVD",
        "id": 12490420,
        "Vid_svyaziey": "РОДИТЕЛЬ",
        "Source": "Форма 1"
    },
    "label": "РОДИТЕЛЬ",
    "color": "pink",
    "font": {
        "color": "white"
    },
    "id": 12490420
    },
    {
    "from": 121770381,
    "to": 145882725,
    "type": "ZAGS",
    "properties": {
        "Label": "ZAGS",
        "id": 71342113,
        "Vid_svyaziey": "РОДИТЕЛЬ",
        "Source": "BIRTH"
    },
    "label": "РОДИТЕЛЬ",
    "color": "pink",
    "font": {
        "color": "white"
    },
    "id": 71342113
    },
    {
    "from": 98551686,
    "to": 145882725,
    "type": "ZAGS",
    "properties": {
        "Label": "ZAGS",
        "id": 71417775,
        "Vid_svyaziey": "РОДИТЕЛЬ",
        "Source": "BIRTH"
    },
    "label": "РОДИТЕЛЬ",
    "color": "pink",
    "font": {
        "color": "white"
    },
    "id": 71417775
    },
    {
    "from": 145882726,
    "to": 145882725,
    "type": "ZAGS",
    "properties": {
        "Label": "MVD",
        "id": 76184035,
        "Vid_svyaziey": "РОДИТЕЛЬ",
        "Source": "Форма 1"
    },
    "label": "РОДИТЕЛЬ",
    "color": "pink",
    "font": {
        "color": "white"
    },
    "id": 76184035
    }
],
"typeOfSearch": "con1",
"params": {
    "person": "811006300996",
    "relations": "BUHGALTER,DETDOM_HIST,DFO_AFF_FIZ,DFO_AFF_UL,DIRECTOR_CUR,DIRECTOR_HIST,FOUNDER_CUR,FOUNDER_HIST,ESF_100,ESF_10and100,ESF_10and50,ESF_50and100,ESF_5and10,FPG,GOSZAKUP,IP_KX,NTR_FL,NTR_UL_FL,OPG,PDL,REG_ADDRESS,REG_ADDRESS_CUR,REG_ADDRESS_HIST,REG_ADDRESS_UL,SLUZHIL,SUDIM,UCHILSYA,WORKER_CUR,WORKER_HIST,ZAGS,ZAGS_FIO,ZAGS_IIN,BLIZKIE_RODS,COUSIN,SIBLING",
    "depth": 1,
    "limit": "30",
    "approvement_type": "",
    "orderNum": "",
    "orderDate": "",
    "articleName": "",
    "caseNum": "",
    "checkingName": "",
    "otherReasons": "",
    "organName": "",
    "rukName": "",
    "sphereName": "",
    "tematikName": ""
},
"iin": false
}

const iin770712302729 = {
    "nodes": [
      {
        "id": 158308504,
        "photoDbf": null,
        "properties": {
          "Status_neplatejasposobnosti": null,
          "IINBIN": "061140003146",
          "Buhgalter": "АГАРИНА ИРИНА, ИИН:700812401283",
          "Label": "COMPANY",
          "License": null,
          "BLOCK_ESF": null,
          "STATYA_ERDR": null,
          "Status_Uchastnika_MFCA": null,
          "Source": "EHD",
          "Nomer_sdelki": null,
          "Name": "Товарищество с ограниченной ответственностью \"КазЭкоЭнергоМонтаж\"",
          "Type": "ЮЛ",
          "BEZDEYSTVIA_UL": null,
          "PersonID": "061140003146",
          "PRIKAZ_O_SNYATYA": null,
          "Unique_id": null,
          "ORGAN_REGISTER": null,
          "Napravlenio_V": null,
          "STATUS_ERDR": null,
          "NDS": null,
          "STATUS_OPG": null,
          "FPG": null
        },
        "opened": false,
        "label": "Товарищество с ограниченной ответственностью \"КазЭкоЭнергоМо\nнтаж\"",
        "group": "company"
      },
      {
        "id": 10837649,
        "photoDbf": {
          "iin": "770712302729",
          "document_type_id": "2",
          "photo": "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",
          "date": "2019-01-22 05:35:16"
        },
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "ЛЕБЕДЕВ",
          "V_Roziske": null,
          "GLK": null,
          "Label": "ZAGS",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "BIRTH",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "12.07.1977",
          "Propal": null,
          "PersonID": "3367602",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 10837649,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "ЛЕБЕДЕВ ПАВЕЛ ВИКТОРОВИЧ",
          "IIN": "770712302729",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "ВИКТОРОВИЧ"
        },
        "opened": false,
        "label": "ЛЕБЕДЕВ ПАВЕЛ ВИКТОРОВИЧ",
        "group": "keyPerson"
      },
      {
        "id": 158413885,
        "photoDbf": null,
        "properties": {
          "Status_neplatejasposobnosti": null,
          "IINBIN": "100940001090",
          "Buhgalter": null,
          "Label": "COMPANY",
          "License": null,
          "BLOCK_ESF": null,
          "STATYA_ERDR": null,
          "Status_Uchastnika_MFCA": null,
          "Source": "EHD",
          "Nomer_sdelki": null,
          "Name": "Товарищество с ограниченной ответственностью \"Секвойя Плюс\"",
          "Type": "ЮЛ",
          "BEZDEYSTVIA_UL": null,
          "PersonID": "100940001090",
          "PRIKAZ_O_SNYATYA": null,
          "Unique_id": null,
          "ORGAN_REGISTER": null,
          "Napravlenio_V": null,
          "STATUS_ERDR": null,
          "NDS": null,
          "STATUS_OPG": null,
          "FPG": null
        },
        "opened": false,
        "label": "Товарищество с ограниченной ответственностью \"Секвойя Плюс\"",
        "group": "company"
      },
      {
        "id": 947473,
        "photoDbf": null,
        "properties": {
          "Adress_propiski": "г. Алматы, р-н Алатауский, мкр. Карасу, ул. Мостовая, д. 13, , , ",
          "Label": "RN",
          "Source": "RN",
          "Kod_oblasti": null,
          "Ulica": "г. Алматы, р-н Алатауский, мкр. Карасу, ул. Мостовая, д. 13",
          "Opisanie": null,
          "PersonID": "0201300125055306",
          "Rayon": null,
          "Naselenni_punct": null,
          "type_stroenie": null,
          "Kod_rayona": null,
          "Type_adresa": null,
          "Kadastr_nomer": null,
          "Gorod": null,
          "Dom": null,
          "Kod_Strani": null,
          "Dop_1": null,
          "PKA": "0201300125055306",
          "IP_address": null,
          "Dop_2": null,
          "Stroenie": null,
          "Dop_3": null,
          "Korpus": null,
          "Oblast": null,
          "Uchastok": null,
          "Kvartira": null
        },
        "opened": false,
        "group": "PROPISKA",
        "label": "г. Алматы, р-н Алатауский, мкр. Карасу, ул. Мостовая, д. 13, , , "
      },
      {
        "id": 56302973,
        "photoDbf": {
          "iin": "821027400750",
          "document_type_id": "2",
          "photo": "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",
          "date": "2019-01-22 12:58:19"
        },
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "КРЫЛОВА",
          "V_Roziske": null,
          "GLK": null,
          "Label": "ZAGS",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "MARRIAGE",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "27.10.1982",
          "Propal": null,
          "PersonID": "142196658",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 56302973,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "КРЫЛОВА ЕЛЕНА СЕРГЕЕВНА",
          "IIN": "821027400750",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "СЕРГЕЕВНА"
        },
        "opened": false,
        "label": "КРЫЛОВА ЕЛЕНА СЕРГЕЕВНА",
        "group": "person"
      },
      {
        "id": 39340336,
        "photoDbf": null,
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "ЛЕБЕДЕВ",
          "V_Roziske": null,
          "GLK": null,
          "Label": "GBDFL",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "Person",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "12.11.2018",
          "Propal": null,
          "PersonID": "125334362",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 39340336,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "ЛЕБЕДЕВ ДАВИД ПАВЕЛОВИЧ",
          "IIN": "181112504865",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "ПАВЕЛОВИЧ"
        },
        "opened": false,
        "label": "ЛЕБЕДЕВ ДАВИД ПАВЕЛОВИЧ",
        "group": "person"
      },
      {
        "id": 39340337,
        "photoDbf": null,
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "КОНОВАЛЕНКО",
          "V_Roziske": null,
          "GLK": null,
          "Label": "GBDFL",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "Person",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "12.11.2018",
          "Propal": null,
          "PersonID": "125334363",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 39340337,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "КОНОВАЛЕНКО ДАВИД ",
          "IIN": "181112504865",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": null
        },
        "opened": false,
        "label": "КОНОВАЛЕНКО ДАВИД ",
        "group": "person"
      },
      {
        "id": 39340338,
        "photoDbf": null,
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "ЛЕБЕДЕВ",
          "V_Roziske": null,
          "GLK": null,
          "Label": "GBDFL",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "Person",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "12.11.2018",
          "Propal": null,
          "PersonID": "125334364",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 39340338,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "ЛЕБЕДЕВ ДАВИД ПАВЕЛОВИЧ",
          "IIN": "181112504865",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "ПАВЕЛОВИЧ"
        },
        "opened": false,
        "label": "ЛЕБЕДЕВ ДАВИД ПАВЕЛОВИЧ",
        "group": "person"
      },
      {
        "id": 100898927,
        "photoDbf": null,
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "ЛЕБЕДЕВ",
          "V_Roziske": null,
          "GLK": null,
          "Label": "GBDFL adress",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "REG_ADDRESS",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "12.11.2018",
          "Propal": null,
          "PersonID": "48057380",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 100898927,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "ЛЕБЕДЕВ ДАВИД ПАВЛОВИЧ",
          "IIN": "181112504865",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "ПАВЛОВИЧ"
        },
        "opened": false,
        "label": "ЛЕБЕДЕВ ДАВИД ПАВЛОВИЧ",
        "group": "person"
      },
      {
        "id": 12937865,
        "photoDbf": {
          "iin": "770529400291",
          "document_type_id": "2",
          "photo": "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",
          "date": "2019-01-22 05:12:19"
        },
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "КОНОВАЛЕНКО",
          "V_Roziske": null,
          "GLK": null,
          "Label": "ZAGS",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "BIRTH",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "29.05.1977",
          "Propal": null,
          "PersonID": "5492752",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 12937865,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "КОНОВАЛЕНКО МАРГАРИТА ВЛАДИМИРОВНА",
          "IIN": "770529400291",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "ВЛАДИМИРОВНА"
        },
        "opened": false,
        "label": "КОНОВАЛЕНКО МАРГАРИТА ВЛАДИМИРОВНА",
        "group": "person"
      },
      {
        "id": 92957861,
        "photoDbf": {
          "iin": "020920501442",
          "document_type_id": "2",
          "photo": "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",
          "date": "2019-03-01 10:21:59"
        },
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "ЛЕБЕДЕВ",
          "V_Roziske": null,
          "GLK": null,
          "Label": "GBDFL adress",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "REG_ADDRESS",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "20.09.2002",
          "Propal": null,
          "PersonID": "40066022",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 92957861,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "ЛЕБЕДЕВ ВЛАДИСЛАВ ПАВЛОВИЧ",
          "IIN": "020920501442",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "ПАВЛОВИЧ"
        },
        "opened": false,
        "label": "ЛЕБЕДЕВ ВЛАДИСЛАВ ПАВЛОВИЧ",
        "group": "person"
      },
      {
        "id": 64350627,
        "photoDbf": null,
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "ЛЕБЕДЕВ",
          "V_Roziske": null,
          "GLK": null,
          "Label": "GBDFL adress",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "REG_ADDRESS",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "12.11.2018",
          "Propal": null,
          "PersonID": "154903975",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 64350627,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "ЛЕБЕДЕВ ДАВИД ПАВЕЛОВИЧ",
          "IIN": "181112504865",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "ПАВЕЛОВИЧ"
        },
        "opened": false,
        "label": "ЛЕБЕДЕВ ДАВИД ПАВЕЛОВИЧ",
        "group": "person"
      },
      {
        "id": 42828539,
        "photoDbf": null,
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "ЛЕБЕДЕВ",
          "V_Roziske": null,
          "GLK": null,
          "Label": "ZAGS",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "PARENTHOOD",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "12.11.2018",
          "Propal": null,
          "PersonID": "128769840",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 42828539,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "ЛЕБЕДЕВ ДАВИД ПАВЛОВИЧ",
          "IIN": "181112504865",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "ПАВЛОВИЧ"
        },
        "opened": false,
        "label": "ЛЕБЕДЕВ ДАВИД ПАВЛОВИЧ",
        "group": "person"
      },
      {
        "id": 169515360,
        "photoDbf": null,
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "ЛЕБЕДЕВ",
          "V_Roziske": null,
          "GLK": null,
          "Label": "ZAGS",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "BIRTH",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "2018-11-12",
          "Propal": null,
          "PersonID": null,
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 169515360,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "ЛЕБЕДЕВ ДАВИД ПАВЛОВИЧ",
          "IIN": "181112504865",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "ПАВЛОВИЧ"
        },
        "opened": false,
        "label": "ЛЕБЕДЕВ ДАВИД ПАВЛОВИЧ",
        "group": "person"
      },
      {
        "id": 46901591,
        "photoDbf": null,
        "properties": {
          "Death_Status": "Дата смерти: 2016/05/31:12:00:00 AM\nСвид. о смерти: Аппарат акима Алатауского района г. Алматы  Отдел РАГС\nНомер свид.: 1237947\nДата начало свид.: 2016/06/08:12:00:00 AM",
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "ЛЕБЕДЕВА",
          "V_Roziske": null,
          "GLK": null,
          "Label": "ZAGS",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "MARRIAGE",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "24.12.1946",
          "Propal": null,
          "PersonID": "132928199",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 46901591,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "ЛЕБЕДЕВА ТАТЬЯНА СТЕПАНОВНА",
          "IIN": "461224400031",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "СТЕПАНОВНА"
        },
        "opened": false,
        "label": "ЛЕБЕДЕВА ТАТЬЯНА СТЕПАНОВНА",
        "group": "ripPerson"
      },
      {
        "id": 46901590,
        "photoDbf": null,
        "properties": {
          "Death_Status": "Дата смерти: 2016/05/31:12:00:00 AM\nСвид. о смерти: Аппарат акима Алатауского района г. Алматы  Отдел РАГС\nНомер свид.: 1237947\nДата начало свид.: 2016/06/08:12:00:00 AM",
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "КОСМЫЛИНА",
          "V_Roziske": null,
          "GLK": null,
          "Label": "ZAGS",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "MARRIAGE",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "24.12.1946",
          "Propal": null,
          "PersonID": "132928198",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 46901590,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "КОСМЫЛИНА ТАТЬЯНА СТЕПАНОВНА",
          "IIN": "461224400031",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "СТЕПАНОВНА"
        },
        "opened": false,
        "label": "КОСМЫЛИНА ТАТЬЯНА СТЕПАНОВНА",
        "group": "ripPerson"
      },
      {
        "id": 56792605,
        "photoDbf": null,
        "properties": {
          "Death_Status": "Дата смерти: 2003/10/04:12:00:00 AM\nСвид. о смерти: Аппарат акима Алмалинского района г. Алматы  Отдел РАГС\nНомер свид.: 164794\nДата начало свид.: 2020/11/27:12:00:00 AM",
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "ЛЕБЕДЕВ",
          "V_Roziske": null,
          "GLK": null,
          "Label": "ZAGS",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "MARRIAGE",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "18.04.1944",
          "Propal": null,
          "PersonID": "143027904",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 56792605,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "ЛЕБЕДЕВ ВИКТОР ИВАНОВИЧ",
          "IIN": "440418300023",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "ИВАНОВИЧ"
        },
        "opened": false,
        "label": "ЛЕБЕДЕВ ВИКТОР ИВАНОВИЧ",
        "group": "ripPerson"
      },
      {
        "id": 109067318,
        "photoDbf": {
          "iin": "440401300173",
          "document_type_id": "2",
          "photo": "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",
          "date": "2019-01-22 02:08:00"
        },
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "АКИМОВ",
          "V_Roziske": null,
          "GLK": null,
          "Label": "ZAGS",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "BIRTH",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": "01.04.1944",
          "Propal": null,
          "PersonID": "56301010",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 109067318,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "АКИМОВ ВИКТОР ИВАНОВИЧ",
          "IIN": "440401300173",
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "ИВАНОВИЧ"
        },
        "opened": false,
        "label": "АКИМОВ ВИКТОР ИВАНОВИЧ",
        "group": "person"
      },
      {
        "id": 150267205,
        "photoDbf": null,
        "properties": {
          "Death_Status": null,
          "RIP_date": null,
          "Status_neplatejasposobnosti": null,
          "Familia": "ЛЕБЕДЕВА",
          "V_Roziske": null,
          "GLK": null,
          "Label": "MVD",
          "Razmer_Shtrafa": null,
          "Pristavanie": null,
          "PFR_Info": null,
          "Source": "Форма 1",
          "Statya": null,
          "Notarius": null,
          "Data_Rozhdenya": null,
          "Propal": null,
          "PersonID": "97363091",
          "Med_org": null,
          "Advocat": null,
          "Autditor": null,
          "Status_KUIS": null,
          "id": 150267205,
          "Doljnik_po_alimentam": null,
          "Status_doljnika": null,
          "Status_Minzdrav": null,
          "FIO": "ЛЕБЕДЕВА ЕЛЕНА СЕРГЕЕВНА",
          "IIN": null,
          "Organ_pravanarushenya": null,
          "Sud_ispolnitel": null,
          "Data_reshenya": null,
          "Date_of_Death": null,
          "Otchestvo": "СЕРГЕЕВНА"
        },
        "opened": false,
        "label": "ЛЕБЕДЕВА ЕЛЕНА СЕРГЕЕВНА",
        "group": "personJai"
      }
    ],
    "edges": [
      {
        "from": 158308504,
        "to": 10837649,
        "type": "WORKER_CUR",
        "properties": {
          "data_oconchanya": "2022-01-01",
          "pensionnoe_otchislenie": "507260",
          "IINBIN_rabotadatelya": "061140003146",
          "average_zp": "137097,2972973",
          "Label": "GCVP",
          "mesyac_pensionnih": "37",
          "id": 198339785,
          "Vid_svyaziey": "Действующий сотрудник",
          "Source": "GCVP",
          "IIN": "770712302729",
          "data_nachalo": "2019-01-01",
          "soc_ochislenya": "159801"
        },
        "label": "Действующий сотрудник",
        "color": "#9999f2",
        "font": {
          "color": "white"
        },
        "id": 198339785
      },
      {
        "from": 158413885,
        "to": 10837649,
        "type": "WORKER_HIST",
        "properties": {
          "data_oconchanya": "2019-12-01",
          "pensionnoe_otchislenie": "127493",
          "IINBIN_rabotadatelya": "100940001090",
          "average_zp": "115902,72727273",
          "Label": "GCVP",
          "mesyac_pensionnih": "11",
          "id": 198339786,
          "Vid_svyaziey": "Бывший сотрудник",
          "Source": "GCVP",
          "IIN": "770712302729",
          "data_nachalo": "2019-01-01",
          "soc_ochislenya": "40455"
        },
        "label": "Бывший сотрудник",
        "color": "#9999f2",
        "font": {
          "color": "white"
        },
        "id": 198339786
      },
      {
        "from": 10837649,
        "to": 947473,
        "type": "REG_ADDRESS_CUR",
        "properties": {
          "Label": "GBDFL adress",
          "id": 172289309,
          "Vid_svyaziey": "ПРОПИСКА",
          "Source": "REG_ADDRESS",
          "Data_nachali_propiski": "16.06.2018"
        },
        "label": "ПРОПИСКА",
        "color": "aqua",
        "font": {
          "color": "white"
        },
        "id": 172289309
      },
      {
        "from": 10837649,
        "to": 56302973,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 139015876,
          "Vid_svyaziey": "БРАК",
          "Source": "MARRIAGE"
        },
        "label": "БРАК",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 139015876
      },
      {
        "from": 10837649,
        "to": 39340336,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 278592822,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "ZAGS"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 278592822
      },
      {
        "from": 10837649,
        "to": 39340337,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 278592823,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "ZAGS"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 278592823
      },
      {
        "from": 10837649,
        "to": 39340338,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 278592824,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "ZAGS"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 278592824
      },
      {
        "from": 10837649,
        "to": 100898927,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 278592827,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "ZAGS"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 278592827
      },
      {
        "from": 10837649,
        "to": 100898927,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 91451266,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "BIRTH"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 91451266
      },
      {
        "from": 10837649,
        "to": 12937865,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 109596453,
          "Vid_svyaziey": "БРАК",
          "Source": "MARRIAGE"
        },
        "label": "БРАК",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 109596453
      },
      {
        "from": 10837649,
        "to": 92957861,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 131328119,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "BIRTH"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 131328119
      },
      {
        "from": 10837649,
        "to": 64350627,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 278592826,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "ZAGS"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 278592826
      },
      {
        "from": 10837649,
        "to": 64350627,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 9185988,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "PARENTHOOD"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 9185988
      },
      {
        "from": 10837649,
        "to": 42828539,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 278592825,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "ZAGS"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 278592825
      },
      {
        "from": 10837649,
        "to": 169515360,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 278592828,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "ZAGS"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 278592828
      },
      {
        "from": 46901591,
        "to": 10837649,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 3679487,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "BIRTH"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 3679487
      },
      {
        "from": 46901590,
        "to": 10837649,
        "type": "ZAGS",
        "properties": {
          "Label": "MVD",
          "id": 20878157,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "Форма 1"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 20878157
      },
      {
        "from": 92957861,
        "to": 10837649,
        "type": "ZAGS",
        "properties": {
          "Label": "MVD",
          "id": 86797890,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "Форма 1"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 86797890
      },
      {
        "from": 56792605,
        "to": 10837649,
        "type": "ZAGS",
        "properties": {
          "Label": "ZAGS",
          "id": 121173562,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "BIRTH"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 121173562
      },
      {
        "from": 109067318,
        "to": 10837649,
        "type": "ZAGS",
        "properties": {
          "Label": "MVD",
          "id": 128930297,
          "Vid_svyaziey": "РОДИТЕЛЬ",
          "Source": "Форма 1"
        },
        "label": "РОДИТЕЛЬ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 128930297
      },
      {
        "from": 150267205,
        "to": 10837649,
        "type": "ZAGS",
        "properties": {
          "Label": "MVD",
          "id": 138141170,
          "Vid_svyaziey": "В БРАКЕ",
          "Source": "Форма 1"
        },
        "label": "В БРАКЕ",
        "color": "pink",
        "font": {
          "color": "white"
        },
        "id": 138141170
      }
    ],
    "typeOfSearch": "con1",
    "params": {
      "person": "770712302729",
      "relations": "BUHGALTER,DETDOM_HIST,DFO_AFF_FIZ,DFO_AFF_UL,DIRECTOR_CUR,DIRECTOR_HIST,FOUNDER_CUR,FOUNDER_HIST,ESF_100,ESF_10and100,ESF_10and50,ESF_50and100,ESF_5and10,FPG,GOSZAKUP,IP_KX,NTR_FL,NTR_UL_FL,OPG,PDL,REG_ADDRESS,REG_ADDRESS_CUR,REG_ADDRESS_HIST,REG_ADDRESS_UL,SLUZHIL,SUDIM,UCHILSYA,WORKER_CUR,WORKER_HIST,ZAGS,ZAGS_FIO,ZAGS_IIN,BLIZKIE_RODS,COUSIN,SIBLING",
      "depth": 1,
      "limit": "30",
      "approvement_type": "",
      "orderNum": "",
      "orderDate": "",
      "articleName": "",
      "caseNum": "",
      "checkingName": "",
      "otherReasons": "",
      "organName": "",
      "rukName": "",
      "sphereName": "",
      "tematikName": ""
    },
    "iin": false
}

