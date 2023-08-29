import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Following.module.scss';
import Button from '~/Components/Button/Button';

import * as FollowingServices from '~/services/FollowingServices';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 10;

function Following() {
  const [getFollowing, setGetFollowing] = useState([]);

  const [page, setPage] = useState(INIT_PAGE);

  useEffect(() => {
    FollowingServices.getFollowing({ page, pagePer: PER_PAGE })
      .then((data) => {
        if (page === 2) {
          setGetFollowing(getFollowing.concat(data));
        } else {
          setGetFollowing(data);
        }
      })
      .catch((error) => console.log(error));
  }, [page]);

  return (
    <div className={cx('wrapper', 'following', 'row')}>
      <div className={cx('col', 's-4')}>
        <div className={cx('following__child')}>
          <div className={cx('following__child__image')}></div>
          {/* <div className={cx("following__child__video")}></div>  */}
          <div className={cx('following__child__info')}>
            <div className={cx('following__child__avatar')}>
              <div className={cx('following__child__avatar__item')}></div>
            </div>
            <div className={cx('following__child__name')}>Theanh28</div>
            <div className={cx('following__child__nickname')}></div>
            <Button primary>Follow</Button>
          </div>
        </div>
      </div>
      <div className={cx('col', 's-4')}>
        <div className={cx('following__child')}>item 2</div>
      </div>
      <div className={cx('col', 's-4')}>
        <div className={cx('following__child')}>item 3</div>
      </div>
    </div>
  );
}

export default Following;
