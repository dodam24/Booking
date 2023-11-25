import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  // useFetch 훅을 통해 API에서 데이터를 가져온다.
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {/* 데이터 배열을 순회하며 각 호텔의 정보를 표시 */}
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              {/* 호텔의 첫 번째 사진을 이미지로 표시 */}
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapesPrice}</span>
              {/* 호텔 평점이 존재하는 경우, 평점과 평가 내용을 표시 */}
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
