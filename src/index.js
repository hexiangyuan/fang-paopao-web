import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AboutUs from "./about/AboutUs";
import DownloadApp from "./about/download-app";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={DownloadApp}/>
          <Route exact path="/app" component={AboutUs}/>
          <Route exact path="/download" component={DownloadApp}/>
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
