import { createContext, useEffect, useReducer } from "react";

// 로컬 스토리지에서 유저 정보를 가져와 파싱한다.
const storedUser = localStorage.getItem("user");
const parsedUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

// 초기 상태 정의
const INITIAL_STATE = {
  user: parsedUser,
  loading: false,
  error: null,
};

// 인증 관련 컨텍스트 생성
export const AuthContext = createContext(INITIAL_STATE);

// 리듀서 함수 정의 (다양한 액션에 대한 상태 변경을 담당)
const AuthReducer = (state, action) => {
  switch (action.type) {
    // 로그인 시작
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    // 로그인 성공
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    // 로그인 실패
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
      // 로그아웃
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    // 기본값 설정
    default:
      return state;
  }
};

// 인증 컨텍스트 프로바이더 컴포넌트 정의
export const AuthContextProvider = ({ children }) => {
  // 리듀서와 초기 상태를 사용하여 상태와 디스패치 함수 생성
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // useEffect를 사용하여 유저 정보가 업데이트될 때마다 로컬 스토리지에 반영
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user)); // 로컬 스토리지에 유저 정보를 JSON 형태로 저장
  }, [state.user]);

  // 인증 컨텍스트 프로바이더 제공
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};