import { Typography } from "@mui/material";
import React from "react";

function CopyRight(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      // position="fixed"
      // bottom={20}
      align="center"
      // width="100%"
      {...props}
    >
      {"Copyright © "}
      Library Management System {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default CopyRight;
