import '@fortawesome/fontawesome-free/css/all.min.css';

const SpinningIcon = ({ size }) => {

    // Size options: xs, sm, lg, 2x, 3x, 4x, 5x, 10x

    return (
        <i className={`fas fa-spinner fa-spin fa-${size}`}></i>
    )
}

export default SpinningIcon;