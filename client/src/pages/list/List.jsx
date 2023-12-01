import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation(); // 현재 경로의 location 객체 가져오기
  // 도착지와 날짜 및 옵션 등 각각의 상태들을 초기화
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  // 호텔 데이터를 비동기적으로 가져오기
  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  // 옵션 변경 시, 함수를 호출
  const handleOptionsChange = (newOptions) => {
    setOptions(newOptions);
  };

  // 여행지 변경 시, 함수를 호출
  const handleDestinationChange = (newDestination) => {
    setDestination(newDestination);
  };

  // 검색 버튼 클릭 시, 함수를 호출
  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      {/* 리스트 페이지의 헤더 부분 */}
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          {/* 검색 옵션 부분 */}
          <div className="listSearch">
            <h1 className="lsTitle">검색</h1>
            {/* 여행지/숙소 이름 입력 필드 */}
            <div className="lsItem">
              <label>여행지/숙소 이름:</label>
              <input
                placeholder={destination}
                type="text"
                onChange={(e) => handleDestinationChange(e.target.value)}
              />
            </div>
            {/* 체크인 및 체크아웃 날짜 선택 부분 */}
            <div className="lsItem">
              <label>체크인 및 체크아웃 날짜</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "yyyy/MM/dd"
              )} - ${format(dates[0].endDate, "yyyy/MM/dd")}`}</span>
              {openDate && (  // 열려 있으면 날짜 범위를 보여준다.
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            {/* 옵션 설정 부분 */}
            <div className="lsItem">
              <label>옵션</label>
              <div className="lsOptions">
                {/* 최저가, 최고가, 인원수 및 객실수 설정 입력 필드 */}
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    최저가 <small>(1박 기준)</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    최고가 <small>(1박 기준)</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">성인</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                    onChange={(e) =>
                      handleOptionsChange({ // 성인 인원수를 업데이트하는 함수
                        ...options, // 기존 옵션 상태를 복사한 후, 변경된 성인 인원 수를 새로운 값으로 설정
                        adult: parseInt(e.target.value),  // 문자열을 정수로 변환
                      })
                    }
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">아동</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">객실</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            {/* 검색 버튼 */}
            <button onClick={handleClick}>검색</button>
          </div>
          {/* 호텔 리스트의 결과를 표시 */}
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
