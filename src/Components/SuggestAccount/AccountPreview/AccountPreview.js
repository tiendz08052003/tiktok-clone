
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./AccountPreview.module.scss"
import Image from "~/Components/Image";
import Button from "~/Components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function AccountPreview({data}) {
    return ( 
        <div className={cx("wrapper")}>
            <div className={cx("Follow")}>
                <Image 
                     className={cx('Follow-img')}
                     src={data.avatar}
                     alt={data.nickname}
                />
                <Button primary>
                    Follow
                </Button>
            </div>
            <div className={cx("Infor")}>
                <div className={cx("Infor__name")}>
                    <div className={cx("Infor__name-name")}>
                        <div className={cx("Infor__name-if")}>
                            <strong>{data.nickname}</strong>
                        </div>
                        {data.tick &&<FontAwesomeIcon className={cx("account__user--tick")} icon={faCheckCircle} />}
                    </div>
                    <div className={cx("Infor__name-id")}>
                        <div>{data.first_name} {data.last_name}</div>
                    </div>
                </div>
                <div className={cx("Infor__Follow")}>
                    <span className={cx("Infor__Follow--name")}><strong className={cx("Infor__Follow--quality")}>{data.followers_count}</strong>follow</span>
                    
                    <span className={cx("Infor__Follow--name")}><strong className={cx("Infor__Follow--quality")}>{data.likes_count}</strong>thích</span>
                    
                </div>
                
            </div>
        </div>
     );
}

AccountPreview.propTypes = {
}

export default AccountPreview;