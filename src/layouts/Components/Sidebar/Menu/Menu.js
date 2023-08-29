// kiểm tra PropTypes
import PropTypes from "prop-types"

//link className
import classNames from "classnames/bind";
import styles from "./Menu.module.scss"

const cx = classNames.bind(styles);

function Menu({children}) {
    return ( 
        <nav className={cx("menu")}>
            {children}
        </nav>
     );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired
}

export default Menu;