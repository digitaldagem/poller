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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Link } from "react-router-dom";

import PollingOutputTable from "./pollingOutputTable";
import UrlEditForm from "./urlEditForm";

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

const BlackAddCircleOutlineIcon = withStyles({
  root: {
    color: "black",
  },
})(AddCircleOutlineIcon);

const UrlOutputByNameTable = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [navigation, setNavigation] = useState("urlOutput");
  const [urls, setUrls] = useState([]);
  const [urlName, setUrlName] = useState("");
  const [urlId, setUrlId] = useState(0);

  useEffect(() => {
    let apiCall = async () => {
      let response = await axios.get("http://localhost:8080/urls");
      return response.data;
    };
    apiCall().then((result) => {
      setUrls(result);
      setLoading(false);
    });
  }, []);

  const deleteUrl = (urlId) => {
      setLoading(true);
    axios.delete("http://localhost:8080/urls/" + urlId).then((response) => {
      if (response) {
        axios.get("http://localhost:8080/urls").then((response) => {
          setUrls(response.data);
          setLoading(false);
        });
      }
    });
  };

  const goToPollingData = (urlName) => {
    setUrlName(urlName);
    setNavigation("pollingOutput");
  };

  const goToEdit = (urlId) => {
    setUrlId(urlId);
    setNavigation("edit");
  };

  return !loading ? (
    <Grid container justifyContent="center">
      {navigation === "urlOutput" && (
        <Grid item xs={6} align="center">
          <Box paddingTop={5}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={classes.row}>
                      <h3>
                        Url Name
                        <span style={{ float: "right" }}>
                          <Link to="/input">
                            <BlackAddCircleOutlineIcon />
                          </Link>
                        </span>
                      </h3>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {urls.map((url, i) => (
                    <TableRow key={i}>
                      <TableCellBody component="th" scope="row" align="center">
                        <Link to="#" onClick={() => goToPollingData(url.name)}>
                          {" "}
                          {url.name}{" "}
                        </Link>
                        <span
                          style={{ float: "right" }}
                          onClick={() => goToEdit(url.id)}
                        >
                          <EditIcon />
                        </span>
                        <span
                          style={{ float: "right" }}
                          onClick={() => deleteUrl(url.id)}
                        >
                          <DeleteIcon />
                        </span>
                      </TableCellBody>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      )}
      {navigation === "pollingOutput" && (
        <PollingOutputTable urlName={urlName} setNavigation={setNavigation} />
      )}
      {navigation === "edit" && (
        <UrlEditForm
          urlId={urlId}
          setNavigation={setNavigation}
          setUrls={setUrls}
        />
      )}
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

export default UrlOutputByNameTable;
