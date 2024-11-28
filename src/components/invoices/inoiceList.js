import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TableBody,
  Typography,
  IconButton,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateInvoice from "./createInvoice";

export const InvoiceList = () => {
  const [modal, setModal] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    setInvoices(savedInvoices);
  }, []);

  const saveInvoicesToLocalStorage = (invoices) => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  };

  const createInvoice = (newInvoice) => {
    const updatedInvoices = [...invoices, newInvoice];
    setInvoices(updatedInvoices);
    saveInvoicesToLocalStorage(updatedInvoices);
  };

  const handleEdit = (id) => {
    console.log("Edit invoice", id);
  };

  const handleDelete = (id) => {
    const updatedInvoices = invoices.filter((inv) => inv.id !== id);
    setInvoices(updatedInvoices);
    saveInvoicesToLocalStorage(updatedInvoices);
  };

  const handleView = (id) => {
    console.log("View invoice", id);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loginTime");
    navigate("/"); // Redirect to login page
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
      <Container maxWidth="xl">
        <Stack spacing={{ xs: 3, lg: 4 }}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Typography variant="h4">{"Invoice's List"}</Typography>

            <Button
              onClick={() => {
                setModal(true);
              }}
              variant="contained"
              sx={{ backgroundColor: "#1A4870" }}
            >
              Create Invoice
            </Button>
          </Stack>
          <Card>
            <CardContent>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Company Name</TableCell>
                      <TableCell>Package Title</TableCell>
                      <TableCell>Invoice Number</TableCell>
                      <TableCell>Billing Month</TableCell>
                      <TableCell>Total Price</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoices.map((invoice, index) => (
                      <TableRow key={invoice.id || index}>
                        <TableCell>{invoice.invoice_to}</TableCell>
                        <TableCell>{invoice.package_title}</TableCell>{" "}
                        <TableCell>{invoice.invoice_number}</TableCell>
                        <TableCell>{invoice.billing_month}</TableCell>
                        <TableCell>{invoice.total}</TableCell>
                        {/* New Data */}
                        <TableCell>
                          <IconButton onClick={() => handleEdit(invoice.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(invoice.id)}>
                            <DeleteIcon />
                          </IconButton>
                          <IconButton onClick={() => handleView(invoice.id)}>
                            <VisibilityIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Logout Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              onClick={logout}
              sx={{ backgroundColor: "#1A4870" }}
            >
              Logout
            </Button>
          </Box>
        </Stack>
      </Container>

      {modal && (
        <CreateInvoice
          modal={modal}
          onCancel={() => setModal(false)}
          onConfirm={(newInvoice) => {
            createInvoice(newInvoice);
            setModal(false); // Close the modal after creating an invoice
          }}
        />
      )}
    </Box>
  );
};
