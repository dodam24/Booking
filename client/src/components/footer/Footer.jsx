import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem">국가</li>
          <li className="fListItem">지역</li>
          <li className="fListItem">도시</li>
          <li className="fListItem">구역</li>
          <li className="fListItem">공항</li>
          <li className="fListItem">호텔</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">홈</li>
          <li className="fListItem">아파트</li>
          <li className="fListItem">리조트</li>
          <li className="fListItem">빌라</li>
          <li className="fListItem">호스텔</li>
          <li className="fListItem">게스트 하우스</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">모든 여행지</li>
          <li className="fListItem">이용 후기</li>
          <li className="fListItem">읽을거리</li>
          <li className="fListItem">여행지 탐색</li>
          <li className="fListItem">시즌 & 홀리데이 특가</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">렌터카 서비스</li>
          <li className="fListItem">항공편 검색</li>
          <li className="fListItem">레스토랑 예약</li>
          <li className="fListItem">Booking.com 여행사</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">고객 서비스</li>
          <li className="fListItem">파트너 지원</li>
          <li className="fListItem">Careers</li>
          <li className="fListItem">지속가능성</li>
          <li className="fListItem">보도 자료</li>
          <li className="fListItem">안전보안 자료 센터</li>
          <li className="fListItem">이용약관</li>
          <li className="fListItem">개인정보 보호정책 & 쿠키 정책</li>
        </ul>
      </div>
      <div className="fText">Copyright © 2022 HotelBooking.</div>
    </div>
  );
};

export default Footer;
