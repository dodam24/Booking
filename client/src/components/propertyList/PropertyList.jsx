import "./propertyList.css";
import useFetch from "../../hooks/useFetch";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/hotels/countByType");  // 호텔 유형별 개수를 가져온다.

  const images = [
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/196142631.jpg?k=c9768d35ef18bda64d84be6f927c4c0aa7b979f848e9297347ba39068c899603&o=&hp=1",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/209581491.jpg?k=73912870027db426f731fbc0d1f0e6b11294beb2309d0879e2cf7a6ac48bdf3d&o=&hp=1",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/176146176.jpg?k=b39064121e07d4670197d5cc3ef94314b9caccbb9968515dd400e205d739d39f&o=&hp=1"
  ];

  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        // 데이터 로딩이 완료되면 다음 내용을 표시
        <>
          {data &&
            // 이미지 배열을 순회하면서 각 이미지와 호텔 유형 및 개수를 표시 
            images.map((img, i) => (
              <div className="pListItem" key={i}>
                <img 
                  src={img} 
                  alt="" 
                  className="pListImg" 
                />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>
                    {data[i]?.count} {data[i]?.type}
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
