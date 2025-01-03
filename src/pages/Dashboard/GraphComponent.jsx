import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/joy/CircularProgress";
export default function GraphGraphComponent({ text, value }) {
  return (
    <Box className="rounded-md bg-slate-100 flex  w-3/12 p-2 justify-between ">
      <Typography className="" sx={{ fontWeight: 600 }}>
        {text}
      </Typography>

      <CircularProgress
        size="lg"
        determinate
        value={value}
        color={
          value > 70
            ? "success"
            : value > 30 && value < 70
            ? "primary"
            : "danger"
        }
      >
        {value}
      </CircularProgress>
    </Box>
  );
}
