import { Link } from "react-router-dom";
import "./searchItem.css";

// Image / Description / Details 크게 세 부분으로 나눈다.

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">중심부에서 {item.distance}m</span>
        <span className="siTaxiOp">무료 공항 택시</span>
        <span className="siSubtitle">
          디럭스 패밀리 트윈룸 - 바다 전망
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">무료 취소</span>
        <span className="siCancelOpSubtitle">
          {/* You can cancel later, so lock in this great price today!
          나중에 취소할 수 있으니, 오늘 이 좋은 가격으로 예약하세요! */}
          선결제 필요 없음 - 숙소에서 결제
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">세금 및 기타 요금 포함</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">예약 가능 옵션 보기</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
