import classNames from "classnames/bind"
import styles from "./HashTagHome.module.scss"

const cx = classNames.bind(styles);

function HashTagHome({label, icon}) {
    return ( 
        <div className={cx('hashTag')}>
            {icon ? ( 
                <div className={cx('hashTag__content', "hashTag__content--icon")}>
                    {icon}
                    <div >{label}</div>
                </div>
            ) : 
            (
                <div className={cx('hashTag__content')}>{label}</div>
            )
            }
        </div>
     );
}

export default HashTagHome;