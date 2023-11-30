import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">HotelBooking.com</span>
        </Link>
        {user ? user.username + "님, 환영합니다." : (
          <div className="navItems">
            <button className="navButton">가입하기</button>
            <button className="navButton" onClick={handleLoginClick}>
              로그인
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
