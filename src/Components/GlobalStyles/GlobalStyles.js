// import proptypes giúp phát hiện lỗi
import PropTypes from 'prop-types'

// import css của global
import './GlobalStyles.scss';

function GlobalStyles({ children }) {
    return children;
}

GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired
}

export default GlobalStyles;