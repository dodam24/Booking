import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  // useFetch 훅을 통해 API에서 데이터를 가져온다.
  const { data, loading, error } = useFetch(
    `/hotels/countByCity?cities=${encodeURIComponent('서울')},${encodeURIComponent('부산')},${encodeURIComponent('제주')}`
  );

  // 데이터 로딩 중에는 로딩 메시지를 표시하고, 데이터 로딩이 완료되면 각 도시에 대한 정보를 표시
  return (
    <div className="featured">
      {loading ? (
        "로드 중입니다. 잠시만 기다려 주세요."
      ) : (
        <>
          {/* 서울 숙소에 대한 정보를 표시 */}
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/438919661.jpg?k=c3a9ad9354a9014b1e4117cfcbd528a9423a8af076b704de7969fab2f411695b&o=&hp=11"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>서울</h1>
              <h2>숙소 {data[0]}개</h2>
            </div>
          </div>

          {/* 부산 숙소에 대한 정보를 표시 */}
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/114557545.jpg?k=a56d494de4f3532dfdfb93e5c5ed60facaa0a9f3135649f9c1edfa0522ae0371&o=&hp=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>부산</h1>
              <h2>숙소 {data[1]}개</h2>
            </div>
          </div>

          {/* 제주 숙소에 대한 정보를 표시 */}
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/161534854.jpg?k=626d141cdf71ac39b9b5fe16600fb4a23e8eca191ee708d4357443ffbd62fe90&o=&hp=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>제주</h1>
              <h2>숙소 {data[2]}개</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;