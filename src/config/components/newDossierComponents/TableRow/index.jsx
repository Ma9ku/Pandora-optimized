import { useTheme } from '../../../context/themeContext';
import './style.scss';

const TableRow = ({ label, value }) => {
    const { theme } = useTheme();

    return (
        <tr className={`table-row ${theme}`}>
            <td>{label}</td>
            <td>{value}</td>
        </tr>
    );
}

export default TableRow;