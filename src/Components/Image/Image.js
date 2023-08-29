// thư viện kiểm tra sai hay đúng proptypes
import PropTypes from 'prop-types';

// khai bao link
import { forwardRef, useState } from "react"
import images from "~/assest/images"
import classNames from "classnames"
import styles from './image.module.scss'


const Images = forwardRef(( {src, alt, className, fallback : fallbackImage = images.noImage, ...props}, ref ) => {
    const [fallback, setFallback] = useState('') 
    const handleOnError = () => (
        setFallback(fallbackImage)
    )
    return  <img className={classNames(styles.wrapper, className)} ref={ref} src={fallback || src} alt={alt} {...props} onError={handleOnError}/>
})

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
}

export default Images
 
