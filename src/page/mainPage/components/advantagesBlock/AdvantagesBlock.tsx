import style from './AdvantagesBlock.module.scss';
import classNames from "classnames";
import BlockTitle from "../BlockTitles/BlockTitle";

const dataAdvantages = [
  {id: 1, adv_headline: 'Связки между 10 топовыми биржами', adv_descr: 'Сервис считывает данные с лучших бирж и рассчитывает спред для более чем 1500 монет.', adv_img: ''},
  {id: 2, adv_headline: 'Удобные фильтры', adv_descr: 'С помощью фильтров можно настроить желаемую сумму сделки, спред, биржи, комиссии и многое другое.', adv_img: ''},
  {id: 3, adv_headline: 'Быстрое обновление спредов', adv_descr: 'Сервис мониторит биржи 24/7 и обновляет спреды каждые 10 секунд.', adv_img: ''}
]
const AdvantagesBlock = () => {
  return (
    <div className={classNames(style.mainPageContainer, style.container, style.spacing_between_blocks)}>
      <BlockTitle value={"Преимущества"}/>
      <div className={style.advantages_container}>
        {dataAdvantages.map((item) => (
          <div key={item.id}>
            <div>
              {item.adv_headline}
            </div>
            <div>
              {item.adv_descr}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvantagesBlock;