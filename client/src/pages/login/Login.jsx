import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // 로그인 정보를 담는 상태 및 상태 업데이트 함수 정의
  const [credentials, setCredentials] = useState({  // 로그인 폼에서 입력된 유저명과 비밀번호를 저장하고, 입력 필드 값이 변경될 때 해당 상태를 업데이트
    username: undefined,
    password: undefined,
  });

  // AuthContext에서 로딩, 에러, 디스패치 함수 가져오기
  const { loading, error, dispatch } = useContext(AuthContext);

  // 페이지 이동 처리
  const navigate = useNavigate();

  // 입력 필드 값이 변경될 때 함수를 호출
  const handleChange = (e) => {
    // 이전 상태를 기반으로 새로운 객체로 업데이트 (spread 연산자를 사용하여 이전 상태를 그대로 가져오면서, 변경하고자 하는 필드 값을 이벤트 객체에서 가져온 값으로 업데이트)
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // 로그인 버튼 클릭 시 함수를 실행
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });  // 로그인 시작을 알리는 액션 디스패치
    try {
      // Axios를 사용하여 서버에 로그인 요청 보내기
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data }); // 로그인 성공을 알리는 액션 디스패치
      navigate("/");  // 로그인 성공 시, 홈페이지로 이동
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });  // 로그인 실패를 알리는 액션 디스패치
    }
  };

  // 로그인 화면 UI
  return (
    <>
      <div className="login">
        <div className="lContainer">
          <h1>로그인</h1>
          {/*  Username과 Password를 입력 */}
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          {/* 로그인 버튼 */}
          <button disabled={loading} onClick={handleClick} className="lButton">
            로그인
          </button>
          {/* 에러 메시지 표시 */}
          {error && <span className="errMessage">{error.message}</span>}
        </div>
      </div>
    </>
  );
};

export default Login;
