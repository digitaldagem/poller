import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Box, Button, Grid, LinearProgress, TextField } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const BlackHomeIcon = withStyles({
  root: {
    color: "black",
  },
})(HomeIcon);

const UrlEditForm = (props) => {
  const classes = useStyles();
  const [url, setUrl] = useState({ url: "", name: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let apiCall = async () => {
      let response = await axios.get(
        "http://localhost:8080/urls/" + props.urlId
      );
      return response.data;
    };
    apiCall().then((result) => {
      setUrl(result);
      setLoading(false);
    });
  }, [props]);

  const handleChange = (event) => {
    setUrl({
      ...url,
      [event.target.name]: event.target.value,
    });
  };

  const handleLoad = (e) => {
      setLoading(true);
    e.preventDefault();
    axios.put("http://localhost:8080/urls/" + url.id, url).then((response) => {
      if (response) {
        axios.get("http://localhost:8080/urls").then((response) => {
          props.setUrls(response.data);
          props.setNavigation("urlOutput");
        });
      }
    });
  };

  return !loading ? (
    <Grid container justifyContent="center">
      <Grid item align="center" xs={6}>
        <Box className={classes.heading} paddingTop={10}>
          <span style={{ float: "left" }}>
            <Link to="/" onClick={() => props.setNavigation("urlOutput")}>
              <BlackHomeIcon />
            </Link>
          </span>
        </Box>
        <Box paddingTop={5} align="center">
          <form
            className={classes.form}
            onSubmit={(e) => {
              handleLoad(e);
            }}
          >
            <TextField
              fullWidth
              label="url"
              margin="normal"
              name="url"
              onChange={(e) => handleChange(e)}
              required
              type="url"
              value={url.url}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="name"
              margin="normal"
              name="name"
              onChange={(e) => handleChange(e)}
              required
              type="text"
              value={url.name}
              variant="outlined"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
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

export default UrlEditForm;
