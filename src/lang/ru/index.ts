import main from './main.json';
import mainPage from './pages/mainPage.json';
import form from './form.json';
import errors from './errors.json';
import modal from './modal.json';
import profilePage from './pages/profilePage.json';
import dashboardPage from './pages/dashboard.json';
import page404 from './pages/page404.json';
import footer from './pages/footer.json';

const lang = {
  ...errors,
  ...main,
  ...mainPage,
  ...form,
  ...modal,
  ...profilePage,
  ...dashboardPage,
  ...page404,
  ...footer
};

export default lang;
