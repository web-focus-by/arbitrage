import main from './main.json';
import form from './form.json';
import errors from './errors.json';
import modal from './modal.json';

const lang = {
  ...errors,
  ...main,
  ...form,
  ...modal,
};

export default lang;
