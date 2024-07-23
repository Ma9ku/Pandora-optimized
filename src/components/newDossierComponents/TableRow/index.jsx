import './style.scss';

const TableRow = ({ label, value }) => {
    return (
        <tr className='table-row'>
            <td>{label}</td>
            <td>{value}</td>
        </tr>
    );
}

export default TableRow;