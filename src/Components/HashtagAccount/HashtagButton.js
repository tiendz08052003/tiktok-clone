import PropTypes from "prop-types";

import classNames from "classnames/bind";
import styles from "./HashtagAccount.module.scss";
import Button from "../Button";

const cx = classNames.bind(styles);

function HagtagButton({content, icon, ...props}) {
    return ( 
        <Button {...props} className={cx("Hashtag")}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('content')}>{content}</span>                
        </Button>
     );
}

HagtagButton.propTypes = {
    content: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,

}

export default HagtagButton;