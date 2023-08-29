import PropTypes from "prop-types";
import AccountItems from "./AccountItems";

import classNames from "classnames/bind";
import styles from "./SuggestAccount.module.scss";

const cx = classNames.bind(styles);

function SuggestAccount({label, data = [], onSeeALL, maxLoadFirst}) {
    return (  
        <div className={cx("wrapper")}>
            <h4 className={cx("label")}>{label}</h4>
                {data.map(user => (
                    <AccountItems key={user.id} data={user}/>                   
                ))}
            <p className={cx("see-more")} onClick = {onSeeALL}>{data.length <= maxLoadFirst ? 'See all' : 'See less'}</p>
        </div>
    );
}

SuggestAccount.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array
}

export default SuggestAccount;