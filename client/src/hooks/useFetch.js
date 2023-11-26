import { useEffect, useState } from "react";
import axios from "axios";  // HTTP 요청을 보내기 위한 axios

const useFetch = (url) => {
  // 데이터, 로딩 상태, 오류 상태를 관리하는 상태 변수
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // 컴포넌트가 마운트되거나 URL이 변경될 때, 데이터를 불러온다.
  useEffect(() => {
    // 비동기 함수 fetchData를 정의
    const fetchData = async () => {
      // 로딩 상태를 true로 설정하여 로딩 중임을 표시
      setLoading(true);
      try {
        // axios를 사용하여 지정된 URL에서 데이터를 가져온다.
        const res = await axios.get(url);
        // 가져온 데이터를 상태 변수에 저장
        setData(res.data);
      } catch (err) {
        // 오류가 발생하면 오류 상태를 true로 설정
        setError(err);
      } 
      // 데이터 로딩이 완료되면 로딩 상태를 false로 설정
      setLoading(false);
    };

    // fetchData 함수를 호출하여 데이터를 불러온다.
    fetchData();
  }, [url]);  // URL이 변경될 때마다 데이터를 새로 불러온다.

  // 데이터를 다시 불러오는 기능
  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
