import * as React from "react";
import {
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useAppSelector, useAppDispatch } from "@/hook/ReduxHooks";
import { disableMessageModal } from "@/redux/features/messageModalSlice";

export default function LoadingModal() {
  const { isOpenLoading } = useAppSelector((state) => state.loading);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isOpenLoading}
    >
      <CircularProgress color="inherit" size={50} />
    </Backdrop>
  );
}
