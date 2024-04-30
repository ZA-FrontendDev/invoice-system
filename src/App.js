import "./App.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useFormik } from "formik";
import { InvoicePdfDocument } from "./inoicepdf";
import { useEffect } from "react";
let today = new Date();
let formattedDate =
  today.getFullYear() +
  "-" +
  String(today.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(today.getDate()).padStart(2, "0");
export const InvoiceInitialValues = {
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
function App() {
  const formik = useFormik({
    initialValues: InvoiceInitialValues,
    enableReinitialize: true,
    onSubmit: async (values, helpers) => {},
  });
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <form>
          <Container maxWidth={"xl"}>
            <Stack
              spacing={{
                xs: 3,
                lg: 4,
              }}
            >
              <Box sx={{ mb: 4 }} display="flex">
                <Typography variant="h4">INVOICE</Typography>
              </Box>
              <Card>
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
                    {/* Invoice Fields */}
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
                          InputLabelProps={{ shrink: true }}
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
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <PDFDownloadLink
                        document={
                          <InvoicePdfDocument invoice={formik.values} />
                        }
                        fileName={"zain"}
                        style={{ textDecoration: "none" }}
                      >
                        <Button color="primary" variant="contained">
                          Download Invoice
                        </Button>
                      </PDFDownloadLink>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Stack>
          </Container>
        </form>
      </Box>
    </>
  );
}
export default App;
