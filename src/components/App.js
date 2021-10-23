import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Nav from "./Navbar";
import LoadingBar from "react-redux-loading";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import NotFound from "./NotFound";
import Login from "./Login";
import QuestionDetails from "./QuestionDetails";
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        {authedUser === null ? (
          <Route render={() => <Login />} />
        ) : (
          <Fragment>
            <LoadingBar />
            <div className="container">
              <Nav />
              {this.props.loading === true ? null : (
                <Switch>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/questions/:id" component={QuestionDetails} />
                  <Route path="/add" component={NewQuestion} />
                  <Route path="/leaderboard" component={LeaderBoard} />
                  <Route path="/not-found" component={NotFound} />
                  <Route component={NotFound} />
                </Switch>
              )}
            </div>
          </Fragment>
        )}
      </Router>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(App);
