// import use
import { useState, memo } from 'react';

import {
  QrIcon,
  PeopleIcon,
  FBIcon,
  GGIcon,
  SwitterIcon,
  LineIcon,
  TalkIcon,
  AppleIcon,
  IntaIcon,
  ExitIcon,
} from '~/Components/Icons';

import classNames from 'classnames/bind';
import styles from './HeaderNoti.module.scss';

const cx = classNames.bind(styles);

function HeaderNoti({ onHidden = false, HandleExit }) {
  const styleWrapper = {
    display: `${onHidden ? 'flex' : 'none'}`,
  };

  const handleExitNoti = () => {
    HandleExit();
  };

  return (
    <div style={styleWrapper} className={cx('wrapper', 'wrapper--single')}>
      <div className={cx('HeaderNoti', 'HeaderNoti--single')}>
        <div className={cx('HeaderNoti__body', 'HeaderNoti__body--single')}>
          <div className={cx('HeaderNoti__all')}>
            <h1 className={cx('HeaderNoti__header')}>Log in to TikTok</h1>
            <a
              className={cx('HeaderNoti__sele')}
              href="https://www.tiktok.com/login/qrcode?enter_from=homepage_hot&enter_method=click_like&hide_close_btn=1&is_modal=1&lang=en&type="
            >
              <QrIcon className={cx('HeaderNoti__sele__icon')} />
              <div className={cx('HeaderNoti__sele__content')}>Use QR code</div>
            </a>
            <a
              className={cx('HeaderNoti__sele')}
              href="https://www.tiktok.com/login/qrcode?enter_from=homepage_hot&enter_method=click_like&hide_close_btn=1&is_modal=1&lang=en&type="
            >
              <PeopleIcon className={cx('HeaderNoti__sele__icon')} />
              <div className={cx('HeaderNoti__sele__content')}>Use phone / email / username</div>
            </a>
            <a
              className={cx('HeaderNoti__sele')}
              href="https://www.tiktok.com/login/qrcode?enter_from=homepage_hot&enter_method=click_like&hide_close_btn=1&is_modal=1&lang=en&type="
            >
              <FBIcon className={cx('HeaderNoti__sele__icon')} />
              <div className={cx('HeaderNoti__sele__content')}>Continue with Facebook</div>
            </a>
            <a
              className={cx('HeaderNoti__sele')}
              href="https://www.tiktok.com/login/qrcode?enter_from=homepage_hot&enter_method=click_like&hide_close_btn=1&is_modal=1&lang=en&type="
            >
              <GGIcon className={cx('HeaderNoti__sele__icon')} />
              <div className={cx('HeaderNoti__sele__content')}>Continue with Google</div>
            </a>
            <a
              className={cx('HeaderNoti__sele')}
              href="https://www.tiktok.com/login/qrcode?enter_from=homepage_hot&enter_method=click_like&hide_close_btn=1&is_modal=1&lang=en&type="
            >
              <SwitterIcon className={cx('HeaderNoti__sele__icon')} />
              <div className={cx('HeaderNoti__sele__content')}>Continue with Twitter</div>
            </a>
            <a
              className={cx('HeaderNoti__sele')}
              href="https://www.tiktok.com/login/qrcode?enter_from=homepage_hot&enter_method=click_like&hide_close_btn=1&is_modal=1&lang=en&type="
            >
              <LineIcon className={cx('HeaderNoti__sele__icon')} />
              <div className={cx('HeaderNoti__sele__content')}>Continue with LINE</div>
            </a>
            <a
              className={cx('HeaderNoti__sele')}
              href="https://www.tiktok.com/login/qrcode?enter_from=homepage_hot&enter_method=click_like&hide_close_btn=1&is_modal=1&lang=en&type="
            >
              <TalkIcon className={cx('HeaderNoti__sele__icon')} />
              <div className={cx('HeaderNoti__sele__content')}>Continue with KakaoTalk</div>
            </a>
            <a
              className={cx('HeaderNoti__sele')}
              href="https://www.tiktok.com/login/qrcode?enter_from=homepage_hot&enter_method=click_like&hide_close_btn=1&is_modal=1&lang=en&type="
            >
              <AppleIcon className={cx('HeaderNoti__sele__icon')} />
              <div className={cx('HeaderNoti__sele__content')}>Continue with Apple</div>
            </a>
            <a
              className={cx('HeaderNoti__sele')}
              href="https://www.tiktok.com/login/qrcode?enter_from=homepage_hot&enter_method=click_like&hide_close_btn=1&is_modal=1&lang=en&type="
            >
              <IntaIcon className={cx('HeaderNoti__sele__icon')} />
              <div className={cx('HeaderNoti__sele__content')}>Continue with Instagram</div>
            </a>
          </div>
        </div>
        <div className={cx('HeaderNoti__footer')}>
          <div className={cx('HeaderNoti__footer__content')}>Don’t have an account? </div>
          <a className={cx('HeaderNoti__footer__link')} href="https://www.tiktok.com/signup">
            Sign up
          </a>
        </div>
        <div className={cx('HeaderNoti__icon')} onClick={handleExitNoti}>
          <ExitIcon />
        </div>
      </div>
    </div>
  );
}

export default memo(HeaderNoti);
