// thư viện kiểm tra sai hay đúng proptypes
import PropTypes from 'prop-types';

// khai báo Styles
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles)


function Button ({ 
    to,
    href,
    onClick,
    children,
    primary = false,
    text = false,
    follow = false, 
    small = false,
    large = false,
    disible =false,
    rounded =false,
    className,
    leftIcon,
    rightIcon,
    ...passProps
    }) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps
    }

    if(to) {
        props.to = to
        Comp = Link
    }
    else if(href)
    {
        props.href = href
        Comp = 'a'
    }


    //remove event 
    if(disible)
    {
        Object.keys(props).forEach(key => {
            if(key.startsWith('on') && typeof props[key] === 'function')
            {
                delete props[key]
            }
        });
    }

    const classes = cx('wrapper', {
        primary,
        follow,
        small,
        large,
        text,
        rounded,
        [className]: className,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    )
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    className: PropTypes.string,
    primary: PropTypes.bool,
    text: PropTypes.bool,
    follow: PropTypes.bool,
    rounded: PropTypes.bool,
    disible: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
}

export default Button