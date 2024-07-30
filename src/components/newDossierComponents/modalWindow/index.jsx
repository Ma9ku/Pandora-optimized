
import { useContext, useEffect } from "react";
import { useTheme } from "../../../context/themeContext";
import './style.scss'
import { FaXmark } from "react-icons/fa6";
function ModalWindow({closer, children}) {
    const {theme} = useTheme()

    const handleClose = () => {
        document.querySelector('body').classList.remove('modal-open');
        closer(false);
    }

    useEffect(() => {
        document.querySelector('body').classList.add('modal-open');
    }, [])

    return (
        <div className={`custom-modal ${theme}`}>
            <div className="modal-container">
                <div 
                    className="modal-dim"
                    onClick={() => handleClose()}
                ></div>
                <div className="modal-body-wrapper">
                    <div className="modal-body">
                        <div className="close" onClick={() => handleClose()}><FaXmark /></div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ModalWindow;