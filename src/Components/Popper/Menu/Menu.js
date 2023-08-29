// thư viện kiểm tra sai hay đúng proptypes
import PropTypes from 'prop-types'

// import link 
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/themes/light.css';
import 'tippy.js/dist/tippy.css'; // optional
import classNames from "classnames/bind";
import styles from './Menu.module.scss';
import {Wrapper as PopperWrapper } from '~/Components/Popper'
import MenuItems from './MenuItems';
import Header from './Header';

const cx = classNames.bind(styles)

function Menu ( {children, hideOnClick = false, items = [], onChange }) {
    const [history, setHistory] = useState([{data: items}])
    // history[history.length - 1] là ta sẽ lấy phần dữ liệu cuối cùng khi setHistory được sử dụng
    const current = history[history.length - 1];
    const render_list = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children
            const handleClickLanguage = () => {
                if(isParent) 
                {
                    setHistory(
                        prev => { 
                            // vì trên lấy mảng cuối cho nên khi thêm như này thì phần tử con sẽ là mảng cuối cùng
                            return [...prev, item.children]
                        }
                    )
                }   else {
                    onChange(item)
                }
            }
            return <MenuItems  key={index} data={item} onClick={handleClickLanguage}/>
        } )
    } 
    const hanldeClickBack = () => {
        return setHistory(prev => prev.splice(prev.length - 2, 1))
    }

    const handleValueMenu = (attrs) => {
        return (
            <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                <PopperWrapper className={cx('menu-popper')}>
                    {history.length > 1 && <Header title={current.title} onBack = {hanldeClickBack}/>}
                    <div className={cx('menu-body')}>{render_list()}</div>
                </PopperWrapper>
            </div>
    )}

    // trở về phần đầu của menu khi ẩn menu
    const handleOnBackMenuWhileOnHide = () => {
        setHistory((prev) => prev.slice(0, 1))
    }

    return (
        <Tippy
            delay={[0, 700]}
            interactive
            placement="bottom-end"
            hideOnClick={hideOnClick}
            render={handleValueMenu}
            onHide = {handleOnBackMenuWhileOnHide}
        >
            {children}        
        </Tippy>
    )
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    onChange: PropTypes.func,
    hideOnClick: PropTypes.bool
}

export default Menu

