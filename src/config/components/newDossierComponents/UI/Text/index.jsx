import { useTheme } from '../../../../context/themeContext';
import './style.scss';

function SimpleText({
    value,
    children
}) {
    const { theme } = useTheme();

    if (children) {
        return <div className={`simple-text ${theme}`}>{children}</div>
    }

    return ( 
        <div className={`simple-text ${theme}`}>{value}</div>
    );
}

export default SimpleText;