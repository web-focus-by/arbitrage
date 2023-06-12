import style from './BlockTitle.module.scss';
import classNames from "classnames";

interface Props {
  value: string;
  className: string;
}

const BlockTitle = (props: Props) => {
  return (
      <h2 className={classNames(props.className, style.blockTitle)}>
        {props.value}
      </h2>
  );
};

export default BlockTitle;