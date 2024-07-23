import './style.scss';

function SimpleText({
    value,
    children
}) {

    if (children) {
        return <div className="simple-text">{children}</div>
    }

    return ( 
        <div className="simple-text">{value}</div>
    );
}

export default SimpleText;