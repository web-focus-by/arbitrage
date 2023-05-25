import style from './VideoBlock.module.scss';
import classNames from "classnames";
import BlockTitle from "../BlockTitles/BlockTitle";

const VideoBlock = () => {
  return(
    <div className={classNames(style.mainPageContainer, style.container, style.spacing_between_blocks)}>
      <BlockTitle value={"Видео"}/>
    </div>
  );
};

export default VideoBlock;