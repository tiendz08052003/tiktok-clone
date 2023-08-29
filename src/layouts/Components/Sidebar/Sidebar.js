import { useState, useEffect } from 'react';
import config from '~/config/config';
import classNames from 'classnames/bind';
import Menu, { MenuItem } from './Menu';
import styles from './Sidebar.module.scss';
import * as UserServices from '~/services/UserServices';

// link icon
import {
  HomeIcon,
  PeopleGroupIcon,
  LiveIcon,
  HomeActiveIcon,
  PeopleGroupActiveIcon,
  LiveActiveIcon,
} from '~/Components/Icons';
import SuggestAccount from '~/Components/SuggestAccount';
import HagtagAccount from '~/Components/HashtagAccount';
import TopicTiktok from '~/Components/TopicTiktok';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

function SideBar() {
  const [page, setPage] = useState(INIT_PAGE);

  const [getSuggest, setGetSuggest] = useState([]);

  useEffect(() => {
    UserServices.getSuggested({ page, pagePer: PER_PAGE })
      .then((data) => {
        if (page === 2) {
          setGetSuggest(getSuggest.concat(data));
        } else {
          setGetSuggest(data);
        }
      })
      .catch((error) => console.log(error));
  }, [page]);

  const handleSeeALL = () => {
    page === 1 ? setPage(page + 1) : setPage(page - 1);
  };

  return (
    <aside className={cx('wrapper')}>
      <Menu className={cx('Menu')}>
        <MenuItem title="For you" to={config.routes.home} icon={<HomeIcon />} iconActive={<HomeActiveIcon />} />
        <MenuItem
          title="Following"
          to={config.routes.following}
          icon={<PeopleGroupIcon />}
          iconActive={<PeopleGroupActiveIcon />}
        />
        <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} iconActive={<LiveActiveIcon />} />
      </Menu>
      <SuggestAccount label="Recommended account" data={getSuggest} onSeeALL={handleSeeALL} maxLoadFirst={5} />
      <HagtagAccount label="Discover" />
      <TopicTiktok />
    </aside>
  );
}

export default SideBar;
