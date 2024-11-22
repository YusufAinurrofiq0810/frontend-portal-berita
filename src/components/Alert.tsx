import { AlertProps, Alert, Snackbar } from "@mui/material";

export default function CustomAlert({
  open,
  severity,
  message,
  onClose,
}: {
  open: boolean;
  severity: "success" | "info" | "warning" | "error";
  message: string;
  onClose: () => void;
}) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: "100%",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
