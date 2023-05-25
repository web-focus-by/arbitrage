import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MainHeadline from "./mainPage/components/mainHeadline/mainHeadline";
import AdvantagesBlock from "./mainPage/components/advantagesBlock/AdvantagesBlock";
import VideoBlock from "./mainPage/components/videoBlock/VideoBlock";
import EarningInfoBlock from "./mainPage/components/EarningInfoBlock/EarningInfoBlock";
import RatesBlock from "./mainPage/components/RatesBlock/RatesBlock";
import InfoAboutTgBotsBlock from "./mainPage/components/InfoAboutTgBotsBlock/InfoAboutTgBotsBlock";
import OurPartners from "./mainPage/components/OurPartners/OurPartners";

const MainPage = () => {
  return (
    <>
      <Header />
      <MainHeadline />
      <AdvantagesBlock />
      <VideoBlock />
      <EarningInfoBlock/>
      <RatesBlock/>
      <InfoAboutTgBotsBlock/>
      <OurPartners/>
      <Footer />
    </>
  );
};

export default MainPage;
