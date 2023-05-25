import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MainHeadline from "./mainPage/components/mainHeadline/mainHeadline";
import AdvantagesBlock from "./mainPage/components/advantagesBlock/AdvantagesBlock";
import VideoBlock from "./mainPage/components/videoBlock/VideoBlock";

const MainPage = () => {
  return (
    <>
      <Header />
      <MainHeadline />
      <AdvantagesBlock />
      <VideoBlock />
      <Footer />
    </>
  );
};

export default MainPage;
