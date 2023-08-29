import PropTypes from "prop-types";
import Tippy from '@tippyjs/react/headless';

import {Wrapper as PopperWrapper } from '~/Components/Popper'
import classNames from "classnames/bind";
import styles from "./SuggestAccount.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import AccountPreview from "./AccountPreview";
import Image from "../Image";

const cx = classNames.bind(styles);


function AccountItems({data}) {
    const renderPreview = (props) => {
        return (
            <div className={cx("preview")} tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview data = {data}/>
                </PopperWrapper>
            </div>
        )
    }
    return ( 
        <div>
            <Tippy
                interactive
                delay={[800, 500]}
                offset={[-20, 0]}
                placement="bottom"
                render={renderPreview}
            >
                <div className={cx("account-item")}>
                    <Image
                        className={cx("avatar-img")}
                        src={data.avatar}
                        alt="anhdaidien"
                    />
                    <div className={cx("account__user")}>
                        <p className={cx("account__user--infor")}>
                            <strong className={cx("account__user--name")}>{data.nickname}</strong>
                            {data.tick &&<FontAwesomeIcon className={cx("account__user--tick")} icon={faCheckCircle} />}
                        </p>
                        <div className={cx("account__user--id")}>{data.first_name} {data.last_name}</div>
                    </div>
                </div>
            </Tippy>
        </div>
     );
}

AccountItems.propTypes = {
}

export default AccountItems;