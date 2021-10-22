import React, { Component } from "react";
import { connect } from "react-redux";

class LeaderBoard extends Component {
  render() {
      return
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
