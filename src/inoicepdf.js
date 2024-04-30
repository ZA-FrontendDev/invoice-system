import { useMemo } from "react";
import PropTypes from "prop-types";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { useTheme } from "@mui/material/styles";

const useStyles = () => {
  const theme = useTheme();
  return useMemo(() => {
    return StyleSheet.create({
      page: {
        backgroundColor: "#FFFFFF",
        // padding: 24,
      },
      h4: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1.235,
        marginTop: 60,
      },
      h6: {
        fontSize: 12,
        fontWeight: 600,
        lineHeight: 1.6,
      },
      alignRight: {
        textAlign: "right",
      },
      alignCenter: {
        textAlign: "center",
      },
      subtitle2: {
        fontSize: 10,
        fontWeight: 500,
        lineHeight: 1.57,
      },
      body2: {
        fontSize: 10,
        fontWeight: 400,
        lineHeight: 1,
        marginBottom: 5,
      },
      addtext: {
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 1.43,
      },
      gutterBottom: {
        // marginBottom: 2,
      },
      colorSuccess: {
        color: theme.palette.success.main,
      },
      colorPending: {
        color: theme.palette.warning.main,
      },
      uppercase: {
        textTransform: "uppercase",
      },
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      brand: {
        height: 70,
        width: 170,
        marginTop: 60,
      },
      company: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 32,
      },
      references: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
      },
      footercontainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
      },
      billing: {
        marginTop: 32,
      },
      items: {
        marginTop: 20,
        border: "1px solid #ddd",
        borderRadius: "10px",
      },
      infoContainer: {
        borderRadius: "10px",
        padding: "15px",
        border: "1px solid #ddd",
        marginTop: 20,
      },

      itemRow: {
        borderBottomWidth: 1,
        borderColor: "#EEEEEE",
        borderStyle: "solid",
        flexDirection: "row",
        padding: "5px",
      },
      headerRow: {
        borderBottomWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        flexDirection: "row",
        backgroundColor: "#ddd",
        padding: "3px",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
      },
      rowGap: {
        width: "70%",
      },
      itemNumber: {
        padding: 6,
        width: "15%",
      },
      itemText: {
        padding: 6,
        width: "80%",
      },
      summaryView: {
        marginTop: "7px",
      },
      summaryRow: {
        flexDirection: "row",
      },
      summaryGap: {
        padding: 3,
        width: "70%",
      },
      summaryTitle: {
        padding: 6,
        width: "15%",
      },
      summaryValue: {
        padding: 6,
        width: "15%",
      },
      notes: {
        // marginTop: 32,
        borderBottom: "1px solid #000",
      },
      backgroundTop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
      },

      qrimage: {
        width: 15,
        height: 15,
        marginTop: 10,
      },
      qricontainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      h2: {
        fontSize: 20,
        fontWeight: "extrabold",
        lineHeight: 1.235,
        marginTop: 70,
      },
    });
  }, [theme]);
};

export const InvoicePdfDocument = (props) => {
  const { invoice } = props;
  const styles = useStyles();

  const formatSubTotal = (totalFee) => {
    return totalFee.toFixed(2);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.backgroundTop} source="invoice-bottom.png" />
        <View style={{ padding: 24, paddingBottom: 0 }}>
          <View style={styles.header}>
            <View>
              <Image source="dark-logo.png" style={styles.brand} />
            </View>
            <View>
              <Text style={[styles.h2, styles.uppercase]}>invoice</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.references}>
              <View>
                <Text style={[styles.h6, styles.gutterBottom]}>Invoice to</Text>
                <Text style={styles.body2}>{invoice.invoice_to}</Text>
              </View>
              <View>
                <Text style={[styles.h6, styles.gutterBottom]}>
                  Invoice Number
                </Text>
                <Text style={styles.body2}>{invoice.invoice_number}</Text>
              </View>
            </View>
            <View style={styles.references}>
              <View>
                <Text style={[styles.h6, styles.gutterBottom]}>
                  Billing Currency
                </Text>
                <Text style={styles.body2}>PKR</Text>
              </View>
              <View>
                <Text style={[styles.h6, styles.gutterBottom]}>
                  Date of issue
                </Text>
                <Text style={styles.body2}>{invoice.date_of_issue}</Text>
              </View>
              <View>
                <Text style={[styles.h6, styles.gutterBottom]}>Due Date</Text>
                <Text style={styles.body2}>{invoice.due_date}</Text>
              </View>
              <View>
                <Text style={[styles.h6, styles.gutterBottom]}>
                  Billing Month
                </Text>
                <Text style={styles.body2}>{invoice.billing_month}</Text>
              </View>
            </View>
          </View>
          <View style={styles.items}>
            <View style={styles.headerRow}>
              <View style={styles.itemText}>
                <Text style={styles.h6}>{invoice.package_title}</Text>
              </View>
              <View style={styles.itemNumber}>
                <Text style={[styles.h6, styles.alignRight]}>Amount</Text>
              </View>
            </View>
            <View style={styles.itemRow}>
              <View style={styles.itemText}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    marginBottom: 5,
                    lineHeight: 2,
                  }}
                >
                  {invoice.invoice_detail}
                </Text>
              </View>
              <View style={styles.itemNumber}>
                <Text style={[styles.body2, styles.alignRight]}>
                  {Number(invoice.total).toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={styles.itemRow}>
              <View style={styles.rowGap} />
              <View style={styles.itemNumber}>
                <Text style={[styles.body2, styles.alignCenter]}>Total</Text>
              </View>
              <View style={styles.itemNumber}>
                <Text style={[styles.body2, styles.alignRight]}>
                  {Number(invoice.total).toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={styles.summaryView}>
              {invoice.discount !== 0 && (
                <>
                  <View style={styles.summaryRow}>
                    <View style={styles.summaryGap} />
                    <View style={styles.summaryTitle}>
                      <Text style={styles.body2}>Discount</Text>
                    </View>
                    <View style={styles.summaryValue}>
                      <Text style={[styles.body2, styles.alignRight]}>
                        - {Number(invoice.discount).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.summaryRow}>
                    <View style={styles.rowGap} />
                    <View style={styles.itemNumber}>
                      <Text style={styles.body2}>Sub Total</Text>
                    </View>
                    <View style={styles.itemNumber}>
                      <Text style={[styles.body2, styles.alignRight]}>
                        {formatSubTotal(
                          Number(invoice.total) - Number(invoice.discount)
                        )}
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
        <View style={styles.footercontainer}>
          <View
            style={{
              padding: 20,
              position: "absolute",
              bottom: 40,
              left: 0,
              right: 0,
            }}
          >
            {/* <View style={styles.notes}></View> */}
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 15,
                paddingBottom: 20,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: 1.7,
                    color: "#1A2E5C",
                  }}
                >
                  Terms & Conditions
                </Text>
                <Text style={styles.body2}>
                  Please send payment within 10 days
                </Text>
                <Text style={styles.body2}>of receiving this invoice.</Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    lineHeight: 1.7,
                    marginTop: 5,
                  }}
                >
                  Thank You For Your Business
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: 1.7,
                    color: "#1A2E5C",
                  }}
                >
                  Official Details
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Image
                    source="phone.png"
                    style={{ width: 12, height: 12, marginRight: 3 }}
                  />
                  <Text style={styles.body2}>+971563511722</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Image
                    source="email.png"
                    style={{ width: 12, height: 12, marginRight: 3 }}
                  />
                  <Text style={styles.body2}>info@teknweb.com</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Image
                    source="web.png"
                    style={{ width: 11, height: 11, marginRight: 3 }}
                  />
                  <Text style={styles.body2}>www.teknweb.com</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Image
                    source="location.png"
                    style={{ width: 12, height: 12, marginRight: 3 }}
                  />
                  <Text style={styles.body2}>R 17 Murtaza Town, Airport</Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: 1.7,
                    color: "#1A2E5C",
                  }}
                >
                  Account Details
                </Text>
                {/* <Image style={styles.qrimage} source="invoice-top.png" /> */}
                <Text style={styles.body2}>MUHAMMAD ZAIN AHSAN</Text>
                <Text style={styles.body2}>Meezan Bank-DHA PHASE II EXT</Text>
                <Text style={styles.body2}>Account Number: 01150105470216</Text>
                <Text style={styles.body2}>IBAN: PK02MEZN0001150105470216</Text>
              </View>
            </View>
          </View>
          <Image source="invoice-top.png" />
        </View>
      </Page>
    </Document>
  );
};
