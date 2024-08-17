import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

type PropsType = {
  isOpen: boolean;
  title?: string;
  message?: string;
  handleNo?: () => void;
  handleYes?: () => void;
};

export default function ResponsiveDialog(props: PropsType) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.isOpen}
      onClose={props.handleNo}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleNo}>
          No
        </Button>
        <Button onClick={props.handleYes} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
