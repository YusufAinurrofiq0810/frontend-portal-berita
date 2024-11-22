import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ReactNode, useState } from "react";

export type propsDialog = {
  open: boolean;
  title: string;
  desc: string;
  onClose: () => void;
  action?: () => void;
  withButtons: boolean;
  children?: ReactNode;
};

export default function CustomDialog({
  open,
  children,
  desc,
  title,
  onClose,
  action,
  withButtons,
}: propsDialog) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={"md"} fullWidth={true}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{desc}</DialogContentText>
        {children}
      </DialogContent>
      {withButtons ? (
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={action}>Save</Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
}
