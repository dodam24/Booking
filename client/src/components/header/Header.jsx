// Font Awesome에서 사용할 아이콘들
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";
// Font Awesome 아이콘을 React 컴포넌트로 사용하기 위한 컴포넌트
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range"; // 날짜 범위 선택을 위한 컴포넌트
import { useState } from "react";
import "react-date-range/dist/styles.css"; // 메인 css 파일
import "react-date-range/dist/theme/default.css"; // 테마 css 파일
import { format } from "date-fns"; // date-fns 라이브러리의 format 함수
import { useNavigate } from "react-router-dom";

const Header = ({ type }) => {
  // 도착지, 날짜, 인원 및 객실 옵션, 헤더 타입에 대한 상태 관리
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  // 페이지 이동 처리
  const navigate = useNavigate();

  // 옵션 값(성인, 아동, 객실)의 증감을 처리하는 함수
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  // 호텔 검색을 처리하는 함수
  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };

  // Header 컴포넌트의 UI를 반환
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          {/* 각각의 아이콘과 카테고리명을 표시 */}
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>숙소</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>항공권</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>렌터카</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faUmbrellaBeach} />
            <span>투어&액티비티</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>공항 택시</span>
          </div>
        </div>

        {/* 리스트 모드가 아닌 경우, 표시되는 부분 */}
        {type !== "list" && (
          <>
            {/* 할인 정보, 설명, 로그인/회원가입 버튼 등을 표시 */}
            <h1 className="headerTitle">숙소 예약 시 30% 이상 할인</h1>
            <p className="headerDesc">
              여행에 대한 보상을 받으세요! - 무료 Hotelbooking 계정으로 10% 이상
              즉시 할인 혜택을 누리세요.
            </p>
            <button className="headerBtn">로그인 / 가입하기</button>
            {/* 호텔 검색을 위한 검색창 */}
            <div className="headerSearch">
              {/* 도착지, 날짜, 인원 및 객실 옵션을 입력하는 부분 */}
              <div className="headerSearchItem">  {/* 도착지 부분 */}
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="어디로 향하시나요?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">  {/* 날짜 부분 */}
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >
                  {`${format(date[0].startDate, "yyyy년 MM월 dd일")} - ${format(
                    date[0].endDate,
                    "yyyy년 MM월 dd일"
                  )}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">  {/* 인원 및 객실 옵션 부분 */}
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`성인 ${options.adult}명 · 아동 ${options.children}명 · 객실 ${options.room}개`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">성인</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">어린이</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">객실</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  검색
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
