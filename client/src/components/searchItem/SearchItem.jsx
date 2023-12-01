import { Link } from "react-router-dom";
import "./searchItem.css";

// Image / Description / Details
const SearchItem = ({ item }) => {
  const images = [
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/323576578.jpg?k=1cecd34ff1f6faf5da7dc135e516b9fb9ecc2a305db085f2acf2653e4b49c6e9&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/260997076.jpg?k=f1971daaf53668b34e4baaa14ed11bc96b80c187ad7eeb82f7c7db3b1bc28317&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/298467205.jpg?k=78323ffcf3e510bc4260a20162d660a990ff011cb6750d79070a2b77c2360759&o=&hp=1",
  ];

  return (
    <div className="searchItem">
      <img src={images} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">중심부에서 {item.distance}m</span>
        <span className="siTaxiOp">무료 공항 택시</span>
        <span className="siSubtitle">디럭스 패밀리 트윈룸 - 바다 전망</span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">무료 취소</span>
        <span className="siCancelOpSubtitle">
          선결제 필요 없음 - 숙소에서 결제
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>{item.ratingText}</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">₩{item.cheapestPrice}0,000</span>
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
