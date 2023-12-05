import React, { useEffect } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { BackEnd } from "../Utils/HttpClient";

const useStyles = makeStyles({
  table: {
    width: "100%",
    height: 600,
    margin: "auto",
  },
});

export default function ProfilePage() {
  return <h2>Profile Page</h2>;
}
