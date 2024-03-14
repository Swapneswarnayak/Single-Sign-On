import React, { useEffect, useState } from "react";
// PrintableTable.js
import { forwardRef } from "react";
import {
  Box,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { SdCardSharp } from "@mui/icons-material";
import axios from "axios";
import { BACKEND_BASE_URL } from "@/config";

type Props = {};

const PrintPermission = forwardRef((props: any, ref) => {
  const [empData, setEmpData] = useState<any>([]);
  const { empId, hospital, DrName, alltests, hospitalDATA, FILE_num } = props;

  function getTodaysDate() {
    var today = new Date();

    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    var formattedDay = day < 10 ? "0" + day : day;
    var formattedMonth = month < 10 ? "0" + month : month;
    return formattedDay + "/" + formattedMonth + "/" + year;
  }

  var currentDate = getTodaysDate();
  var currentyear = currentDate.split("/");
  const shortenedFileId = FILE_num?.slice(0, 5);
  const getEmpData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/medical/getEmployee/${empId}`
    );

    let result = res.data.data;
    setEmpData([result]);
  };

  function getHospitalEmail(allHospitals: any, singlehospital: any) {
    for (let hospital of allHospitals) {
      if (hospital.name === singlehospital) {
        return hospital.email;
      }
    }

    return null;
  }

  const EMAIL_ID = getHospitalEmail(hospitalDATA, hospital);

  useEffect(() => {
    getEmpData();
  }, [empId]);

  return (
    <Box ref={ref}>
      <Container
        sx={{ width: "100%", mr: "48prem" }}
        className="print-container"
      >
        {!empData ? (
          <p>Loading</p>
        ) : (
          empData?.map((data: any) => {
            return (
              <Box sx={{ paddingLeft: "60px" }} key={data._id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "8px 20px",
                    fontSize: "12px",
                    textAlign: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    // mt: 100,
                  }}
                >
                  <Typography
                    sx={{ fontWeight: "bold", textDecoration: "underline" }}
                  >
                    {`${`File No ${shortenedFileId}  ${currentyear[2]}-Admin.IV`}`}
                  </Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {" "}
                    Union Public Service Commission
                  </Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {" "}
                    (Sangh Lok Seva Ayog)
                  </Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {" "}
                    Dholpur House, Shahjahan Road
                  </Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {" "}
                    New Delhi
                  </Typography>
                </Box>

                <Box p={1} display={"flex"} flexDirection={"column"} gap={2}>
                  <Box display={"flex"} flexDirection={"column"} gap={1}>
                    <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                      To
                    </Typography>
                    <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                      {`${hospital}`}
                      <br />
                    </Typography>
                    <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                      {` Subject: Permission for ${alltests}
                AND PSA AS PER PRESCRIPTION (as prescrbed by ${DrName} AND
                ENDORSED BY ${DrName} CGHS DT.${currentDate})(with credit facilty) in
                respect of ${data.name}, ${data.designation}, UPSC`}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                      {` ${data.name} may please be provided with necessary Test Function(with credit facility) in accordance with status of the government Service whose particulars are given below`}
                    </Typography>
                  </Box>

                  <Box>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Typography
                              sx={{ fontSize: "12px", fontWeight: "500" }}
                            >
                              1. Entitlement
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              sx={{ fontSize: "12px", fontWeight: "500" }}
                            >
                              {`${data.entitlement}`}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography
                              sx={{ fontSize: "12px", fontWeight: "500" }}
                            >
                              2. Basic Pay
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {" "}
                            <Typography
                              sx={{ fontSize: "12px", fontWeight: "500" }}
                            >
                              {`${data.basic_pay}`}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography
                              sx={{ fontSize: "12px", fontWeight: "500" }}
                            >
                              3. CGHS Card No
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {" "}
                            <Typography
                              sx={{ fontSize: "12px", fontWeight: "500" }}
                            >
                              {`${data.CGHS_card_number}`}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            {" "}
                            <Typography
                              sx={{ fontSize: "12px", fontWeight: "500" }}
                            >
                              4. Validity of CGHS Card/AMA
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {" "}
                            <Typography
                              sx={{ fontSize: "12px", fontWeight: "500" }}
                            >
                              {`${data.validity_date}`}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            {" "}
                            <Typography
                              sx={{ fontSize: "12px", fontWeight: "500" }}
                            >
                              5. Dispensary to which attached
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {" "}
                            <Typography
                              sx={{ fontSize: "12px", fontWeight: "500" }}
                            >
                              {`${data.dispensary_to_which_attached_ama}`}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: "12px" }}>
                      Necessary bill not exceding CGHS approved rates(AIIMS
                      rates(AIIMS rates, if CGHS rates unavailable) along with
                      the essentiality certificate(in duplicate duly verified)
                      excluding diet charges may be sent to the secretary, UPSC
                      within 180 days of the dt. of bill/discharge for payment.)
                    </Typography>
                    <Typography
                      sx={{ fontSize: "12px", fontWeight: "500", pt: 1 }}
                    >
                      Validity of this letter is for three months from the data
                      of issue of this letter
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "0px 20px",
                      fontSize: "12px",
                      textAlign: "center",
                      alignItems: "end",
                      flexDirection: "column",
                      // mt: 100,
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      Yours Faithfully
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {" "}
                      Under Secrerary(Admin-IV)
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {" "}
                      Ph. No 23098550/23381
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: "12px" }}>
                      copy to: -
                    </Typography>
                    <Typography
                      sx={{ fontSize: "12px", fontWeight: "500", pt: 1 }}
                    >
                      {`1. ${data.name}, UPSC, Saction
                4944/7303206866 for information. Necessary Medicine may be
                proved from the CGHS Dispensary. Cost of medicines purchased
                during OPD treatment is not reimburable under the CGHS rules.
                Claim papers may be submitted within 180 days.`}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "12px", fontWeight: "500", pt: 1 }}
                    >
                      2. Email ID -{`${data.email_id}`}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "12px", fontWeight: "500", pt: 1 }}
                    >
                      3. Hospital Email ID: - {`${EMAIL_ID}`}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "0px 20px",
                      fontSize: "12px",
                      textAlign: "center",
                      alignItems: "end",
                      flexDirection: "column",
                      // mt: 100,
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      Yours Faithfully
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {" "}
                      Under Secrerary(Admin-IV)
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {" "}
                      Ph. No 23098550/23381
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      sx={{ fontSize: "12px", fontWeight: "500", pt: 1 }}
                    >
                      This is a computer-generated document. No signature is
                      required.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })
        )}
      </Container>
    </Box>
  );
});

PrintPermission.displayName = "PrintPermission";

export default PrintPermission;
