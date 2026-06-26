import { Delete } from "@mui/icons-material";
import { Avatar, Box, Grid, IconButton, Rating } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

function ReviewCard() {
  return (
    <div className="flex justify-between ">
      <Grid container spacing={9}>
        <Grid size={{ xs: 1 }}>
          <Box>
            <Avatar
              className="text-white"
              sx={{
                width: 56,
                height: 56,
                bgcolor: "#9155FD", // FIXED COLOR
              }}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 9 }}>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-lg">ShipSite</p>
              <p className="opacity-70">Men Black Shirt</p>
            </div>
          </div>
          <Rating readOnly value={4} precision={1} />
          <p>Value for money product, great product</p>
          <div>
            <img
              className="w-24 h-24 object-cover mt-2"
              src="https://rukminim2.flixcart.com/fk-p-flap/760/1020/image/ab5af977827d4c14.png?q=60"
              alt=""
            />
          </div>
        </Grid>
      </Grid>
      <div>
        <IconButton>
          <Delete sx={{ color: red[700] }} />
        </IconButton>
      </div>
    </div>
  );
}

export default ReviewCard;
