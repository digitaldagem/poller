import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Box,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles({
  row: {
    fontWeight: "bold",
  },
});

const TableCellBody = withStyles({
  root: {
    borderBottom: "none",
  },
})(TableCell);

const PollingOutputTable = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [pollings, setPollings] = useState([]);
  const [urlName] = useState(props.urlName);

  useEffect(() => {
    let apiCall = async () => {
      let response = await axios.get(
        "http://localhost:8080/pollings/" + urlName
      );
      return response.data;
    };
    apiCall()
      .then((result) => {
        console.log(result.url);
        setPollings(result);
        setUrl(result.url);
      })
      .then(() => setLoading(false));
  }, [urlName]);

  const refreshList = () => {
    axios.get("http://localhost:8080/pollings/" + urlName).then((response) => {
      setPollings(response.data);
    });
  };

  return !loading ? (
    <Grid container justifyContent="center">
      <Grid item xs={6}>
        <Box paddingTop={5}>
          <h3 align="center">
            <span style={{ float: "left" }} onClick={() => props.setNavigation("urlOutput")}>
              <HomeIcon />
            </span>
            {url}
            <span style={{ float: "right" }} onClick={() => refreshList()}>
              <RefreshIcon />
            </span>
          </h3>
        </Box>
        <Box paddingTop={2}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    className={classes.row}
                    onClick={() => props.setToggle(true)}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.row}
                    onClick={() => props.setToggle(true)}
                  >
                    Timestamp
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pollings.pollingResponseDTOList.map((polling, i) => (
                  <TableRow key={i}>
                    <TableCellBody component="th" scope="row" align="center">
                      {polling.status === 200 ? (
                        <span style={{ color: "green" }}>{polling.status}</span>
                      ) : (
                        <span style={{ color: "red" }}>{polling.status}</span>
                      )}
                    </TableCellBody>
                    <TableCellBody component="th" scope="row" align="center">
                      {polling.timestamp.toString().substring(0, 10) +
                        " " +
                        polling.timestamp.toString().substring(11, 19)}
                    </TableCellBody>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </Grid>
  ) : (
    <Grid container justify="center">
      <Grid item>
        <Box paddingTop={5}>
          <LinearProgress />
          <h3>Loading...</h3>
          <LinearProgress />
        </Box>
      </Grid>
    </Grid>
  );
};

export default PollingOutputTable;
