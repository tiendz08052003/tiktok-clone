import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './home.module.scss';
import * as ForYouServices from '~/services/ForYouServices';

import HeaderHome from './HeaderHome';
import AvatarHome from './AvatarHome';
import ContentHome from './ContentHome';
import Button from '~/Components/Button';

import VideoViewHome from './VideoViewHome/VideoViewHome.js';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const TYPE_VALUE = 'for-you';

const $ = document.querySelector.bind(document);

const $$ = document.querySelectorAll.bind(document);

function Home() {
  const ref = useRef(true);

  const refLength = useRef(0);

  const h1ref = useRef();

  const [idPlay, setIdPlay] = useState(0);

  const [idPause, setIdPause] = useState(0);

  const [idOld, setIdOld] = useState(0);

  const [saveOld, setSaveOld] = useState(0);

  const [boolPause, setBoolPause] = useState(0);

  const [page, setPage] = useState(INIT_PAGE);

  const [forYous, setForYous] = useState([]);

  const [loadFirst, setLoadFirst] = useState(true);

  const [scrollTop, setScrollTop] = useState(0);

  const [heightPage, setHeightPage] = useState(0);

  const [loading, setLoading] = useState(false);

  const [indexVideoDetail, setIndexVideoDetail] = useState(0);

  const [boolVideoHome, setBoolVideoHome] = useState(false);

  const [boolVideoDetail, setBoolVideoDetail] = useState(false);

  const [valuePercent, setValuePercent] = useState(0);

  //xét tăng api
  useEffect(() => {
    ForYouServices.GetForYou({ typeValue: TYPE_VALUE, page })
      .then((data) => {
        setForYous((prevVideo) => [...prevVideo, ...data]);
      })
      .catch((error) => console.log(error));
  }, [page]);

  // xét height cho element
  useEffect(() => {
    const main = $('.getHeight');

    const handleScroll = (event) => {
      setScrollTop(window.scrollY);
      setHeightPage(main.offsetHeight);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // nếu heightPage đạt giá trị khác thì bật html load lên
  useEffect(() => {
    setLoadFirst(true);
  }, [heightPage]);

  // nếu lướt chạm đáy thì xét để tăng thêm phần tử
  if (Math.floor(scrollTop) + 656 === heightPage) {
    if (loadFirst) {
      setLoadFirst(false);
      setLoading(true);
      setTimeout(() => {
        setPage(page + 1);
        setLoading(false);
      }, 2000);
    }
  }

  //hàm xét phần tử nào trong view
  useEffect(() => {
    if (h1ref.current) {
      // trong phần điều kiện phải dùng thuộc tính của nó
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio >= 0.5) {
              setIdPlay(parseInt(entry.target.classList[2]));
            } else {
              setIdPause(parseInt(entry.target.classList[2]));
              setBoolPause(entry.target.classList[2] + Math.random());
            }
          });
        },
        {
          threshold: 0.5,
        },
      );

      const childELes = $$('.home__all');

      //th1: xét trường hợp khi không bật vào trong video mà vẫn ở ngoài mà lướt hết video có video mới
      //th2: xét trường hợp khi từ trong video ra ngoài mà có thêm video mới đc tải
      if (refLength.current !== childELes.length) {
        ref.current = true;
      }

      if (ref.current) {
        refLength.current = childELes.length;
        ref.current = false;
        childELes.forEach((childELe) => {
          observer.observe(childELe);
        });
      }
    }
  });

  // save lại video trước video đang play
  useEffect(() => {
    // kiểm tra xem có phải video đầu tiên không
    if (idOld !== 0) {
      // save lại id của video có thể sẽ bị phát lại mà id play không phải video đó
      setSaveOld(idOld);
    }
    // lưu lại id play
    setIdOld(idPlay);
  }, [idPlay]);

  // xử lý play lại video cũ
  useEffect(() => {
    // xét xem video play có phải video đang bị pause không
    // idpause phải khác 0 vì phải có id mới so sánh đc idplay
    if (idPlay !== 0 && idPause !== 0 && idPause === idPlay) {
      setIdPlay(saveOld);
    }
  }, [boolPause]);

  // xét xem video click nào là video (id) nào để đưa vào
  const handleHideOnVideo = (data) => {
    setBoolVideoDetail(!boolVideoDetail);
    setBoolVideoHome(!boolVideoHome);
    console.log(forYous);
    for (var i = 0; i < forYous.length; i++) {
      if (forYous[i].id === data) {
        setIndexVideoDetail(i);
        break;
      }
    }
  };

  // hàm cử lý out ra ngoài nhưng delay
  // không thể xử dụng callback vì có dữ liệu trả về và thay đổi trong componant con
  const handleBackMain = (e) => {
    e.stopPropagation();
    setBoolVideoHome(!boolVideoHome);
    setTimeout(() => {
      setBoolVideoDetail(!boolVideoDetail);
    }, 500);
  };

  // hàm xử lý next video tiếp theo trong trình xem video
  const handleNext = () => {
    if (indexVideoDetail + 2 === forYous.length) {
      setPage(page + 1);
    }
    setIndexVideoDetail(indexVideoDetail + 1);
  };

  // hàm xử lý back video sau trong trình xem video
  const handleBack = () => {
    indexVideoDetail === 0 ? setIndexVideoDetail(0) : setIndexVideoDetail(indexVideoDetail - 1);
  };

  useEffect(() => {
    if (forYous[indexVideoDetail] && !boolVideoHome) {
      //tải khi video đc out kể cả danh sách có thêm hay không thêm video vẫn phải load lại
      ref.current = true;
      const eLeItem = $('.home__' + forYous[indexVideoDetail].id);
      //eLeItem.scrollIntoView({ behavior: "smooth", block: "start + 60px", inline: "nearest" });
      //getBoundingClientRect lấy ra thông tin phần tử
      const topEle = eLeItem.getBoundingClientRect();
      window.scrollTo({
        top: topEle.top - 60,
        left: 0,
        behavior: 'instant',
      });
    }
  }, [boolVideoHome]);

  return (
    <div className={cx('wrapper', 'getHeight')}>
      <div className={cx('content')}>
        {!boolVideoHome &&
          forYous.map((forYou, index) => {
            return (
              <div key={index} ref={h1ref} className={cx('home', 'home__all', forYou.id, 'home__' + forYou.id)}>
                <AvatarHome data={forYou} />
                <div className={cx('home__content')}>
                  <HeaderHome data={forYou} />
                  <ContentHome
                    data={forYou}
                    idPlay={idPlay}
                    idPause={idPause}
                    idOld={idOld}
                    handleHideOnVideo={handleHideOnVideo}
                    valuePercent={valuePercent}
                    setValuePercent={setValuePercent}
                  />
                </div>
              </div>
            );
          })}
      </div>
      <div className={cx('download')}>
        <Button rounded className={cx('download--content')}>
          Get the app
        </Button>
      </div>
      <div className={cx('loading')}>
        {loading ? (
          <div>
            <div className={cx('loading__child', 'loading__child--1')}></div>
            <div className={cx('loading__child', 'loading__child--2')}></div>
            <div className={cx('loading__child', 'loading__child--3')}></div>
          </div>
        ) : (
          ''
        )}
      </div>
      {boolVideoDetail && (
        <VideoViewHome
          data={forYous[indexVideoDetail]}
          handleNext={handleNext}
          handleBack={handleBack}
          handleBackMain={handleBackMain}
          indexVideoDetail={indexVideoDetail}
        />
      )}
    </div>
  );
}

Home.propTypes = {};

export default Home;
