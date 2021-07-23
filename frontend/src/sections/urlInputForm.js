import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Box, Button, Grid, LinearProgress, TextField } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Link, Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
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

const UrlInputForm = () => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState({ url: "", name: "" });

  const handleChange = (event) => {
    setUrl({
      ...url,
      [event.target.name]: event.target.value,
    });
  };

  const handleLoad = (e) => {
    e.preventDefault();
      setLoading(true);
    axios.post("http://localhost:8080/urls", url).then((response) => {
        setLoading(false);
      console.log(response.data);
      setRedirect(true);
    });
  };

  return !loading ? (
    <div>
      {redirect && <Redirect to="/" />}
      <Grid container justifyContent="center">
        <Grid item align="center" xs={6}>
          <Box className={classes.heading} paddingTop={10}>
            <span style={{ float: "left" }}>
              <Link to="/">
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
    </div>
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

export default UrlInputForm;
