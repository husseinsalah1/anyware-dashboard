import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ConfirmationProps {
  open: boolean;
  handleCancelDelete: () => void;
  handleConfirmDelete: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  open,
  handleCancelDelete,
  handleConfirmDelete,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleCancelDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to perform this action? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelDelete} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirmation;
