import React from "react";
import {
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Link,
  Box,
  Tab,
  Tabs
} from "@material-ui/core";
import { PropTypes } from "prop-types";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 200,
    maxWidth: 400,
    margin: "auto",
  },
});

export default function HomePage() {
  const classes = useStyles();
  
  const precipRows = [
    { cat: 1, range: "none" },
    { cat: 2, range: "trace - .10" },
    { cat: 3, range: ".11 - .25" },
    { cat: 4, range: ".26 - 50" },
    { cat: 5, range: ".51 - .75" },
    { cat: 6, range: ".76 - 1.00" },
    { cat: 7, range: "1.01 - 1.25" },
    { cat: 8, range: "1.26 - 1.50" },
    { cat: 9, range: "1.51 - 2.00" },
    { cat: 10, range: "> 2.00" },
  ];

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx = {{ width: '100%' }}>
    <Grid item xs={20}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        
        <br />
        <br />
        <Typography variant={"h4"} align={"center"} color={"primary"}>
          Salisbury University DoGG
        </Typography>
        <Typography variant={"h5"} align={"center"} color={"primary"}>
          Forecast Contest
        </Typography>
        </Grid>
    
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Rules" {...a11yProps(0)} />
          <Tab label="Scoring" {...a11yProps(1)} />
          <Tab label="Quick Links" {...a11yProps(2)} />
        </Tabs>
      </Box>
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >   
        <CustomTabPanel value={value} index={0}>
        <Grid item xs={15} >
        <Typography variant={"h5"} align={"center"} color={"primary"}>
          Rules
        </Typography>
        <Typography variant={"body"}>
          <b>1.</b> A value for both the high and low temperature must be
          selected
          <br />
          <b>2.</b> A category for the daily total precipitation must be
          selected (Categories outlined below)
          <br />
          <b>3.</b> Each forecast must also state whether there will be any
          snow. Any observation of mixed rain and snow will count as snow. Sleet
          and freezing ran will not count as snow.
          <br />
          <b>4.</b> All forecast must be entered by 5:30 PM on Monday and
          Wednesday.
          <br />
          <b>5.</b> If no forecast is submitted, the average climatological high
          and low for the forecast date will be substituted for your forecast
          and a value corresponding to Category 3 (Based on Salisbury's average
          annual precipitation total divided by 365 will be used)
        </Typography>
        </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
        <Grid item xs={15}>
        <Typography variant={"h5"} align={"center"} color={"primary"}>
          Scoring
        </Typography>
        <Typography variant={"body"}>
          <b>1.</b> Temperature scores are calculated by the number of degrees
          missed for both high and low temperatures
          <br />
          <b>2.</b> Precipitation scores are determined by the number of
          categories missed between the forecast amount and the actual quantity.
          Each category missed is 5 points.
          <br />
          <b>3.</b> If the occurrence or non-occurrence of snow is not
          forecasted correctly, 5 points will be added to the total forecast
          score.
          <br />
          <b>4.</b> The winner in each category will be determined by the lowest
          score for the semester. The top five finishers in each category will
          be entered into our Forecasting Hall of Fame.
        </Typography>
      </Grid>
      </CustomTabPanel>
      < br />
      <CustomTabPanel value={value} index={1}>
      <Grid>
        
    <Typography variant={"h5"} align={"center"} color={"primary"}>
          Categories
      <Table className={classes.table} size={"small"}>
          <TableHead>
            <TableRow>
              <TableCell align={"center"}>
                <b>Category</b>
              </TableCell>
              <TableCell align={"center"}>
                <b>Amount (Liquid Inches)</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {precipRows.map((row) => (
              <TableRow key={row.cat}>
                <TableCell align={"center"} component="th" scope="row">
                  {row.cat}
                </TableCell>
                <TableCell align={"center"}>{row.range}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Typography>
        </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
        <Grid>
        <Typography variant={"h5"} align={"center"} color={"primary"}>
          Quick Links
        </Typography>
        <br />
        <Link href="/forecast" variant="outlined" >
          Make A Forecast
        </Link>
        <br />
        <Link href="/history" variant="outlined" >
          history
        </Link>
        <br />
        <Link href="/standings" variant="outlined" >
          Competition standings
        </Link>
        <br />
        <Link href="/climatology" variant="outlined" >
          history
        </Link>
        </Grid>
        </CustomTabPanel>
    </Grid>
    </Box>
  );
}
