import React, { useEffect, useState } from "react";
import './layoutController.css'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
const LayoutController = ({handleLayoutGlobal}) => {
    const [open, setOpen] = useState(false)
    const [enabled, setenabled] = useState(false)

    const [levelSeparation, setLevelSeparation] = useState(200)
    const [nodeSpacing, setNodeSpacing] = useState(300)
    const [treeSpacing, setTreeSpacing] = useState(150)

    const [blockShifting, setBlockShifting] = useState(true)
    const [edgeMinimization, setEdgeMinimization] = useState(true)
    const [parentCentralization, setParentCentralization] = useState(true)

    const [direction, setDirection] = useState('UD')
    const [sortMethod, setSortMethod] = useState('hubsize')
    const [shakeTowards, setShakeTowards] = useState('roots')

    useEffect(() => {
        handleLayout()
    }, [enabled, levelSeparation, nodeSpacing, treeSpacing, blockShifting, edgeMinimization, parentCentralization, direction, sortMethod, shakeTowards])

    const handleLayout = () => {
        handleLayoutGlobal({
            enabled,
            levelSeparation, nodeSpacing, treeSpacing,
            blockShifting, edgeMinimization, parentCentralization,
            direction, sortMethod, shakeTowards
        })
    } 

    return (
        <div className="layoutControllerBlock" style={{marginTop: '20px'}}>
            <div className="layoutControllerTitle" onClick={() => setOpen(curr => !curr)}>
                <div>Иерархия</div>
                <div></div>
            </div>

            <div className="layoutControllerBody" style={{display: open?"flex":"none"}}>
                <div className="layoutenabled">
                    <input id={"iId"} type={"checkbox"} value={enabled} onChange={() => setenabled(curr => !enabled)}/>
                    <label for={"iId"}>Иерархия</label>
                </div>

                <div className="layoutOptions" style={{display: enabled?"flex":"none"}}>
                    <div >
                        <label>Растояние между уровнями</label>
                        <TextField sx={{padding: '0'}} type={"Number"} value={levelSeparation} onChange={(event) => setLevelSeparation(parseInt(!isNaN(event.target.value) && !isNaN(parseFloat(event.target.value)) ? event.target.value : 0))}/>
                    </div>

                    <div >
                        <label>Растояние между объектами</label>
                        <TextField type={"Number"} value={nodeSpacing} onChange={(event) => setNodeSpacing(parseInt(!isNaN(event.target.value) && !isNaN(parseFloat(event.target.value)) ? event.target.value : 0))}/>
                    </div>

                    <div >
                        <label>Древо</label>
                        <TextField type={"Number"} value={treeSpacing} onChange={(event) => setTreeSpacing(parseInt(!isNaN(event.target.value) && !isNaN(parseFloat(event.target.value)) ? event.target.value : 0))}/>
                    </div>

                    <div className="layoutCheckboxes">
                        <div>
                            <input id="blockShifting" type={"checkbox"} checked={blockShifting} value={blockShifting} onChange={(event) => setBlockShifting(event.target.checked)}/>
                            <label htmlFor="blockShifting">Уменьшение пробелов</label>
                        </div>

                        <div>
                            <input id="edgeMin" type={"checkbox"} checked={edgeMinimization} value={edgeMinimization} onChange={(event) => setEdgeMinimization(event.target.checked)}/>
                            <label htmlFor="edgeMin">Минимизация</label>
                        </div>

                        <div>
                            <input id="parentCent" type={"checkbox"} checked={parentCentralization} value={parentCentralization} onChange={(event) => setParentCentralization(event.target.checked)}/>
                            <label htmlFor="parentCent">Парная централизация</label>
                        </div>
                    </div>

                    <div>
                        <label>Направление</label>
                        <Select value={direction} onChange={event => setDirection(event.target.value)}>
                            <MenuItem value={"UD"}>UD</MenuItem>
                            <MenuItem value={"DU"}>DU</MenuItem>
                            <MenuItem value={"LR"}>LR</MenuItem>
                            <MenuItem value={'RL'}>RL</MenuItem>
                        </Select>
                    </div>

                    <div>
                        <label>Метод сортировки</label>
                        <Select value={sortMethod} onChange={event => setSortMethod(event.target.value)}>
                            <MenuItem value={"hubsize"}>hubsize</MenuItem>
                            <MenuItem value={"directed"}>directed</MenuItem>
                        </Select>
                    </div>

                    <div>
                        <label>Компоновка</label>
                        <Select value={shakeTowards} onChange={event => setShakeTowards(event.target.value)}>
                            <MenuItem value={"roots"}>roots</MenuItem>
                            <MenuItem value={"leaves"}>leaves</MenuItem>
                        </Select>
                    </div>
                </div>
            </div>

        </div>
    )
}   

export default LayoutController;