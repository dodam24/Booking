import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2]; // URL에서 호텔 아이디를 추출
  // 각각의 상태들을 초기화
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // 호텔 정보를 가져오는 useFetch
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext); // 인증된 사용자 정보 가져오기
  const navigate = useNavigate(); // 페이지 이동 함수

  // SearchContext에서 검색 일자 및 옵션 정보 가져오기
  const { dates, options } = useContext(SearchContext);

  // 두 날짜 간의 차이를 계산
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  // 두 날짜 간의 숙박 일수를 계산
  const days = dayDifference(new Date(dates[0].endDate), new Date(dates[0].startDate));

  // 호텔 이미지
  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/275253666.jpg?k=ca3a86a556ccde85c7622705c07c6fa4178a2fefab37be799beca8d8b3fe5a75&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/images/hotel/max1024x768/161/161542530.jpg",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/402062946.jpg?k=5f2783e3799088b4e8f20a6ae1eccaa82dc5973694c41553773ed8c0401a71cc&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/images/hotel/max1024x768/261/261488854.jpg",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/482920560.jpg?k=82c86412a2cd31845422888d9947e29b947f0e32d897705d28842dde5192f62a&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/images/hotel/max1024x768/161/161541337.jpg",
    },
  ];

  // 슬라이더 열기
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  // 슬라이더 이동 함수
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  // 예약 버튼 클릭 시, 함수를 실행
  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      {/* 리스트 페이지의 헤더 부분 */}
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {/* 이미지 슬라이더 모달창 */}
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={photos[slideNumber].src}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          {/* 호텔의 정보를 표시 */}
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleClick}>지금 예약</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              최고의 위치 – 중심부에서 {data.distance}m
            </span>
            <span className="hotelPriceHighlight">
              이 숙박 시설에서 {data.cheapestPrice}만원 이상 예약하시면 무료 공항
              택시를 이용하실 수 있습니다.
            </span>
            {/* 호텔 이미지 부분 */}
            <div className="hotelImages">
              {photos.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo.src}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            {/* 호텔 상세 정보를 표시 */}
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>{days}박 일정에 완벽한 선택!</h1>
                <span>
                  {data.address}의 중심에 위치한 이 숙박 시설은 {data.rating}의 훌륭한 위치
                  평점을 자랑합니다.
                </span>
                <h2>
                  <b>₩{days * data.cheapestPrice * options.room}만원</b>{" "}
                  <small>({days} nights)</small>
                </h2>
                <button onClick={handleClick}>지금 예약</button>
              </div>
            </div>
          </div>
          <MailList />
          <br/>
          <Footer />
        </div>
      )}
      {/* 모달이 열려있을 때, 예약 컴포넌트를 렌더링 */}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
