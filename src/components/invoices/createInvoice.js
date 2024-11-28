import {
  Card,
  CardContent,
  Dialog,
  Grid,
  Stack,
  TextField,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useFormik } from "formik";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoicePdfDocument } from "../../inoicepdf";

let today = new Date();
let formattedDate =
  today.getFullYear() +
  "-" +
  String(today.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(today.getDate()).padStart(2, "0");

const InvoiceInitialValues = {
  invoice_to: "",
  invoice_number: "",
  date_of_issue: formattedDate,
  due_date: formattedDate,
  billing_month: "",
  package_title: "",
  invoice_detail: "",
  total: "",
  discount: "",
};

const CreateInvoice = ({ modal, onCancel, onConfirm }) => {
  const formik = useFormik({
    initialValues: InvoiceInitialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      onConfirm({ id: Date.now(), ...values }); // Pass the invoice data to onConfirm
    },
  });

  return (
    <Dialog fullWidth maxWidth="lg" onClose={onCancel} open={modal}>
      <form onSubmit={formik.handleSubmit}>
        <Card sx={{ padding: 4, position: "relative" }}>
          <IconButton
            aria-label="close"
            onClick={onCancel}
            sx={{ position: "absolute", right: 16, top: 16 }}
          >
            <CloseIcon />
          </IconButton>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Stack direction="row" spacing={3}>
                  <TextField
                    label="Invoice To"
                    name="invoice_to"
                    fullWidth
                    value={formik.values.invoice_to}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    label="Invoice Number"
                    fullWidth
                    name="invoice_number"
                    value={formik.values.invoice_number}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    label="Date"
                    name="date_of_issue"
                    type="date"
                    fullWidth
                    value={formik.values.date_of_issue}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    label="Due Date"
                    name="due_date"
                    type="date"
                    fullWidth
                    value={formik.values.due_date}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    label="Billing Month"
                    name="billing_month"
                    fullWidth
                    value={formik.values.billing_month}
                    onChange={formik.handleChange}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Invoice Information</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack direction="column" spacing={3}>
                  <TextField
                    label="Package Title"
                    name="package_title"
                    fullWidth
                    value={formik.values.package_title}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    label="Invoice Detail"
                    name="invoice_detail"
                    fullWidth
                    multiline
                    rows={4}
                    value={formik.values.invoice_detail}
                    onChange={formik.handleChange}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack direction="column" spacing={3}>
                  <TextField
                    label="Total"
                    name="total"
                    fullWidth
                    value={formik.values.total}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    label="Discount"
                    name="discount"
                    fullWidth
                    value={formik.values.discount}
                    onChange={formik.handleChange}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <PDFDownloadLink
              document={<InvoicePdfDocument invoice={formik.values} />}
              fileName="invoice.pdf"
              style={{ textDecoration: "none" }}
            >
              <Button
                color="primary"
                variant="contained"
                sx={{ backgroundColor: "#1A4870", marginRight: 10 }}
              >
                Download Invoice
              </Button>
            </PDFDownloadLink>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              sx={{ backgroundColor: "#1A4870" }}
            >
              Save Invoice
            </Button>
          </Grid>
        </Card>
      </form>
    </Dialog>
  );
};

export default CreateInvoice;
