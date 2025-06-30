import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Pagination,
  Box
} from "@mui/material";
import { DeleteOutline, Email } from "@mui/icons-material";

const Subscription = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [emailToDelete, setEmailToDelete] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchSubscribers();
  }, [currentPage]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://healthstory.net.in/api/subscribers?page=${currentPage}&limit=${itemsPerPage}`
      );
      
      // Handle both array and object responses
      let subscribersData = [];
      let totalCount = 0;
      
      if (Array.isArray(response.data)) {
        // If API returns just an array
        subscribersData = response.data;
        totalCount = response.data.length;
      } else if (response.data && response.data.subscribers) {
        // If API returns an object with subscribers and totalCount
        subscribersData = response.data.subscribers;
        totalCount = response.data.totalCount || response.data.subscribers.length;
      } else {
        // Fallback for unexpected formats
        subscribersData = response.data ? [response.data] : [];
        totalCount = subscribersData.length;
      }
      
      setSubscribers(subscribersData);
      setTotalPages(Math.ceil(totalCount / itemsPerPage));
      setError(null);
    } catch (error) {
      console.error("Failed to fetch subscribers", error);
      setError("Failed to fetch subscribers. Please try again later.");
      setSubscribers([]); // Ensure subscribers is always an array
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribeClick = (email) => {
    setEmailToDelete(email);
    setOpenDialog(true);
  };

  const handleUnsubscribeConfirm = async () => {
    try {
      await axios.delete(`https://healthstory.net.in/api/unsubscribe/${emailToDelete}`);
      // Optimistic UI update
      setSubscribers(prev => prev.filter((sub) => sub.email !== emailToDelete));
      
      // If the last item on the page was deleted, go to previous page
      if (subscribers.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else {
        fetchSubscribers(); // Refresh data to maintain pagination
      }
    } catch (error) {
      console.error("Unsubscribe failed", error);
      setError("Failed to unsubscribe. Please try again.");
      fetchSubscribers(); // Refresh to restore correct state
    } finally {
      setOpenDialog(false);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, maxWidth: "100%", overflow: "hidden" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Email color="primary" sx={{ fontSize: 32, mr: 2 }} />
        <Typography variant="h5" component="h1" color="primary">
          Subscriber Management
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ py: 2 }}>
          {error}
        </Typography>
      ) : !subscribers || subscribers.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ py: 2 }}>
          No subscribers found.
        </Typography>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="subscribers table">
              <TableHead>
                <TableRow sx={{ bgcolor: "primary.light" }}>
                  <TableCell sx={{ color: "common.white", fontWeight: "bold" }}>
                    Email Address
                  </TableCell>
                  <TableCell
                    sx={{ color: "common.white", fontWeight: "bold", width: "150px" }}
                    align="right"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscribers.map((subscriber) => (
                  <TableRow
                    key={subscriber.email}
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {subscriber.email}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteOutline />}
                        onClick={() => handleUnsubscribeClick(subscriber.email)}
                        size="small"
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove <strong>{emailToDelete}</strong> from the subscribers list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleUnsubscribeConfirm}
            color="error"
            variant="contained"
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Subscription;