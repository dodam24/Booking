import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  // useFetch 훅을 통해 API에서 데이터를 가져온다.
  const { data, loading, error } = useFetch("/hotels?featured=true");

  const images = [
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/381474947.jpg?k=9e492523050468b696817612967aadfe6259ded569df22ef675e8f7d99daf385&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/263192562.jpg?k=6ed658b137bf54c8b3b3df69a8a489bc22fa660c122526c5b21c516d3e914edf&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/264943936.jpg?k=6405c6363e66c4165187441339908d840cb60fcbd880bc991966468cb5de9613&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/457318529.jpg?k=f9700f52ee35d6a1d555dbe30562d432c4b2081516f3a8d64fd5b7657ea32a0e&o=&hp=1",
  ];

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {/* 데이터 배열을 순회하며 각 호텔의 정보를 표시 */}
          {data.map((item, index) => (
            <div className="fpItem" key={item._id}>
              <img
                // src={item.photos[0]} // 호텔의 첫 번째 사진을 이미지로 표시
                src={images[index]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice"><small>최저</small> ₩{item.cheapestPrice}0,000</span>
              {/* 호텔 평점이 존재하는 경우, 평점과 평가 내용을 표시 */}
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>{item.ratingText}</span>
              </div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
