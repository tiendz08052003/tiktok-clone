// import proptypes giúp phát hiện lỗi
import PropTypes from 'prop-types'

// import link
import Header from '~/layouts/Components/Header'
import Sidebar from '~/layouts/Components/Sidebar'
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles)

const $ = document.querySelector.bind(document);

const $$ = document.querySelectorAll.bind(document);

function DefaultLayout( {children} ) {
    return (
        <div className={cx('wrapper')} >
            <Header />
            <div className={cx('container')} >
                <Sidebar /> 
                <div className={cx('content')} >
                    {children}
                </div>
            </div>
        </div>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
}


export default DefaultLayout    

// Tối ưu hiện đăng nhập 
// tìm tên trong báo cáo
// làm mờ khi thoát
