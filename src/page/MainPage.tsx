import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MainHeadline from "./mainPage/components/mainHeadline/mainHeadline";
import AdvantagesBlock from "./mainPage/components/advantagesBlock/AdvantagesBlock";
import VideoBlock from "./mainPage/components/videoBlock/VideoBlock";
import EarningInfoBlock from "./mainPage/components/EarningInfoBlock/EarningInfoBlock";
import RatesBlock from "./mainPage/components/RatesBlock/RatesBlock";

const MainPage = () => {
  return (
    <>
      <Header />
      <MainHeadline />
      <AdvantagesBlock />
      <VideoBlock />
      <EarningInfoBlock/>
      <RatesBlock/>
      <Footer />
    </>
  );
};

export default MainPage;
