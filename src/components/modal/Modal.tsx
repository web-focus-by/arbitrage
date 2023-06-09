import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { ETheme } from '../../features/theme/type.ts';
import { useAppSelector } from '../../store/hooks.ts';
import style from './modal.module.scss';
import classNames from 'classnames';

interface IModalContent {
  title?: string | ReactNode;
  text?: string | ReactNode;
  customTextContainer?: boolean;
  actions?: ReactNode | ReactNode[];
}

export type IModal = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  callbackClose?: () => void;
  classNames?: string;
  children?: ReactNode;
} & typeof defaultProps &
  IModalContent;

const defaultProps = {
  isOpen: false,
};
const Modal: FC<IModal> = (props) => {
  const theme = useAppSelector((state) => state.theme);
  const handleClose = () => {
    props.setIsOpen(false);
    props.callbackClose && props.callbackClose();
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={handleClose}
      classes={{ paper: props.classNames ? props.classNames : style.wrapper }}
    >
      <DialogContent
        classes={{
          root: classNames(style.normalizeElement, { [style.content]: !props.children }),
        }}
      >
        {props.children ? (
          props.children
        ) : (
          <>
            <DialogTitle component={'h4'} classes={{ root: classNames(style.title, 'h4') }}>
              {props.title}
            </DialogTitle>
            {props.customTextContainer ? (
              props.text
            ) : (
              <DialogContentText classes={{ root: style.text }}>{props.text}</DialogContentText>
            )}
            <DialogActions>{props.actions}</DialogActions>
          </>
        )}
      </DialogContent>
      <DialogActions
        classes={{
          root: style.closeBtn,
        }}
      >
        <IconButton aria-label="close" onClick={handleClose} disableRipple={true} sx={{ padding: 0 }}>
          <CloseRoundedIcon sx={{ fontSize: 32, color: theme === ETheme.light ? '#575757' : '#FFFFFF' }} />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

Modal.defaultProps = defaultProps;

export default Modal;
