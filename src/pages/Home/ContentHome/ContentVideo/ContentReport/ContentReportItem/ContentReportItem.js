import classNames from 'classnames/bind';
import styles from './ContentReportItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ContentReportItem({ data, dataAll, lastSelec, onClick }) {
  return lastSelec ? (
    <div className={cx('content__flag__table__body__selec__items')} onClick={onClick}>
      {dataAll.length === 1 && !data.children && !data.childrens ? (
        <a
          className={cx('content__flag__table__body__selec__items__content')}
          href="https://www.tiktok.com/legal/page/global/copyright-policy/en"
          target="_blank"
        >
          {data.title}
        </a>
      ) : (
        <div className={cx('content__flag__table__body__selec__items__content')}>{data.title}</div>
      )}
      <div className={cx('content__flag__table__body__selec__items__icon')}>
        <FontAwesomeIcon icon={faAngleRight} className={cx('content__flag__table__body__selec__items__icon--item')} />
      </div>
    </div>
  ) : (
    <li className={cx('content__flag__table__body__selec__last--item')}>{data.title}</li>
  );
}

export default ContentReportItem;
