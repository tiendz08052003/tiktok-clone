//react
import { useEffect, useState, useRef } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { SearchIcon } from '~/Components/Icons';
import AccountItem from '~/Components/AccountItem';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/animations/scale.css';
import { Wrapper as PopperWrapper } from '~/Components/Popper';
import { useDebounce } from '~/hooks';

//API
import * as APIServices from '~/services/APIServices';

const cx = classNames.bind(styles);

function Search() {
  //react
  const focusInput = useRef();

  //fake API
  const [searchResult, setSearchResult] = useState([]);
  //Value của input
  const [searchValue, setSearchValue] = useState('');
  //handle phần input
  const [showResult, setShowResult] = useState(true);
  //sét loading
  const [loading, SetLoading] = useState(false);
  //Sét thời gian cho tìm kiếm
  const setTimeValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!setTimeValue.trim()) {
      setSearchResult([]);
      return;
    }
    SetLoading(true);

    //xử lý Api bằng axios
    const fetchAPI = async () => {
      const result = await APIServices.Search(setTimeValue);
      setSearchResult(result);
      SetLoading(false);
    };

    fetchAPI();
  }, [setTimeValue]);

  const handleValue = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.trim() || searchValue.startsWith(' ')) {
      setSearchValue('');
      return;
    }
    setSearchValue(searchValue);
  };

  const hanldClickClose = () => {
    setSearchValue('');
    focusInput.current.focus();
  };

  const handleShowResult = () => {
    return setShowResult(false);
  };

  const hanldeFocus = () => {
    return setShowResult(true);
  };

  return (
    // thêm thẻ div để không báo lỗi khi nó render trực tiếp mà không có dom nào bảo vệ
    <div>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0}
        render={(attrs) => {
          return (
            <div className={cx('suggestions')} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <div className={cx('account')}>account</div>
                {searchResult.map((result) => (
                  <AccountItem key={result.id} data={result} />
                ))}
              </PopperWrapper>
            </div>
          );
        }}
      >
        <div className={cx('search')}>
          <input
            ref={focusInput}
            value={searchValue}
            placeholder="Tìm kiếm tài khoản và video"
            spellCheck={false}
            onChange={handleValue}
            onBlur={handleShowResult}
            onFocus={hanldeFocus}
          />
          {loading ? (
            <FontAwesomeIcon className={cx('search__loading')} icon={faSpinner} />
          ) : (
            !!searchValue && (
              <button className={cx('search__close')}>
                <FontAwesomeIcon icon={faCircleXmark} onClick={hanldClickClose} />
              </button>
            )
          )}
          <button className={cx('search__glass')} onMouseDown={(e) => e.preventDefault()}>
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
