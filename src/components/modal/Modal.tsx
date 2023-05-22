import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { Dialog, DialogActions, DialogContent, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { ETheme } from '../../features/theme/type.ts';
import { useAppSelector } from '../../store/hooks.ts';
import style from './modal.module.scss';

export type IModal = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  callbackClose?: () => void;
  classNames?: string;
} & typeof defaultProps;

const defaultProps = {
  children: <></>,
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
          root: style.normalizeElement,
        }}
      >
        {props.children}
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
