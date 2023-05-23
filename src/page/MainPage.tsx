import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MainHeadline from "./mainPage/components/mainHeadline/mainHeadline";
import AdvantagesBlock from "./mainPage/components/advantagesBlock/AdvantagesBlock";

const MainPage = () => {
  return (
    <>
      <Header />
      <MainHeadline />
      <AdvantagesBlock />
      <Footer />
    </>
  );
};

export default MainPage;
