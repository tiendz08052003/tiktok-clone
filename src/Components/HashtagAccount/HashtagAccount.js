import PropTypes from "prop-types";

import classNames from "classnames/bind";
import styles from "./HashtagAccount.module.scss";
import HagtagButton from "./HashtagButton";
import { HashtagIcon, MusicIcon } from "../Icons";

const cx = classNames.bind(styles);

function HagtagAccount({label}) {
    return ( 
        <div className={cx("wrapper")}>
            <h4 className={cx("label")}>{label}</h4>
            <HagtagButton content="suthatla" icon={<HashtagIcon />} rounded/>
            <HagtagButton content="macedoi" icon={<HashtagIcon />} rounded/>
            <HagtagButton content="sansangthaydoi" icon={<HashtagIcon />} rounded/>
            <HagtagButton content="What Is One-sided Love (MEE Remix) Mee Media & h0n" icon={<MusicIcon />} rounded/>
            <HagtagButton content="About Listening to Mother Ru People's Artist Bach Tuyet & Hua Kim Tuyen & 14 Caspe" icon={<MusicIcon />} rounded/>
            <HagtagButton content="Angel of Love - RICKY STAR" icon={<MusicIcon />} rounded/>
            <HagtagButton content="7749hieuung" icon={<HashtagIcon />} rounded/>
            <HagtagButton content="genzlife" icon={<HashtagIcon />} rounded/>
            <HagtagButton content="Love Is Full Of One Heart - Huyen Tam Mon" icon={<MusicIcon />} rounded/>
            <HagtagButton content="The Hou (Thai Hoang Remix) [Short Version] Dunghoangpham" icon={<MusicIcon />} rounded/>
        </div>
    );
}

HagtagAccount.propTypes = {
    label: PropTypes.string.isRequired,
}

export default HagtagAccount;