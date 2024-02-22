import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

// ConfirmationDialog component
export const ConfirmationDialog = ({
  handleClickDelete, // Function to handle delete action
}: {
  handleClickDelete: () => void; // Function prop to handle delete action
}) => {
  const [open, setOpen] = React.useState(false); // State to manage dialog open/close

  // Function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      {/* IconButton to trigger the confirmation dialog */}
      <IconButton onClick={handleClickOpen}>
        <Delete color="error" />
      </IconButton>
      {/* Confirmation Dialog */}
      <Dialog
        open={open} // Dialog open state
        onClose={handleClose} // Function to handle dialog close
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography
            color={"error"}
            variant="subtitle1"
            sx={{ fontSize: "18px" }}
          >
            Confirm Deletation
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="body1">
              Are you sure you want to delete this task?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleClickDelete();
              handleClose();
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
