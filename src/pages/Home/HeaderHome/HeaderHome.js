import { memo } from 'react';
import { useState } from 'react';
import HeaderNoti from '~/layouts/Components/Header/HeaderNoti';
import PropTypes from "prop-types"
import classNames from "classnames/bind"
import styles from "./HeaderHome.module.scss"
import Button from "~/Components/Button";
import { HashtagIcon, MusicIcon } from "~/Components/Icons";
import HashTagHome from "./HashTagHome/HashTagHome";

const cx = classNames.bind(styles);


function HeaderHome({data}) {


    const [onHidden, setOnhidden] = useState(false);

    const hanldeNoti = () => {
        setOnhidden(!onHidden);
    }

    const HanldeExit = () => {
        setOnhidden(!onHidden);
    }

    return ( 
        <div className={cx("header")}>
            <div className={cx("header__content")}>
                <div className={cx("header__infor")}>
                    <a className={cx("infor--name")}>{data.user.nickname}</a>
                    <div className={cx("infor--id")}>{data.user.first_name} {data.user.last_name}</div>
                </div>
                <div className={cx("header__status")}>
                    {/* <HashTagHome icon={<HashtagIcon />} label="viral"/>
                    <HashTagHome icon={<HashtagIcon />} label="xuhuong"/>
                    <HashTagHome icon={<HashtagIcon />} label="fyp"/> */}
                    <HashTagHome label={data.description}/>
                </div>

                <a className={cx("header__music")}>
                    <MusicIcon />
                    <div className={cx("header__music-song")}>{data.music}</div>
                </a>
            </div>
            <Button follow small className={cx("header__button")} onClick={hanldeNoti}>
                Follow
            </Button>
            <HeaderNoti onHidden={onHidden} data={2} HanldeExit={HanldeExit}/>
        </div>
     );
}

HeaderHome.propTypes = {
    
}

export default memo(HeaderHome);