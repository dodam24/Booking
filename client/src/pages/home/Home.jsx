import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">다양한 유형의 숙소를 확인해보세요</h1>
        <PropertyList/>
        <h1 className="homeTitle">고객이 사랑하는 홈 유형의 숙소</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
