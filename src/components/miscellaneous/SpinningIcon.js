import '@fortawesome/fontawesome-free/css/all.min.css';

const SpinningIcon = ({ size }) => {
    return (
        <i className={`fas fa-spinner fa-spin fa-${size}`}></i>
    )
}

export default SpinningIcon;