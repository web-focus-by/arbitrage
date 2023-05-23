import style from './BlockTitle.module.scss';
import classNames from "classnames";
import PrimaryButton from "../primaryButton/PrimaryButton";

interface Props {
  value: string;
}

const BlockTitle = (props: Props) => {
  return (
    <div className={style.blockTitle}>
      {props.value}
    </div>
  );
};

export default BlockTitle;