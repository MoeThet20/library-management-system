import * as React from "react";
import { Box, CircularProgress } from "@mui/material";

type LoadingProps = {
  size?: number;
};

export default function Loading(props: LoadingProps) {
  const { size = 40 } = props;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
}
