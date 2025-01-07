import { Box, Typography } from "@mui/material";
import ErrorOutlineTwoToneIcon from "@mui/icons-material/ErrorOutlineTwoTone";
import GenericImage from "../../public/GenerixError.png";
export default function Error({ data }) {
  const errordata = JSON.parse(data);

  let message = "";
  console.log(errordata);
  if (errordata.statuscode === 404 || errordata.statuscode === "404") {
    message = "required page is not found";
  } else if (errordata.statuscode === 401 || errordata.statuscode === "401") {
    message = "unauthorized acces to this page for current user";
  } else if (errordata.statuscode === 403 || errordata.statuscode === "403") {
    message = "access is forbidden to user";
  } else if (errordata.statuscode === 405 || errordata.statuscode === "405") {
    message =
      " the request's HTTP method is not supported on the server or the resource itself";
  } else if (errordata.statuscode === 0 || errordata.statuscode === "0") {
    message = "server response is not properly fetched";
  } else if (errordata.statuscode === 500 || errordata.statuscode === "500") {
    message = "it happended due to internal server error";
  } else if (errordata.statuscode === 301 || errordata.statuscode === "301") {
    message = "page is moved to new loaction permenantly";
  } else if (errordata.statuscode === 302 || errordata.statuscode === "302") {
    message = "page is moved to new loaction temperorily";
  } else if (errordata.statuscode === 304 || errordata.statuscode === "304") {
    message = "failed to receive updated data";
  } else if (errordata.statuscode === 504 || errordata.statuscode === "504") {
    message = "Server timeout try again later";
  } else if (errordata.statuscode === 501 || errordata.statuscode === "501") {
    message = "Unable to fulfill request";
  } else if (errordata.statuscode === 502 || errordata.statuscode === "502") {
    message = "The server does not respond";
  } else if ((errordata.statuscode = 503 || errordata.statuscode === "503")) {
    message = "unable to handle request due to high traffic";
  }

  return (
    <Box className="flex justify-center gap-x-2  flex-col items-center h-screen ">
      <img src={GenericImage} width={500} height={500} />
      <Typography sx={{ fontSize: "30px", color: "blue" }}>
        Something went wrong here
        <ErrorOutlineTwoToneIcon />
      </Typography>
      <Typography sx={{ fontSize: "20px", color: "blue" }}>
        {message}
      </Typography>
    </Box>
  );
}
