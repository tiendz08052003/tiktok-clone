// thư viện kiểm tra sai hay đúng proptypes
import PropTypes from 'prop-types'

// import className
import classNames from "classnames/bind";
import styles from './Menu.module.scss';

//import Link
import Button from '~/Components/Button';


const cx = classNames.bind(styles)

function MenuItems ({ data, onClick }) {
    return (
        <Button className={cx('menu-item', {separate: data.separate})} leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    )
}

MenuItems.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}

export default MenuItems