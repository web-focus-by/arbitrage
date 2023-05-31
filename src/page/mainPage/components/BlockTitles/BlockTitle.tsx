import style from './BlockTitle.module.scss';
import classNames from "classnames";

interface Props {
  value: string;
}

const BlockTitle = (props: Props) => {
  return (
    <h2 className={style.blockTitle}>
      {props.value}
    </h2>
  );
};

export default BlockTitle;