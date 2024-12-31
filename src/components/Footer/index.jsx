import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        backgroundColor: "gray",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{ fontFamily: "Raleway, Arial" }}
        className="text-blue-600"
      >
        Mui
      </Typography>
    </Box>
  );
}
