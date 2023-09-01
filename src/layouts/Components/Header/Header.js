// import Use
import { useState } from 'react';

//import icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { faPersonBooth } from '@fortawesome/free-solid-svg-icons';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import link
import classNames from 'classnames/bind';
import images from '~/assest/images';
import styles from './Header.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/dist/tippy.css'; // optional
import Menu from '~/Components/Popper/Menu';
import Button from '~/Components/Button';
import HeaderNoti from './HeaderNoti';
import { MessageIcon, UploadIcon, PlusIcon } from '~/Components/Icons';
import Images from '~/Components/Image';
import Search from '../Search';
import { Link } from 'react-router-dom';

// link layout
import config from '~/config/config.js';

const cx = classNames.bind(styles);

function Header() {
  const currentUsers = true;

  const [onHidden, setOnhidden] = useState(false);

  const menu_list = [
    {
      icon: <FontAwesomeIcon icon={faEarthAsia} />,
      title: 'language',
      children: {
        title: 'language',
        data: [
          {
            type: 'language',
            code: 'en',
            title: 'English',
          },
          {
            type: 'language',
            code: 'vi',
            title: 'Tiếng Việt',
          },
        ],
      },
    },
    {
      icon: <FontAwesomeIcon icon={faCircleQuestion} />,
      title: 'Feedback and help',
      to: '/feedback',
    },
    {
      icon: <FontAwesomeIcon icon={faKeyboard} />,
      title: 'Keyboard shortcuts',
    },
  ];

  const menu_user = [
    {
      icon: <FontAwesomeIcon icon={faPersonBooth} />,
      title: 'View profile',
      to: '/@hoaa',
    },
    {
      icon: <FontAwesomeIcon icon={faBitcoin} />,
      title: 'Get Coins',
      to: '/@hoaa',
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Setting',
      to: '/settings',
    },
    ...menu_list,
    {
      icon: <FontAwesomeIcon icon={faMoon} />,
      title: 'Dark Mode',
    },
    {
      icon: <FontAwesomeIcon icon={faArrowRight} />,
      title: 'Log out',
      to: '/logout',
      separate: true,
    },
  ];

  const handleClickChange = (item) => {
    console.log(item);
  };

  const hanldeNoti = () => {
    setOnhidden(!onHidden);
  };

  const HanldeExit = () => {
    setOnhidden(!onHidden);
  };

  return (
    <header className={cx('wrapper')}>
      <div className={cx('childHeader')}>
        <a href={config.routes.home} className={cx('childHeader__logo')}>
          <img src={images.logo} alt="tiktok" />
        </a>

        <Search />
        <div className={cx('action')}>
          {currentUsers ? (
            <div className={cx('current-user')}>
              <Button text leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                Upload
              </Button>
              <Tippy delay={[0, 200]} content="Message" placement="bottom">
                <button className={cx('current-icon', 'current-message')}>
                  <UploadIcon />
                </button>
              </Tippy>
              <Tippy delay={[0, 200]} content="Upload Video" placement="bottom">
                <button className={cx('current-icon', 'current-upload')}>
                  <MessageIcon />
                </button>
              </Tippy>
            </div>
          ) : (
            <div className={cx('action-login')}>
              <Button text leftIcon={<PlusIcon />} onClick={hanldeNoti}>
                Upload
              </Button>
              <Button primary onClick={hanldeNoti}>
                Follow
              </Button>
            </div>
          )}
          <Menu items={currentUsers ? menu_user : menu_list} onChange={handleClickChange}>
            {currentUsers ? (
              <Images className={cx('action-img')} src={images.avatar} alt="Nguyễn Đình Tiến" fallback="" />
            ) : (
              <button className={cx('action-icon')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
      <HeaderNoti onHidden={onHidden} data={3} HanldeExit={HanldeExit} />
    </header>
  );
}

export default Header;
