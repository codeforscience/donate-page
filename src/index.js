import React from 'react';
import {render} from 'react-dom';
import {
  BrowserRouter as Router,
  useLocation
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import './App.css'
import Donate from './Donate';

const useStyles = makeStyles({
  root: {
    marginTop: 0
  },
  logo:  {
    marginTop: 15,
    marginLeft: 24,
  },
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const App = () => {
  const classes = useStyles();
  const query = useQuery();
  
  return (
    <div>
      <div className={classes.logo}>
        <img width={200} height={"auto"} src='https://codeforscience.org/assets/Blue-logo-black-text-stacked.png' alt="" />
      </div>
      <Donate projectId={query.get("project")}  />
    </div>
  );
};

const appElement = document.querySelector('#root');
if (appElement) {
  render(
    <Router>
      <App />
    </Router>, appElement);
} else {
  console.error(
    'We could not find an HTML element with a class name of "App" in the DOM. Please make sure you copy index.html as well for this demo to work.'
  );
}