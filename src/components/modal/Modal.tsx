import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { Dialog, DialogActions, DialogContent, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import style from './modal.module.scss';

export type IModal = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  callbackClose?: () => void;
} & typeof defaultProps;

const defaultProps = {
  children: <></>,
  isOpen: false,
};
const Modal: FC<IModal> = (props) => {
  const handleClose = () => {
    props.setIsOpen(false);
    props.callbackClose && props.callbackClose();
  };

  return (
    <Dialog open={props.isOpen} onClose={handleClose} classes={{ paper: style.wrapper }}>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions
        classes={{
          root: style.closeBtn,
        }}
      >
        <IconButton aria-label="close" onClick={handleClose} disableRipple={true} sx={{ padding: 0 }}>
          <CloseRoundedIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

Modal.defaultProps = defaultProps;

export default Modal;
