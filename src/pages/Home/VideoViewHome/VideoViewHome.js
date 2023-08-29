import { useEffect, useRef, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoViewHome.module.scss';
import {
  CallIcon,
  CommentIcon,
  EmbedIcon,
  ExitIcon,
  FBIcon,
  HeartIcon,
  MusicIcon,
  SendIcon,
  ShareIcon,
  VolumeIconLow,
  UpIcon,
  VolumeIconHigh,
} from '~/Components/Icons';
import Button from '~/Components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faPlay } from '@fortawesome/free-solid-svg-icons';

import Images from '~/Components/Image/Image';
import HashTagHome from '../HeaderHome/HashTagHome/HashTagHome';
import { ContentReport } from '../ContentHome/ContentVideo';
import HeaderNoti from '~/layouts/Components/Header/HeaderNoti/HeaderNoti';

const $ = document.querySelector.bind(document);

const $$ = document.querySelectorAll.bind(document);

const cx = classNames.bind(styles);

function VideoViewHome({ data, handleNext, handleBack, handleBackMain, indexVideoDetail }) {
  const volumeDefault = 0;

  const mainVideo = $('.videoViewHome__video__content--video');

  const mainThump = $('.videoViewHome__video__volume__edit__value--thump');

  const refVolume = useRef(0);

  const [testLoad, setTestLoad] = useState(false);

  const [valueVideo, setValueVideo] = useState(false);

  const [onPresently, setOnPresently] = useState(true);

  const [onHidden, setOnHidden] = useState(false);

  const [valueUpDown, setValueUpDown] = useState(false);

  const [valuePercent, setValuePercent] = useState(volumeDefault);

  const styleImg = {
    backgroundImage: `url(${data.thumb_url})`,
  };

  const styleUpDown = {
    backgroundColor: 'transparent',
  };

  // reload khi mới vào trang
  useEffect(() => {
    setTestLoad(true);
  }, [testLoad]);

  //xử lý quay lại video trước
  const handleBackSingle = (e) => {
    e.stopPropagation();
    setValueVideo(false);
    handleBack();
  };

  //xử lý tiếp tục video tiếp theo
  const handleNextSingle = (e) => {
    e.stopPropagation();
    setValueVideo(false);
    handleNext();
  };

  //xử lý tạm dừng hoặc tiếp tục video
  const handlePlayPause = () => {
    setValueVideo(!valueVideo);
    !valueVideo ? mainVideo.pause() : mainVideo.play();
  };

  // xử lý thời gian thực của video đang chạy
  const handleTimeUpdate = (e) => {
    if (e.target.currentTime === e.target.duration) {
      setTimeout(() => {
        mainVideo.play();
      }, 500);
    }
  };

  // xử lý không bị lan ra thẻ lớn
  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  // xử lý ẩn báo cáo
  const handleHideTable = () => {
    setOnPresently(!onPresently);
  };

  //xử lý hiện báo cáo
  const handlePresently = (e) => {
    e.stopPropagation();
    setOnPresently(!onPresently);
  };

  const handleNoti = () => {
    setOnHidden(!onHidden);
  };

  const HandleExit = () => {
    setOnHidden(!onHidden);
  };

  const handleMuteVolume = (e) => {
    e.stopPropagation();
    if (valuePercent > 0) {
      refVolume.current = valuePercent;
      setValuePercent(0);
      setValueUpDown(false);
    } else {
      if (refVolume.current === 0) {
        setValuePercent(refVolume.current);
        setValueUpDown(false);
      } else {
        setValuePercent(refVolume.current);
        setValueUpDown(true);
      }
    }
  };

  const handleValueVolume = (e) => {
    e.stopPropagation();
    if (e.target.value * 100 === 0) {
      refVolume.current = 0;
      setValueUpDown(false);
    } else {
      setValueUpDown(true);
    }
    setValuePercent(e.target.value * 100);
  };

  const styleSlider = {
    width: `${valuePercent}%`,
  };

  if (mainThump) {
    mainThump.value = valuePercent / 100;
  }

  useEffect(() => {
    if (mainVideo) {
      mainVideo.muted = false;
      mainVideo.volume = valuePercent / 100;
    }
  }, [valuePercent]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('videoViewHome__video')} onClick={handlePlayPause}>
        <div className={cx('videoViewHome__video__img')} style={styleImg}></div>
        <div className={cx('videoViewHome__video__content')}>
          <video
            muted
            width="100%"
            height="100%"
            poster={data.thumb_url}
            src={data.file_url}
            className={cx('videoViewHome__video__content--video', 'videoViewHome__video__content--video--' + data.id)}
            autoPlay
            onTimeUpdate={handleTimeUpdate}
          />
        </div>
        <div className={cx('videoViewHome__video__play')}>
          {valueVideo ? (
            <div className={cx('videoViewHome__video__play__icon')}>
              {' '}
              <FontAwesomeIcon icon={faPlay} className={cx('videoViewHome__video__play__icon--pause')} />{' '}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={cx('videoViewHome__video__icon')} onClick={handleBackMain}>
          <ExitIcon className={cx('videoViewHome__video__icon__item')} />
        </div>
        <div className={cx('videoViewHome__video__report')} onClick={handlePresently}>
          <Button
            rounded
            className={cx('videoViewHome__video__report__item')}
            leftIcon={<FontAwesomeIcon icon={faFlag} className={cx('videoViewHome__video__report__item__flag')} />}
          >
            Report
          </Button>
        </div>
        <div className={cx('videoViewHome__video__next')}>
          <div
            style={indexVideoDetail === 0 ? styleUpDown : {}}
            className={cx('videoViewHome__video__next__icon', 'videoViewHome__video__next__iconUp')}
            onClick={handleBackSingle}
          >
            {indexVideoDetail !== 0 && (
              <UpIcon width="2.6rem" height="2.6rem" className={cx('videoViewHome__video__next__icon__item')} />
            )}
          </div>
          <div
            className={cx('videoViewHome__video__next__icon', 'videoViewHome__video__next__iconDown')}
            onClick={handleNextSingle}
          >
            <UpIcon width="2.6rem" height="2.6rem" className={cx('videoViewHome__video__next__icon__item')} />
          </div>
        </div>
        <div className={cx('videoViewHome__video__volume')}>
          {valueUpDown ? (
            <div className={cx('videoViewHome__video__volume__item')} onClick={handleMuteVolume}>
              <VolumeIconHigh className={cx('content__volume__icon--up')} />
            </div>
          ) : (
            <div className={cx('videoViewHome__video__volume__item')} onClick={handleMuteVolume}>
              <VolumeIconLow className={cx('content__volume__icon--down')} />
            </div>
          )}
          <div className={cx('videoViewHome__video__volume__edit')}>
            <div className={cx('videoViewHome__video__volume__edit__value')}>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                className={cx(
                  'videoViewHome__video__volume__edit__value--input',
                  'videoViewHome__video__volume__edit__value--thump',
                )}
                onInput={handleValueVolume}
                onClick={handleStopPropagation}
              />
            </div>
            <div className={cx('videoViewHome__video__volume__edit__slider')}>
              <input style={styleSlider} className={cx('videoViewHome__video__volume__edit__slider--input')} />
            </div>
          </div>
        </div>
        <ContentReport
          onPresentlyTable={onPresently}
          onHideTable={handleHideTable}
          handleStopPropagation={handleStopPropagation}
        />
      </div>
      <div className={cx('videoViewHome__Interact')}>
        <div className={cx('videoViewHome__Interact__header')}>
          <div className={cx('videoViewHome__Interact__header__avatar')}>
            <Images className={cx('videoViewHome__Interact__header__avatar__item')} src={data.user.avatar} />
          </div>
          <div className={cx('videoViewHome__Interact__header__avatar__content')}>
            <div className={cx('videoViewHome__Interact__header__avatar__content__id')}>{data.user.nickname}</div>
            <div className={cx('videoViewHome__Interact__header__avatar__content__name')}>
              {data.user.nickname} • 1 day ago
            </div>
          </div>
          <div className={cx('videoViewHome__Interact__header__avatar__follow')} onClick={handleNoti}>
            <Button follow className={cx('videoViewHome__Interact__header__avatar__follow__button')}>
              follow
            </Button>
          </div>
        </div>
        <div className={cx('videoViewHome__Interact__body')}>
          <div className={cx('videoViewHome__Interact__body__content')}>
            <HashTagHome label={data.description} />
          </div>
          <div className={cx('videoViewHome__Interact__body__music')}>
            <MusicIcon className={cx('videoViewHome__Interact__body__music__icon')} />
            <a className={cx('videoViewHome__Interact__body__music--song')}>{data.music}</a>
          </div>
          <div className={cx('videoViewHome__Interact__body__interact')}>
            <div className={cx('videoViewHome__Interact__body__interact__socialNetwork')}>
              <div className={cx('videoViewHome__Interact__body__interact__socialNetwork__likeComment')}>
                <div
                  className={cx('videoViewHome__Interact__body__interact__socialNetwork__likeComment__like')}
                  onClick={handleNoti}
                >
                  <div
                    className={cx('videoViewHome__Interact__body__interact__socialNetwork__likeComment__like__item')}
                  >
                    <HeartIcon
                      className={cx(
                        'videoViewHome__Interact__body__interact__socialNetwork__likeComment__like__item__icon',
                      )}
                    />
                  </div>
                  {data.likes_count}
                </div>
                <div className={cx('videoViewHome__Interact__body__interact__socialNetwork__likeComment__comment')}>
                  <div
                    className={cx('videoViewHome__Interact__body__interact__socialNetwork__likeComment__comment__item')}
                  >
                    <CommentIcon
                      className={cx(
                        'videoViewHome__Interact__body__interact__socialNetwork__likeComment__comment__item__icon',
                      )}
                    />
                  </div>
                  {data.comments_count}
                </div>
              </div>
              <div className={cx('videoViewHome__Interact__body__interact__socialNetwork__network')}>
                <a href="" className={cx('videoViewHome__Interact__body__interact__socialNetwork__network__link')}>
                  <EmbedIcon
                    width="24px"
                    height="24px"
                    className={cx('videoViewHome__Interact__body__interact__socialNetwork__network__link__icon')}
                  />
                </a>
                <a href="" className={cx('videoViewHome__Interact__body__interact__socialNetwork__network__link')}>
                  <SendIcon
                    width="24px"
                    height="24px"
                    className={cx('videoViewHome__Interact__body__interact__socialNetwork__network__link__icon')}
                  />
                </a>
                <a href="" className={cx('videoViewHome__Interact__body__interact__socialNetwork__network__link')}>
                  <FBIcon
                    width="24px"
                    height="24px"
                    className={cx('videoViewHome__Interact__body__interact__socialNetwork__network__link__icon')}
                  />
                </a>
                <a href="" className={cx('videoViewHome__Interact__body__interact__socialNetwork__network__link')}>
                  <CallIcon
                    width="24px"
                    height="24px"
                    className={cx('videoViewHome__Interact__body__interact__socialNetwork__network__link__icon')}
                  />
                </a>
                <button className={cx('videoViewHome__Interact__body__interact__socialNetwork__network__link')}>
                  <ShareIcon
                    width="16px"
                    height="16px"
                    className={cx('videoViewHome__Interact__body__interact__socialNetwork__network__link__icon')}
                  />
                </button>
              </div>
            </div>
            <div className={cx('videoViewHome__Interact__body__interact__link')}>
              <div className={cx('videoViewHome__Interact__body__interact__link__tiktok')}>{data.file_url}</div>
              <div className={cx('videoViewHome__Interact__body__interact__link__btnCopy')}>
                <strong>Copy link</strong>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('videoViewHome__Interact__comment')}></div>

        <div className={cx('videoViewHome__Interact__footer')} onClick={handleNoti}>
          <div className={cx('videoViewHome__Interact__footer__input')}>
            <strong>Log in to comment</strong>
          </div>
        </div>
        <HeaderNoti onHidden={onHidden} data={data.id} HandleExit={HandleExit} />
      </div>
    </div>
  );
}

export default memo(VideoViewHome);
