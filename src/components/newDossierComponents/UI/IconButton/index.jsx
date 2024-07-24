import { useTheme } from '../../../../context/themeContext';
import './style.scss';

function IconButton({
    icon,
    onClick = () => {}
}) {    
    const { theme } = useTheme();

    return <div 
        onClick={onClick}
        className={`icon-button ${theme}`}
    >
        { icon }
    </div>
}

export default IconButton;