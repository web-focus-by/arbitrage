import main from './main.json';
import form from './form.json';
import errors from './errors.json';
import modal from './modal.json';
import profilePage from './pages/profilePage.json';

const lang = {
  ...errors,
  ...main,
  ...form,
  ...modal,
  ...profilePage,
};

export default lang;
