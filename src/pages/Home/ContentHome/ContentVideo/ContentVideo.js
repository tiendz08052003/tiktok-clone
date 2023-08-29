import React from 'react';
import { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ContentVideo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faFlag } from '@fortawesome/free-solid-svg-icons';
import { VolumeIconLow, VolumeIconHigh } from '~/Components/Icons';
import { ContentReport } from '~/pages/Home/ContentHome/ContentVideo';

const $ = document.querySelector.bind(document);

const cx = classNames.bind(styles);

function ContentVideo({ data, idPlay, idOld, setValuePercent, valuePercent }) {
  var valueUpdate;

  const ref = useRef(false);

  const refValue = useRef(0);

  const processPlayPauseSlider = $('.content__volume__edit--slider');

  const processPlayPause = $('.content__video__item--' + data.id);

  const processAutoPlay = $('.content__video__item--' + idPlay);

  const processAutoPlayOld = $('.content__video__item--' + idOld);

  const processPlayPauseThump = $('.content__volume__edit--thump--' + data.id);

  const [onPresently, setOnPresently] = useState(true);

  const [valueUpDown, setValueUpDown] = useState(false);

  const [valueVideo, setValueVideo] = useState(true);

  const [count, setCount] = useState(1);

  useEffect(() => {
    setValueVideo(valueVideo === true ? false : true);
  }, [count]);

  const handlePlayPause = (e) => {
    e.stopPropagation();
    setCount(count + 1);
    if (valueVideo === true) {
      processPlayPause.pause();
    } else {
      processPlayPause.play();
    }
  };

  // th1: kiểm tra id video trong view để phát;
  // th2: kiểm khi lướt chưa hết nửa view của cả 2 video thì xảy ra lỗi
  useEffect(() => {
    if (processAutoPlay && data.id === idPlay) {
      if (valuePercent > 0) {
        processPlayPause.muted = false;
        processPlayPause.volume = valuePercent / 100;
        processPlayPauseSlider.value = valuePercent / 100;
      }
      setCount(count + 1);
      processAutoPlay.play();
    }
    if (processAutoPlayOld && idOld !== 0 && data.id === idOld) {
      if (valueVideo) {
        setCount(count + 1);
      }
      processAutoPlayOld.pause();
    }
  }, [idPlay]);

  const handleValueVolume = (e) => {
    valueUpdate = e.target.value;
    setValuePercent(parseInt(valueUpdate * 100));
    ref.current = true;
  };

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleChangeVolumeAll = (e) => {
    setValuePercent(parseInt(e.target.volume * 100));
    if (e.target.volume !== 0) {
      refValue.current = e.target.volume;
    }
  };

  useEffect(() => {
    if (valuePercent === 0) {
      setValueUpDown(true);
    } else {
      setValueUpDown(false);
    }
  }, [valuePercent]);

  useEffect(() => {
    if (ref.current) {
      processPlayPause.muted = false;
      processPlayPause.volume = valuePercent / 100;
      processPlayPauseSlider.value = valuePercent / 100;
    }
  }, [valuePercent]);

  const styleBottom = {
    bottom: `${100 - valuePercent}%`,
  };

  const styleDisplay = {
    visibility: 'visible',
    opacity: `${valueUpDown ? 1 : 0}`,
    transition: 'visibility 0s, opacity 0.2s ease-out',
  };

  const handleMuteVolume = (e) => {
    e.stopPropagation();
    if (valuePercent !== 0) {
      setValuePercent(0);
    } else {
      setValuePercent(refValue.current * 100);
    }
    ref.current = true;
  };

  const handleTimeUpdate = (e) => {
    if (e.target.currentTime === e.target.duration) {
      setTimeout(() => {
        processPlayPause.play();
      }, 500);
    }
  };

  const handlePresently = (e) => {
    e.stopPropagation();
    setOnPresently(!onPresently);
  };

  const handleHideTable = () => {
    setOnPresently(!onPresently);
  };

  if (processPlayPauseThump) {
    processPlayPauseThump.value = valuePercent / 100;
  }

  return (
    <div className={cx('content__video__play')}>
      <video
        muted
        width="100%"
        height="100%"
        poster={data.thumb_url}
        className={cx('content__video__item--' + data.id)}
        src={data.file_url}
        onVolumeChange={handleChangeVolumeAll}
        onTimeUpdate={handleTimeUpdate}
      />
      <div className={cx('content__play')} onClick={handlePlayPause}>
        {valueVideo ? (
          <div className={cx('content__play__icon')}>
            {' '}
            <FontAwesomeIcon icon={faPause} className={cx('content__play__icon--play')} />{' '}
          </div>
        ) : (
          <div className={cx('content__play__icon')}>
            {' '}
            <FontAwesomeIcon icon={faPlay} className={cx('content__play__icon--pause')} />{' '}
          </div>
        )}
      </div>
      <div className={cx('content__volume--hover')}>
        <div className={cx('content__volume')}>
          {valueUpDown ? (
            <div style={styleDisplay} className={cx('content__volume__icon')} onClick={handleMuteVolume}>
              {' '}
              <VolumeIconLow className={cx('content__volume__icon--muted')} />
            </div>
          ) : (
            <div style={styleDisplay} className={cx('content__volume__icon')} onClick={handleMuteVolume}>
              <VolumeIconHigh className={cx('content__volume__icon--up')} />
            </div>
          )}
          <div className={cx('content__volume__handle')}>
            <div className={cx('content__volume__edit')}>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                className={cx(
                  'content__volume__edit--thump--' + data.id,
                  'content__volume__edit--thump',
                  'content__volume__edit--slider',
                )}
                onInput={handleValueVolume}
                onClick={handleStopPropagation}
              />
            </div>
            <div className={cx('content__volume__slider')}>
              <div className={cx('content__volume__slider__upDown')}>
                <input style={styleBottom} className={cx('content__volume__slider__progress')}></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('content__flag')} onClick={handlePresently}>
        <div className={cx('content__flag__icon')}>
          <FontAwesomeIcon icon={faFlag} className={cx('content__flag__icon--flag')} />
        </div>
        <strong className={cx('content__flag__report')}>Báo cáo</strong>
      </div>
      <ContentReport
        onPresentlyTable={onPresently}
        onHideTable={handleHideTable}
        handleStopPropagation={handleStopPropagation}
      />
    </div>
  );
}

ContentVideo.propTypes = {};

export default memo(ContentVideo);
