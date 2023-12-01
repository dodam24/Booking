import { createContext, useEffect, useReducer } from "react";

// 초기 상태 정의
const INITIAL_STATE = {
  city: undefined,
  dates: JSON.parse(localStorage.getItem("dates")) || [],
  options: JSON.parse(localStorage.getItem("options")) || {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

// 검색 관련 컨텍스트 생성 (다양한 액션에 대한 상태 변경을 담당)
export const SearchContext = createContext(INITIAL_STATE);

// 리듀서 함수 정의
const SearchReducer = (state, action) => {
  switch (action.type) {
    // 새로운 검색 액션
    case "NEW_SEARCH":
      return action.payload;
    // 검색 초기화 액션
    case "RESET_SEARCH":
      return INITIAL_STATE;
    // 기본값 설정
    default:
      return state;
  }
};

// 검색 컨텍스트 프로바이더 컴포넌트 정의
export const SearchContextProvider = ({ children }) => {
  // 리듀서와 초기 상태를 사용하여 상태와 디스패치 함수 생성
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  // 날짜 정보가 업데이트될 때마다 로컬 스토리지에 반영
  useEffect(() => {
    localStorage.setItem("dates", JSON.stringify(state.dates));
  }, [state.dates]);

  // 옵션 정보가 업데이트될 때마다 로컬 스토리지에 반영
  useEffect(() => {
    localStorage.setItem("options", JSON.stringify(state.options));
  }, [state.options]);

  // 검색 컨텍스트 프로바이더 제공
  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
