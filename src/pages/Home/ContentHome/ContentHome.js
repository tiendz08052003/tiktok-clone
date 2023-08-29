// import Use
import { useEffect, memo, useState } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ContentHome.module.scss';
import ContentVideo from './ContentVideo';
import HeaderNoti from '~/layouts/Components/Header/HeaderNoti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { EmbedIcon, SendIcon, FBIcon, CopyIcon, CallIcon, DownIcon, TriangleIcon } from '~/Components/Icons';

const cx = classNames.bind(styles);

function ContentHome({ data, idPlay, idPause, idOld, handleHideOnVideo, setValuePercent, valuePercent }) {
  const mainShare = document.querySelector('.content__suggest--' + data.id);

  const [onHidden, setOnHidden] = useState(false);

  const [opacity, setOpacity] = useState(0);

  const [onContentSuggest, setOnContentSuggest] = useState(false);

  const styleContentSuggest = {
    display: `${onContentSuggest ? 'block' : 'none'}`,
    opacity: `${opacity}`,
  };

  // xử lý thoát
  const handleNoti = () => {
    setOnHidden(!onHidden);
  };

  const HandleExit = () => {
    setOnHidden(!onHidden);
  };

  // hàm xử lý click vào share
  const handleContentSuggest = () => {
    if (onContentSuggest) {
      setOpacity(0);
      // transitionend dùng để lắng nghe sự kiện kết thức thì mới hành động
      mainShare.addEventListener('transitionend', () => {
        setOnContentSuggest(false);
      });
    } else {
      setOpacity(1);
      setOnContentSuggest(true);
    }
  };

  // hàm xử lý hover vào share
  const handleHideContentSuggest = () => {
    setOpacity(0);
    // transitionend dùng để lắng nghe sự kiện kết thức thì mới hành động
    mainShare.addEventListener('transitionend', () => {
      setOnContentSuggest(false);
    });
  };

  // hàm xử lý hover vào share
  const handlePresentlyContentSuggest = () => {
    setOpacity(1);
    setOnContentSuggest(true);
  };

  // hàm xử lý hành động không bị lan ra khỏi phạm vi
  const handleStopOut = (e) => {
    handlePropagation(e);
  };

  //Hàm xử lý không lan tỏa
  const handlePropagation = (x) => {
    x.stopPropagation();
  };

  // hàm xử lý lấy id video được click vào để hiện
  const handleDataID = () => {
    handleHideOnVideo(data.id);
  };

  return (
    <div className={cx('content')}>
      <div className={cx('content__video')} onClick={handleDataID}>
        <ContentVideo
          data={data}
          idPlay={idPlay}
          idPause={idPause}
          idOld={idOld}
          valuePercent={valuePercent}
          setValuePercent={setValuePercent}
        />
      </div>
      <div className={cx('content__Interactive')}>
        <div className={cx('content__Interactive--if')} onClick={handleNoti}>
          <div className={cx('content__frame')}>
            <FontAwesomeIcon icon={faHeart} className={cx('content__icon')} />
          </div>
          <strong className={cx('content__quality')}>{data.likes_count}</strong>
        </div>
        <div className={cx('content__Interactive--if')} onClick={handleNoti}>
          <div className={cx('content__frame')}>
            <FontAwesomeIcon icon={faComment} className={cx('content__icon')} />
          </div>
          <strong className={cx('content__quality')}>{data.comments_count}</strong>
        </div>
        <div className={cx('content__Interactive--if', 'content__Interactive--if--3')}>
          <div
            className={cx('content__frame')}
            onClick={handleContentSuggest}
            onMouseLeave={handleHideContentSuggest}
            onMouseEnter={handlePresentlyContentSuggest}
          >
            <FontAwesomeIcon icon={faShare} className={cx('content__icon')} />
          </div>
          <strong className={cx('content__quality')}>{data.shares_count}</strong>
          <div
            style={styleContentSuggest}
            className={cx('content__suggest', 'content__suggest--' + data.id)}
            onClick={handleStopOut}
          >
            <div className={cx('content__suggest__content')}>
              <div className={cx('content__suggest__content__item')}>
                <EmbedIcon />
                <div className={cx('content__suggest__content__item__content')}>Embed</div>
              </div>
              <div className={cx('content__suggest__content__item')}>
                <SendIcon />
                <div className={cx('content__suggest__content__item__content')}>Send to friends</div>
              </div>
              <div className={cx('content__suggest__content__item')}>
                <FBIcon width="26px" height="26px" />
                <div className={cx('content__suggest__content__item__content')}>Share to Facebook</div>
              </div>
              <div className={cx('content__suggest__content__item')}>
                <CallIcon />
                <div className={cx('content__suggest__content__item__content')}>Share to WhatsApp</div>
              </div>
              <div className={cx('content__suggest__content__item')}>
                <CopyIcon />
                <div className={cx('content__suggest__content__item__content')}>Copy link</div>
              </div>
              <div className={cx('content__suggest__content__IconDown')}>
                <DownIcon />
              </div>
              <TriangleIcon className={cx('content__suggest__content__Triangle')} />
            </div>
          </div>
        </div>
      </div>
      <HeaderNoti onHidden={onHidden} HandleExit={HandleExit} />
    </div>
  );
}

export default memo(ContentHome);
