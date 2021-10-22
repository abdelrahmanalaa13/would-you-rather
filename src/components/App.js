import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Nav from "./Navbar";
import LoadingBar from "react-redux-loading";
import ResultQuestion from "./ResultQuestion";
import AnsQuestion from "./AnsQuestion";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.loading === true ? null : (
              <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/ans-question/:id" component={AnsQuestion} />
                <Route path="/result-question/:id" component={ResultQuestion} />
                <Route path='/new' component={NewQuestion} />
                <Route path='/leaderboard' component={LeaderBoard} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}
export default connect(mapStateToProps)(App);
