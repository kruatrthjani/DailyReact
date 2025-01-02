import { Box, Typography } from "@mui/material";
import {
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  GitHub,
  LinkedIn,
} from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        textAlign: "center",
      }}
    >
      <Box className="flex justify-around border-t border-black w-10/12 mx-auto py-2">
        <Typography className="flex gap-x-3">
          <p>MUI</p>
          <p>React js</p>
          <p>React Daily</p>
        </Typography>
        <Typography className="space-x-2 border-t ">
          <Facebook></Facebook>
          <Instagram></Instagram>
          <Twitter></Twitter>
          <YouTube></YouTube>
          <LinkedIn></LinkedIn>
          <GitHub></GitHub>
        </Typography>
      </Box>
    </Box>
  );
}
