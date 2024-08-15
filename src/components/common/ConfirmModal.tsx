import * as React from "react";
import {
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useAppSelector, useAppDispatch } from "@/hook/ReduxHooks";
import { disableMessageModal } from "@/redux/features/messageModalSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const dispatch = useAppDispatch();
  const { message, isOpenModal } = useAppSelector(
    (state) => state.messageModal
  );

  const handleClose = () => dispatch(disableMessageModal());

  return (
    <Dialog
      open={isOpenModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth={"sm"}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle></DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {message && <div>{message}</div>}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
