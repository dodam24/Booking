import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">시간도 돈도 아낄 수 있는 현명한 선택!</h1>
      <span className="mailDesc">가입하시면 최고의 특가 정보를 보내드립니다.</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="이메일 주소" />
        <button>구독 신청</button>
      </div>
    </div>
  )
}

export default MailList