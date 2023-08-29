import PropTypes from "prop-types";

import classNames from "classnames/bind";
import styles from "./TopicTiktok.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

function TopicTiktok() {
    return ( 
        <div className={cx("wrapper")}>
            <div className={cx("topic")}>
                <a href="/" className={cx("topic__content")}>Introduce</a>
                <a href="/" className={cx("topic__content")}>News</a>
                <a href="/" className={cx("topic__content")}>Contact</a>
                <a href="/" className={cx("topic__content")}>Career</a>
                <a href="/" className={cx("topic__content")}>ByteDance</a>
            </div>

            <div className={cx("topic")}>
                <a href="/" className={cx("topic__content")}>TikTok for Good</a>
                <a href="/" className={cx("topic__content")}>Advertisement</a>
                <a href="/" className={cx("topic__content")}>Developers</a>
                <a href="/" className={cx("topic__content")}>Transparency</a>
                <a href="/" className={cx("topic__content")}>TikTok Rewards</a>
                <a href="/" className={cx("topic__content")}>TikTok Browse</a>
                <a href="/" className={cx("topic__content")}>TikTok Embeds</a>
            </div>

            <div className={cx("topic")}>
                <a href="/" className={cx("topic__content")}>Help</a>
                <a href="/" className={cx("topic__content")}>Safe</a>
                <a href="/" className={cx("topic__content")}>Rules</a>
                <a href="/" className={cx("topic__content")}>Privacy</a>
                <a href="/" className={cx("topic__content")}>Creator Portal</a>
                <a href="/" className={cx("topic__content")}>Community Guide</a>
            </div>

            <div className={cx("topic")}>
                <a href="/" className={cx("topic__content")}>More</a>
            </div>

            <div className={cx("topic")}>
                <a href="/" className={cx("topic__content")}>© 2022 TikTok</a>
            </div>
        </div>

    );
}

export default TopicTiktok;