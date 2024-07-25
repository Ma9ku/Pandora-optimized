
import { useTheme } from "../../../context/themeContext";
import './style.scss'
import { FaXmark } from "react-icons/fa6";
function ModalWindow({closer, children}) {
    const {theme} = useTheme()

    return (
        <div className={`custom-modal ${theme}`}>
            <div className="modal-container">
                <div 
                    className="modal-dim"
                    onClick={() => closer(false)}
                ></div>
                <div className="modal-body-wrapper">
                    <div className="modal-body">
                        <div className="close" onClick={() => closer(false)}><FaXmark /></div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ModalWindow;