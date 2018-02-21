import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { ProtectedRoute, AuthRoute } from '../util/route_util.jsx';
import * as actions from '../actions';
import Landing from './landing/landing.jsx';
import '../styles/reset.css';
import '../styles/main.css';
import Header from "./header.jsx";
// import Landing from './Landing';
import Dashboard from "./jobs/job_listing/Dashboard";
import JobNew from './jobs/JobNew';
import JobShow from './jobs/JobShow';
// import JobShowContainer from './jobs/job_showpage/job_show_container';

class App extends React.Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="outer-container-div">
        <BrowserRouter>
          <div className="inner-container-div">
            <Header />
            <Route exact path="/" component={Landing}/>
            <Route exact path="/jobs" component={Dashboard}/>
            <Route path="/jobs/:id" component={JobShow}/>
            <Route exact path="/jobs/new" component={JobNew}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
