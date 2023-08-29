import { memo } from "react";
import PropTypes from "prop-types"
import classNames from "classnames/bind"
import styles from "./AvatarHome.module.scss"
import Image from "~/Components/Image";

const cx = classNames.bind(styles);


function AvatarHome({data}) {
    return (  
        <div className={cx("avatar-img")}>
            <Image
                className={cx("avatar")}
                src={data.user.avatar}
                alt="anhdaidien"
            />
        </div>
    );
}

export default memo(AvatarHome);