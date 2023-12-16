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
- City별, Type별 호텔 목록 표시
  - `REST API`를 활용한 호텔 데이터 가져오기 (호텔 정보, 호텔 및 객실 목록, 도시 및 유형별 호텔 수)
- Home, NavBar, Footer 컴포넌트 설계

- 호텔 검색 기능 구현
  - 옵션 설정: 도착지, 날짜, 인원 수 선택
  - 캘린더 UI 구현 및 날짜 범위 설정
  - 인원 수(성인, 아동) 및 객실 수의 증감 처리
<br>
  
> ### 회원가입, 로그인 기능
- `OAuth` 방식을 이용한 카카오 로그인 연동
- `Bcrpyt`를 활용한 비밀번호 암호화
- `Express`라우터를 이용한 사용자 인증
- `JWT` 토큰 인증을 활용한 로그인

- 로그인 여부에 따른 상이한 헤더 UI
    - 로그인 전 : 회원가입 / 로그인 버튼 표시
    - 로그인 후 : 해당 유저의 아이디 및 웰컴 메시지 표시
  
<br>

> ### 호텔 상세 페이지
- 해당 호텔 데이터 가져오기
- 날짜 선택(숙박 일수)에 따른 숙박 요금을 표시
- 객실 이미지 리스트
- 이미지 확대 기능 - 확대 시, 객실 이미지를 슬라이드 형태로 구현
<br>

> ### 예약 페이지
- '지금 예약' 버튼 클릭 시, 예약 모달 창 띄우기
    - 해당 객실 데이터(이미지 및 객실 정보, 금액 등) 가져오기
- 객실 선택 후 예약 버튼 클릭 시, 해당 객실은 예약 불가 상태로 변경(체크박스 비활성화)
<br>

> ### 검색 결과 페이지
- 도착지, 날짜, 인원 수 옵션 데이터 가져오기
- 검색창에 가격 설정(최저가 및 최고가 입력) 시, 해당 조건에 부합하는 객실 리스트 가져오기
<br>

> ### 관리자 페이지
- 호텔 및 객실 등록 및 삭제
- 회원 관리
- express 및 multer를 이용한 회원 및 객실 이미지 업로드
<br>

> #### 기타
- `Axios` 를 활용한 데이터 비동기 처리
  
- `useFetch` 사용자 정의 Hook
    - 데이터, 로딩 상태, 오류 상태에 대한 상태 변수 관리

- `Router`를 이용한 페이지 이동 처리

- 호텔 및 객실 데이터의 CRUD 작업
    - Hotel, Room, User 모델 스키마 생성 및 적용

- `Context API`를 통한 전역 상태 관리
    - 사용자 인증, 검색 정보

- `Reducer`를 활용한 다양한 액션 처리
