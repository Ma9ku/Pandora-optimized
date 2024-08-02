import React, {Component, useEffect, useState} from "react";
import ReactDOM from "react-dom";

import RelationBlock from "../Relation/RelationBlock";
import RelationBlockZags from "../Relation/RelationBlockZags";
import { allRelations, relationsZags } from '../../../data/relationsData'
import GenericInput from "../../../pages/iTapCombatPage/components/GenericInput/genericInput";
import './RightBar.css'
import IconButton from "@mui/material/IconButton";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const RightBar = (props) => {
  const [showRels, setShowRelss] = useState("")
  const [relations, setRelations] = useState([])

  const [openLimit, setOpenLimit] = useState(10)
  const [showNodeInfo, setShowNodeInfo] = useState(false)
  const [showNodeAddInfo, setShowNodeAddInfo] = useState(false)

  useEffect(() => {
    setShowRels(relations.join(','))
  }, [relations])

  useEffect(() => {
    props.setOpenLimit(openLimit)
    props.setShowRels(showRels)
  }, [openLimit, showRels])

  const setShowRels = (rels) => {
    setShowRelss(rels);
  }

  const shortOpen = (id) => {
    props.shortOpen(id)
  }

  const shortHide = () => {
    props.shortHide()
  }

  return (
    <div className={`rightBar ${props.openRight?'rightBar20':'rightBar0'}`}>
        <div className="rightBarClose">
            <IconButton aria-label="expand row" size="small" onClick={() => props.handleRightOpen(false)}>
                <KeyboardArrowRightIcon style={{ fill: '#fff' }}/>
            </IconButton>
        </div>
      <div className="infoBlock" id="infoBlock">
        <div>

          <div className="infoBlockTitle">Информация {props.isOnSelectNode || props.isOnSelectEdge ? "об объекте" : ""}</div>
          <div className="nodeImg"
              style={{display: props.showImage 
              ? "flex" : "none"}}>
          </div>
            <div className="nodeInfo" id="nodeInfo" 
                style={{display: props.isOnSelectNode 
                  || props.isOnSelectEdge 
                ? "flex" : "none"}}>
              <div className="nodeInfoTitle" 
                  onClick={() => {
                    setShowNodeInfo(!showNodeInfo)
                    document.querySelector('#nodeInfoInner').style.display = showNodeInfo ? "flex" : "none"
                  }}>
                <div>Общие сведения</div>
                <i></i>
              </div>
              <div className="nodeInfoInner" id="nodeInfoInner">

              </div>
            </div> 

            <div className="nodeInfo" id="nodeAddInfo" style={{display: props.isOnSelectNode ? "flex" : "none"}}>
              <div className="nodeInfoTitle" 
                  onClick={() => {
                    setShowNodeAddInfo(!showNodeAddInfo)
                    document.querySelector('#nodeAddInfoInner').style.display = showNodeAddInfo ? "flex" : "none"
                  }}>
                <div>Дополнительные сведения</div>
                <i></i>
              </div>
              <div className="nodeInfoInner nodeAddInfoInner" id="nodeAddInfoInner">

              </div>
            </div> 

            {/* <div className="nodeInfo" id="nodeAddInfo" style={{display: props.isOnSelectNode && props.showSudInfo ? "flex" : "none"}}>
              <div className="nodeInfoTitle" 
                  onClick={() => {
                    setShowNodeAddInfo(!showNodeAddInfo)
                    document.querySelector('#nodeSudInfoInner').style.display = showNodeAddInfo ? "flex" : "none"
                  }}>
                <div>Риски</div>
                <i></i>
              </div>
              <div className="nodeInfoInner nodeSudInfoInner" id="nodeSudInfoInner">

              </div>
            </div>  */}
        </div> 
      </div>

      <div className={"openHideBlock"} style={{display: props.isOnSelectNode ? "flex" : "none"}}>
        <div className="actionBlock" style={{display: props.isOnSelectNode ? "block" : "none"}}>
            <Button sx={{marginRight: '10px', color: '#1b376f', borderColor: '#1b376f'}} variant="outlined" visible="false" value="Расскрыть" onClick={() => {
              let id = Object.keys(props.Network.selectionHandler.selectionObj.nodes)[0]
              shortOpen(id)
            }}>Раскрыть</Button>
            <Button sx={{color: '#1b376f'}} type="button" visible="false" value="Скрыть" onClick={shortHide}>Скрыть</Button>
        </div>

        <div>
          <div className="limitInputBlock">
            <label>Лимит</label>
            <TextField type={"number"} name="openLimit"  value={openLimit} onChange={event => {
              setOpenLimit(event.target.value)
            }}/>
          </div>
        </div>

        <div className="showRelsBlockRight" >
          <div>
              {/* {props.leftTabs == 'zags'
                  ? <RelationBlockZags setRels={setShowRels}></RelationBlockZags>
                  : <RelationBlock setRels={setShowRels}></RelationBlock>
              } */}
              {props.leftTabs == 'zags'
                  ? 
                  // <RelationBlockZags setRels={setShowRels}></RelationBlockZags>
                  <GenericInput 
                      label="Связи" 
                      type="chip-selecter" 
                      options={relationsZags}
                      value={relations} 
                      onChange={setRelations} 
                      // stateWare={setNewRequest}
                  />
                  : 
                  <GenericInput 
                      label="Связи" 
                      type="chip-selecter" 
                      options={allRelations}
                      value={relations} 
                      onChange={setRelations} 
                      // stateWare={setNewRequest}
                  />
                  // <RelationBlock setRels={setShowRels}></RelationBlock>
              }
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBar;