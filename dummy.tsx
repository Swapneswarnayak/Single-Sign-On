// "use client";
// import { Fragment, useEffect, useState } from "react";
// import axios from "axios";
// import dayjs from "dayjs";

// import {
//   Box,
//   Button,
//   Divider,
//   Grid,
//   MenuItem,
//   Select,
//   Stack,
//   Typography,
// } from "@mui/material";
// import PageContainer from "../../components/container/PageContainer";
// import DashboardCard from "../../components/shared/DashboardCard";
// import DashboardNew from "../../components/shared/DashboardNew";
// import styled from "@emotion/styled";
// import CustomTextField from "../../components/forms/theme-elements/CustomTextField";
// import { useAuth } from "@/context/JWTContext/AuthContext.provider";
// import { useRouter } from "next/navigation";
// // import { AUTHORITY_FIELDS } from "@/constants/authorityConstants"

// const AUTHORITY_FIELDS = [
//   {
//     id: "vendor_name",
//     fieldName: "Vendor Name",
//     type: "select",
//   },
//   {
//     id: "authority_name",
//     fieldName: "Authority Name",
//     type: "input",
//   },
//   {
//     id: "status",
//     fieldName: "Status",
//     type: "select",
//     selectOptions: ["Active", "Inactive"],
//   },
//   {
//     id: "expiryDate",
//     fieldName: "Expiry Date",
//     type: "date",
//   },
// ];

// const requiredField = {
//   color: "red",
//   marginRight: "4px",
// };

// // STYLES
// const ButtonWrapper = styled("div")(() => ({
//   marginTop: "25px",
//   textAlign: "center",
// }));

// const SubHeading = styled(Typography)(() => ({
//   color: "#233791",
//   fontWeight: 500,
//   marginBottom: "20px",
// }));

// const initialFieldState: any = {};
// // Creates an initial state object (uses 'id')
// for (let arrEl of AUTHORITY_FIELDS) {
//   if (!initialFieldState[arrEl.id]) initialFieldState[arrEl.id] = "";
// }

// // Syncs vendor list with B.E.
// let syncVendorList = 0;

// const AddAuthorites = () => {
//   const auth = useAuth();
//   const router = useRouter();
//   const [authorityFields, setAuthorityFields] = useState(initialFieldState);
//   const [vendorList, setVedorList] = useState([]);
//   const [associationVendor, setAssociationVendor] = useState("");
//   const isVendorValid = associationVendor.trim() !== "";
//   const [authorityCode, setAuthorityCode] = useState("");
//   const [file, setFile] = useState<any>({});

//   const handleAddVendor = async () => {
//     try {
//       const res = await axios.post(
//         "http://172.16.15.49:8501/api/association/create",
//         { vendor: associationVendor }
//       );
//       alert(res.data.message);
//     } catch (e: any) {
//       console.log(`Error Message::::::::::`, e);
//     }
//     getData();
//     setAssociationVendor("");
//     syncVendorList += 1;
//   };

//   // Sends a POST req to add an authority
//   // const handleAddAuthority = async () => {
//   //   try {
//   //     console.log(authorityFields);

//   //     if (file?.size / 1000000 <= 5 && file.type === "application/pdf") {
      
//   //       let formData: any = { ...authorityFields, authority_letter: file };
//   //       const res = await axios.post(
//   //         "http://172.16.15.49:8501/api/authorities/create",
//   //         formData,
//   //         {
//   //           headers: {
//   //             "Content-Type": "multipart/form-data",
//   //           },
//   //         }
//   //       );
//   //       const data = res.data;
//   //       alert(data.message);
//   //       setAuthorityCode(data.authority.unique_code);
//   //       setAuthorityFields(initialFieldState);
//   //       setFile("");
//   //     } else {
//   //       alert(
//   //         "File size should be less than 5MB and it should be in PDF format"
//   //       );
//   //       setFile("");
//   //     }
//   //   } catch (e: any) {
//   //     console.log("error---------------------", e);
//   //   }
//   // };



//   const handleAddAuthority = async () => {
//     try {
//       // Validate if all fields are filled
//       for (const field of AUTHORITY_FIELDS) {
//         if (!authorityFields[field.id]) {
//           alert("All fields are mandatory!");
//           return;
//         }
//       }

//       // Validate if a PDF file is selected
//       if (!file) {
//         alert("Please upload a PDF file");
//         return;
//       }

//       // Validate file size and type
//       if (file?.size / 1000000 > 5 || file.type !== "application/pdf") {
//         alert("File size should be less than 5MB, and it should be in PDF format");
//         setFile(null);
//         return;
//       }

//       // Prepare formData for API call
//       let formData = new FormData();
//       formData.append("authority_letter", file);
//       for (const key in authorityFields) {
//         formData.append(key, authorityFields[key]);
//       }

//       // Make the API call
//       const res = await axios.post(
//         "http://172.16.15.49:8501/api/authorities/create",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       const data = res.data;
//       alert(data.message);
//       setAuthorityCode(data.authority.unique_code);
//       setAuthorityFields(initialFieldState);
//       setFile(null);
//     } catch (error) {
//       console.error("Error adding authority:", error);
//     }
//   };


//   // Updates field values
//   const handleFieldChange = (e: any) => {
//     setAuthorityFields((prevState: any) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const getData = async () => {
//     const vendorArr: any = [];

//     try {
//       let res = await axios.get("http://172.16.15.49:8501/api/association/getAll");
//       setVedorList(res.data.association);
//     } catch (e: any) {
//       console.log(e.message);
//     }
//   };

//   // Fetch vendor list
//   // useEffect(() => {
//   //   getData();
//   // }, []);

//   useEffect(() => {
//     if (
//       !auth.user
//     ) {
//       router.push("/");
//     }
//   }, [auth, router]);

//   return (
//     <PageContainer title="Add Authorities" description="Add authorities here!">
//       <DashboardNew title="Add Vendor" titleVariant="h3">
//         <>
//           <Box mt="10px">
//             <SubHeading variant="h3">Association</SubHeading>
//             <Stack>
//               <Typography
//                 fontWeight={600}
//                 component="label"
//                 variant="subtitle1"
//                 mb="5px"
//                 mt="5px"
//               >
//                 Vendor Name<span style={requiredField}>*</span>
//               </Typography>
//               <CustomTextField
//                 name="add_vendor"
//                 value={associationVendor}
//                 onChange={(e: any) => setAssociationVendor(e.target.value)}
//               />
//             </Stack>
//             <ButtonWrapper>
//               <Button
//                 color="primary"
//                 variant="contained"
//                 size="small"
//                 sx={{ borderRadius: "4px", mt: "-15px", ml: "900px" }}
//                 // sx={{ width: { xs: "100%", sm: "400px" }, mr:'0px' }}
//                 onClick={handleAddVendor}
//                 disabled={!isVendorValid}
//               >
//                 ADD
//               </Button>
//             </ButtonWrapper>
//           </Box>
//           <Divider
//             role="presentation"
//             variant="middle"
//             sx={{ marginTop: "10px" }}
//           />
//           <Box mt="15px">
//             <SubHeading variant="h3">Add Authorities</SubHeading>
//             <Stack>
//               {AUTHORITY_FIELDS.map((field, i) => (
//                 <Fragment key={field.id}>
//                   <Typography
//                     fontWeight={600}
//                     component="label"
//                     variant="subtitle1"
//                     mb="5px"
//                     mt="5px"
//                   >
//                     {field.fieldName}
//                     <span style={requiredField}>*</span>
//                   </Typography>
//                   {field.type === "select" ? (
//                     <Select
//                       style={{ height: "30px" }}
//                       name={field.id}
//                       // defaultValue={field?.selectOptions?.[0]}
//                       value={Object.values(authorityFields)[i]}
//                       onChange={handleFieldChange}
//                     >
//                       {field.id === "vendor_name"
//                         ? vendorList.map((ven: any, i: any) => (
//                             <MenuItem key={ven._id} value={ven.vendor}>
//                               {ven.vendor}
//                             </MenuItem>
//                           ))
//                         : field?.selectOptions?.map((option, i) => (
//                             <MenuItem key={`${field.id}+${i}`} value={option}>
//                               {option}
//                             </MenuItem>
//                           ))}
//                     </Select>
//                   ) : (
//                     <CustomTextField
//                       type={field.type}
//                       name={field.id}
//                       value={Object.values(authorityFields)[i]}
//                       onChange={handleFieldChange}
//                     />
//                   )}
//                 </Fragment>
//               ))}
//               <Fragment>
//                 <Typography
//                   fontWeight={600}
//                   component="label"
//                   variant="subtitle1"
//                   mb="5px"
//                   mt="25px"
//                 >
//                   Authority Letter
//                   <span style={requiredField}>*</span>
//                 </Typography>
//                 <CustomTextField
//                   type="file"
//                   name="authority_letter"
//                   onChange={(e: any) => setFile(e.target.files[0])}
//                 />
//               </Fragment>
//             </Stack>

//             {/* <ButtonWrapper>
//               <Button
//                 color="primary"
//                 variant="contained"
//                 size="large"
//                 sx={{ width: { xs: "100%", sm: "400px" } }}
//                 onClick={handleAddAuthority}
//               >
//                 GET
//               </Button>
//             </ButtonWrapper>
//             <Box
//               mt="25px"
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 textAlign: "center",
//               }}
//             >
//               <Typography
//                 fontWeight={700}
//                 sx={{
//                   border: "2px solid #556cd6",
//                   color: "#556cd6",
//                   width: { xs: "100%", sm: "400px" },
//                   padding: "11px",
//                   borderRadius: "4px",
//                 }}
//               >
//                 {authorityCode
//                   ? `Code: ${authorityCode}`
//                   : "Enter details to generate code"}
//               </Typography>
//             </Box> */}

//             <Grid container spacing={2}>
//               {/* GET Button */}
//               <Grid item xs={12} sm={6}>
//                 <Button
//                   color="primary"
//                   variant="contained"
//                   size="large"
//                   sx={{
//                     width: { xs: "100%", sm: "400px" },
//                     mt: "25px",
//                     ml: "30px",
//                   }}
//                   onClick={handleAddAuthority}
//                 >
//                   GET
//                 </Button>
//               </Grid>

//               {/* Code Display */}
//               <Grid item xs={12} sm={6}>
//                 <Box
//                   mt="25px"
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     textAlign: "center",
//                   }}
//                 >
//                   <Typography
//                     fontWeight={700}
//                     sx={{
//                       border: "2px solid #556cd6",
//                       color: "#556cd6",
//                       width: { xs: "100%", sm: "400px" },
//                       padding: "9px",
//                       borderRadius: "4px",
//                       mr: "30px",
//                     }}
//                   >
//                     {authorityCode
//                       ? `Code: ${authorityCode}`
//                       : "Enter details to generate code"}
//                   </Typography>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Box>
//         </>
//       </DashboardNew>
//     </PageContainer>
//   );
// };

// export default AddAuthorites;
