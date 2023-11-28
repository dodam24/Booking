import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  // useFetch 훅을 통해 API에서 데이터를 가져온다.
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=berlin,madrid,london"
  );

  // 데이터 로딩 중에는 로딩 메시지를 표시하고, 데이터 로딩이 완료되면 각 도시에 대한 정보를 표시
  return (
    <div className="featured">
      {loading ? (
        "로드 중입니다. 잠시만 기다려 주세요."
      ) : (
        <>
          {/* Berlin에 대한 정보를 표시 */}
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>서울</h1>
              <h2>숙소 {data[0]}개</h2>
            </div>
          </div>

          {/* Madrid에 대한 정보를 표시 */}
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>부산</h1>
              <h2>숙소 {data[1]}개</h2>
            </div>
          </div>

          {/* London에 대한 정보를 표시 */}
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
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