import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MainHeadline from './mainPage/components/mainHeadline/mainHeadline';
import AdvantagesBlock from './mainPage/components/advantagesBlock/AdvantagesBlock';
import VideoBlock from './mainPage/components/videoBlock/VideoBlock';
import EarningInfoBlock from './mainPage/components/EarningInfoBlock/EarningInfoBlock';
import RatesBlock from './mainPage/components/RatesBlock/RatesBlock';
import InfoAboutTgBotsBlock from './mainPage/components/InfoAboutTgBotsBlock/InfoAboutTgBotsBlock';
import OurPartners from './mainPage/components/OurPartners/OurPartners';
import QuestionAnswerBlock from './mainPage/components/QuestionAnswerBlock/QuestionAnswerBlock';
import QuestionsRemainBlock from './mainPage/components/QuestionsRemainBlock/QuestionsRemainBlock';

const MainPage = () => {
  return (
    <>
      <Header />
      <MainHeadline />
      <AdvantagesBlock />
      <VideoBlock />
      <EarningInfoBlock />
      <RatesBlock />
      <InfoAboutTgBotsBlock />
      <OurPartners />
      <QuestionAnswerBlock />
      <QuestionsRemainBlock />
      <Footer />
    </>
  );
};

export default MainPage;
