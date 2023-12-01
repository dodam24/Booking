import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const images = [
    {
      src: "https://www.lottehotel.com/content/dam/lotte-hotel/city/jeju/accommodation/standard/5156-151008-2000-acc-ltcj.jpg.thumb.768.768.jpg",
    },
    {
      src: "https://www.lottehotel.com/content/dam/lotte-hotel/signiel/busan/rooms/premier/2743-2000-roo-LTSB.jpg.thumb.768.768.jpg",
    },
  ];

  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`); // 호텔 객실 정보를 가져온다.
  const { dates } = useContext(SearchContext); // 검색 날짜 정보

  // 시작 날짜와 종료 날짜 사이의 날짜 목록을 생성
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  // 검색된 날짜 범위를 저장
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  // 객실이 선택 가능한지 여부를 확인
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(Date.parse(date))
    );

    return !isFound;
  };

  // 체크박스 선택 핸들러
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate(); // 페이지 이동 처리

  // 예약 버튼 클릭 핸들러
  const handleClick = async () => {
    try {
      // 선택된 객실들을 반복하면서 예약 가능한 상태로 업데이트
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      // 예약이 완료되면 모달을 닫고 홈페이지로 이동
      setOpen(false);
      navigate("/");
    } catch (err) {
      // 오류 발생 시, 아무 작업도 수행하지 않음
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>객실을 선택하세요:</span>
        {data &&
          data.map(
            (item, index) =>
              item && (
                <div className="rItem" key={item._id}>
                  <div clssName="rImage">
                    <img src={images[index % images.length]?.src} alt="" className="rItemImg" />
                  </div>
                  <div className="rItemInfo">
                    <div className="rTitle">{item.title}</div>
                    <div className="rDesc">{item.desc}</div>
                    <div className="rMax">
                      최대 인원: <b>{item.maxPeople}</b>
                    </div>
                    <div className="rPrice">{item.price},000원</div>
                  </div>
                  <div className="rSelectRooms">
                    {item.roomNumbers.map((roomNumber) => (
                      <div className="room" key={roomNumber._id}>
                        <label>{roomNumber.number}</label>
                        <input
                          type="checkbox"
                          value={roomNumber._id}
                          onChange={handleSelect}
                          disabled={!isAvailable(roomNumber)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        <button onClick={handleClick} className="rButton">
          지금 예약
        </button>
      </div>
    </div>
  );
};

export default Reserve;
