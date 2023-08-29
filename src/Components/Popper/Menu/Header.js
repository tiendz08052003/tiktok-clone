// thư viện kiểm tra sai hay đúng proptypes
import PropTypes from 'prop-types'

// import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
// import link 
import classNames from "classnames/bind";
import styles from './Menu.module.scss';

const cx = classNames.bind(styles)

function Header ( { title, onBack } ) {
    return (
        <header className={cx('header')}>
            <button className={cx('header-btn')} onClick={onBack}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <h4 className={cx('header-title')}>{title}</h4> 
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired
}

export default Header

