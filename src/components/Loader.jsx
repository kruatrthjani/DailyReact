import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";
export default function Loader() {
  return (
    <Box className="flex items-center flex-col">
      <Typography className="font-bold">Loading data...</Typography>
      <CircularProgress />
    </Box>
  );
}
