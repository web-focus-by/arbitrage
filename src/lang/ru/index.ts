import main from './main.json';
import mainPage from "./pages/mainPage.json";
import form from './form.json';
import errors from './errors.json';
import modal from './modal.json';

const lang = {
  ...errors,
  ...main,
  ...mainPage,
  ...form,
  ...modal,
};

export default lang;
