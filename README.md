### 메인 페이지
https://github.com/dodam24/BookingApp/assets/121652059/9be5deb8-3850-4760-9c16-3e736098c7e4

<br>

### 검색 옵션 설정
![호텔 검색](https://github.com/dodam24/BookingApp/assets/121652059/e660e33a-d012-409d-8aa0-3498f6fb3fa2)

<br>

### 검색 결과 페이지
![검색 결과](https://github.com/dodam24/BookingApp/assets/121652059/002919ab-dd1b-4935-b24e-8cf4c6d9b2f4)

<br>

### 호텔 상세 페이지
![호텔 페이지](https://github.com/dodam24/BookingApp/assets/121652059/40adf7d8-2205-46d4-9a07-e0f30811ab0b)

<br>

### 예약 페이지
![객실 예약](https://github.com/dodam24/BookingApp/assets/121652059/e7814859-3c64-4c45-b96e-9219fd508707)

<br>

### 로그인 화면
![로그인 화면](https://github.com/dodam24/BookingApp/assets/121652059/b5e9d88d-1e93-418b-9c63-2d24164b7c53)

<br>

# 기술 스택
- HTML
- CSS
- JavaScript
- React
- Redux
- Axios
- Node.js
- Express
- MongoDB
- Mongoose
<br>

# 구현한 페이지 및 기능
> ### 메인 페이지
- City별, Type별 호텔 목록을 보여주는 메인 페이지
<br>

- 호텔 검색 기능 구현
  - 옵션 설정: 도착지, 날짜, 인원 수 선택
  - 캘린더 UI 구현 및 날짜 범위 설정
  - 인원 수(성인, 아동) 및 객실 수의 증감 처리
  
> ### 회원가입, 로그인 기능
- `OAuth` 방식을 이용한 카카오 로그인 연동
- `Bcrpyt`를 활용한 비밀번호 암호화
- `Express`라우터를 이용한 사용자 인증
- 사용자 인증 처리 (JWT 토큰 인증)

> ### 호텔 상세 페이지
- 객실 이미지를 슬라이드 형태로 구현

> ### 예약 페이지
- 예약 기능 및 모달 창 구현

> ### 검색 결과 페이지


> ### 관리자 페이지
- 게시글(호텔 및 객실) 등록 및 삭제
- 회원 관리

<br>

- `Axios` 를 활용한 데이터 비동기 처리
- `useFetch` 사용자 정의 Hook
    - 데이터, 로딩 상태, 오류 상태에 대한 상태 변수 관리
- Home, NavBar, Footer 컴포넌트 설계


- `Router`를 이용한 페이지 이동 처리

- 관리자 기능 구현
    - 게시글 등록 및 삭제, 회원 관리
- 로그인 여부에 따른 상이한 헤더 UI 구현
    - `Before`  회원가입 / 로그인 버튼
    - `After`  해당 유저의 아이디 및 웰컴 메시지 표시
- 호텔 및 객실 데이터의 CRUD 작업
    - Hotel, Room, User 모델 스키마 생성 및 적용

- `REST API`를 활용한 호텔 데이터 가져오기
    - 호텔 정보, 호텔 및 객실 목록, 도시 및 유형별 호텔 수
    
- `Context API`를 통한 전역 상태 관리
    - 사용자 인증, 검색 정보
- `Reducer`를 활용한 다양한 액션 처리
- 
