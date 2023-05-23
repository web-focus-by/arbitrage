import main from './main.json';
import form from './form.json';
import errors from './errors.json';

const lang = {
  ...errors,
  ...main,
  ...form,
};

export default lang;
