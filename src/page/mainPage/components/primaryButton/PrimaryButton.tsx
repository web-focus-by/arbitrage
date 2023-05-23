import React from 'react';
import style from './PrimaryButton.module.scss';
import classNames from "classnames";

interface Props {
  value: string;
}

const PrimaryButton = (props: Props) => {

  if (props.value == "Выбрать тариф"){
    return (
      <div className={style.primaryButtonContainer}>
        {props.value}
      </div>
    );
  }else if(props.value == "Перейти"){
    return (
      <div className={style.primaryButtonGoContainer}>
        {props.value}
      </div>
    );
  }

};

export default PrimaryButton;