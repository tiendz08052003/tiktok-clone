// import proptypes giúp phát hiện lỗi
import PropTypes from 'prop-types'

//import icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

//import ele
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import Images from '~/Components/Image';

const cx = classNames.bind(styles)

function AccountItem ({data}) {
    return (
        <div className={cx('nameAccount')}>
            <div className={cx('nameAccount-ava')}>
                <Images className={cx('nameAccount-img')}
                src={data.avatar}
                alt={data.nickname} /> 
            </div>

            <div className={cx('nameAccount-info')}>
                <h4 className={cx('nameAccount-topic')}>
                    <span>{data.nickname}</span>
                    <FontAwesomeIcon className={cx('nameAccount-icon')} icon={faCircleCheck}/>
                </h4>
    
                <p className={cx('nameAccount-content')}>
                    <span>{data.full_name}</span>
                </p>
            </div>
        </div>
    )
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default AccountItem