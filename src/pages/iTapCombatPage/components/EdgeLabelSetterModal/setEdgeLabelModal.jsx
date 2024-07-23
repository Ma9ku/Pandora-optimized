
import { useState } from 'react'
import './setEdgeLabelModal.scss'
import closeIcon from '../../images/closeIcon.svg'


function SetEdgeLabelModal({onSubmit, onClose}) {
    const [label, setLabel] = useState("")
    return (
        <div className="edge-label-set-modal">
            <div className="modal-header">
                <h1>Создать объект</h1>
                <img src={closeIcon} onClick={onClose} alt=''/>
            </div>
            <div className="modal-body">
                <div className='label'>
                    <label htmlFor="">Введите текст</label>
                    <input type="text" value={label} onChange={(e) => {setLabel(e.target.value)}} name="" id="" />
                </div>
                {/* <div className='label'>
                    <input type="color" name="" id="" />
                    <label htmlFor="">Выберите цвет</label>
                </div> */}
            </div>
            <div className="modal-footer">
                <button onClick={() => {onSubmit(label)}}><a>Сохранить</a></button>
            </div>
        </div>
    )
}

export default SetEdgeLabelModal