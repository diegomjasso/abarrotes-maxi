import React from "react";
import { Backdrop, CircularProgress, Fade } from "@mui/material";

import "./Components.scss";

const ScreenBlocker = ({ open, message }) => {
  return (
    <Fade in={open}>
      <Backdrop
        open={open}
        className="screen-blocker-backdrop"
      >
        <CircularProgress color="inherit" />
        {message && (
          <div className="screen-blocker-message">
            {message}
          </div>
        )}
      </Backdrop>
    </Fade>
  );
};

export default ScreenBlocker;